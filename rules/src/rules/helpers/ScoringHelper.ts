import { getDistanceBetweenSquares, Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import uniq from 'lodash/uniq'
import sum from 'lodash/sum'
import { LandType } from '../../LandType'
import { LandCard } from '../../material/LandCard'
import { LandCardsCharacteristics } from '../../material/LandCardCharacteristics'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Traveler, TravelerCharacteristics } from '../../material/Traveler'
import { PlayerColor } from '../../PlayerColor'
import { TableauHelper } from './TableauHelper'

export class ScoringHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerColor) {
    super(game)
  }

  get score() {
    return this.mountainScoring + this.waterScoring + this.plantScoring + this.swampScoring + this.darkCityScoring + this.moonScoring + this.travelerScore
  }

  get moonScoring() {
    const panorama = this.panorama
    const moons = panorama
      .filter((i) => !!LandCardsCharacteristics[i.id as LandCard]?.moon)
      .getItems()

    let total = 0
    for (const moon of moons) {
      const belowCards = panorama
        .filter((item) => item.location.x! === moon.location.x! && item.location.y! > moon.location.y!)
        .getItems()

      const firstCardBelow = belowCards.find((item) => item.location.y === moon.location.y! + 1)
      if (!firstCardBelow) continue
      const colors = LandCardsCharacteristics[firstCardBelow.id as LandCard]?.types ?? []
      if (!colors.length) continue

      total += belowCards
        .flatMap((i) => LandCardsCharacteristics[i.id as LandCard]?.types ?? [])
        .filter((c) => colors.includes(c))
        .length
    }

    return total * 2
  }

  get darkCityScoring() {
    return sum(
      this.material(MaterialType.DarkCityCard).player(this.player).getItems().map((item) => item.id)
    )
  }

  get swampScoring() {
    return sum(
      this.panorama
        .getItems()
        .map((i) => this.count(i, LandType.Swamp))
    ) * 3
  }

  get plantScoring() {
    return uniq(
      this.panorama
        .getItems()
        .flatMap((i) => LandCardsCharacteristics[i.id as LandCard]?.animals ?? [])
    ).length * 2
  }

  get waterScoring() {
    const panorama = this.panorama
    const waters = this.waters.getItems()
    let total = 0
    for (const water of waters) {
      total += this
        .getAdjacentCard(panorama, water)
        .filter((item) => !item.location.rotation)
        .length
    }

    return total
  }

  get mountainScoring() {
    const panorama = this.mountains
    const boundaries = new TableauHelper(this.game, this.player).land
    let total = 0
    for (let x = boundaries.xMin; x <= boundaries.xMax; x++) {
      for (let y = boundaries.yMin; y <= boundaries.yMax; y++) {
        const item = panorama.location((l) => l.x === x && l.y === y)
        if (!item.length) continue;
        const currentSize = this.countMountainInArea(panorama, [], item)
        if (currentSize > total) total = currentSize
      }
    }

    return total
  }

  countMountainInArea(panorama: Material, alreadyVerifiedIndex: number[], card: Material) {
    const item = card.getItem()!
    const mountains = this.count(item, LandType.Mountain)
    const adjacents = this
      .getAdjacentCard(panorama, item)
      .filter((_, index) => !alreadyVerifiedIndex.includes(index))

    if (!adjacents) return mountains

    let adjacentSize = 0
    let indexes: number[] = [card.getIndex()]
    for (const adjacentIndex of adjacents.getIndexes()) {
      const actualSize = this.countMountainInArea(panorama, [...alreadyVerifiedIndex, ...indexes], adjacents.index(adjacentIndex))
      if (actualSize > adjacentSize) adjacentSize += actualSize
      indexes.push(adjacentIndex)
    }

    return adjacentSize + mountains
  }

  getAdjacentCard(panorama: Material, item: MaterialItem) {
    return panorama
      .filter((i) =>
        getDistanceBetweenSquares(
          { x: i.location.x!, y: i.location.y! },
          { x: item.location.x!, y: item.location.y! }
        ) === 1)
  }

  get mountains() {
    return this
      .panorama
      .filter((item) => this.count(item, LandType.Mountain) > 0)
  }

  get waters() {
    return this
      .panorama
      .filter((item) => this.count(item, LandType.Water) > 0)
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
      .rotation((r) => r === undefined)
  }

  get travelerScore() {
    let total = 0
    for (const traveler of this.travelers) {
      total += this.getTravelerScore(traveler)
    }

    return total
  }

  getTravelerScore(item: MaterialItem) {
    const characteristics = TravelerCharacteristics[item.id as Traveler]
    const cards = this.getTravelerLines(item)
    const base = 5

    if (characteristics.types?.length) {
      for (const type of characteristics.types) {
        const count = sum(cards.map((i) => this.count(i, type)))
        if (count < characteristics.min) {
          return base
        }
      }
       return base + characteristics.score
    }

    if (characteristics.portal) {
      const firstLine = cards.filter((i) => i.location.y === item.location.y! - 0.5)
      const secondLine = cards.filter((i) => i.location.y === item.location.y! + 0.5)
      return base + this.countPortals(firstLine) + this.countPortals(secondLine)
    }

    if (characteristics.fumarole) {
      const fumaroles = cards.filter((i) => i.id === LandCard.Fumarole).length
      if (fumaroles < characteristics.min) return base
      return base + characteristics.score
    }

    if (characteristics.animal) {
      const uniqAnimals = uniq(
        cards.flatMap((i) => LandCardsCharacteristics[i.id as LandCard]?.animals ?? [])
      ).length
      if (uniqAnimals < characteristics.min) return base
      return base + characteristics.score
    }

    return base
  }

  countPortals(line: MaterialItem[]) {
    const treatedItems: MaterialItem[] = []
    let portal = 0
    for (let i = 0; i < line.length; i++) {
      const item = line[i]
      if (!LandCardsCharacteristics[item.id as LandCard]?.portal) continue
      const itemsWithoutTreated = line.filter((i) => !treatedItems.includes(i))
      treatedItems.push(line[i])
      const adjacenCards = this
        .getAdjacentCards(itemsWithoutTreated, line[i])
        .filter((i) => LandCardsCharacteristics[i.id as LandCard]?.portal)
      portal += adjacenCards.length
    }

    return portal
  }

  get travelers() {
    return this
      .material(MaterialType.TravelerCard)
      .player(this.player)
      .getItems()
  }

  getTravelerLines(item: MaterialItem) {
    return this
      .panorama
      .filter((i) => (i.location.y === (item.location.y! - 0.5)) || (i.location.y === (item.location.y! + 0.5)))
      .getItems()
  }

  getAdjacentCards(line: MaterialItem[], item: MaterialItem) {
    return line
      .filter((i) => getDistanceBetweenSquares(
        { x: i.location.x!, y: i.location.y! },
        { x: item.location.x!, y: item.location.y! }
      ) === 1)
  }


  count(item: MaterialItem, landType: LandType) {
    return (LandCardsCharacteristics[item.id as LandCard]?.types ?? []).filter((c) => c === landType).length
  }
}
