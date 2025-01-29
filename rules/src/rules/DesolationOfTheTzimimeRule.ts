import { Direction, getDistanceBetweenSquares, getSquareInDirection, Material, MaterialMove } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { isSwamp, isVolcano, isWater } from '../LandType'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { CustomMoveType } from './CustomMoveType'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export enum DesolationKind {
  Water = 1,
  Swamp,
  Portal,
  Moon
}

export class DesolationOfTheTzimimeRule extends BasePlayedCardRule {
  onRuleStart() {
    const playedCard = this.playedCard
    const playedItem = playedCard.getItem()!
    const moves: MaterialMove[] = []
    const characteristics = LandCardsCharacteristics[playedItem.id as LandCard]
    const colors = characteristics?.types ?? []
    let disabled = false

    if (characteristics.portal) {
      const onPortal = this.onPortal()
      if (onPortal.length) {
        this.memorize(Memory.DesolationKind, DesolationKind.Portal)
        moves.push(...onPortal)
        this.forget(Memory.TravelerToWelcome)
        return moves
      }
    }

    for (const color of colors) {
      if (isWater(color) && !disabled) {
        if (this.hasAdjacentWaterLand) {
          this.memorize(Memory.DesolationKind, DesolationKind.Water)
          disabled = true
          moves.push(playedCard.rotateItem(true))
          this.forget(Memory.TravelerToWelcome)
          return moves
        }
      }

      if (isSwamp(color) && !disabled) {
        if (this.hasSwampInSameLine) {
          this.memorize(Memory.DesolationKind, DesolationKind.Swamp)
          disabled = true
          moves.push(playedCard.rotateItem(true))
          this.forget(Memory.TravelerToWelcome)
          return moves
        }
      }
    }

    if (!disabled) {
      const disablePlacedMoon = this.disabledPlacedMoon()
      if (disablePlacedMoon.length) {
        this.memorize(Memory.DesolationKind, DesolationKind.Moon)
        moves.push(...disablePlacedMoon)
        disabled = true
      }
    }

    const disablingOtherMoons = this.disableOtherMoons()
    if (disablingOtherMoons.length) {
      this.memorize(Memory.DesolationKind, DesolationKind.Moon)
      moves.push(...disablingOtherMoons)
    }

    if (this.remind(Memory.DesolationKind) === DesolationKind.Moon) {
      return moves
    }

    if (!disabled) {
      const travelerToWelcome = this.remind(Memory.TravelerToWelcome)
      if (travelerToWelcome) {
        moves.push(this.startRule(RuleId.WelcomingTraveler))
        return moves
      }

      if (colors.some(isVolcano)) {
        moves.push(this.startRule(RuleId.Volcano))
        return moves
      }
    }

    moves.push(...this.goToNextRule())
    return moves
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(this.customMove(CustomMoveType.ValidateDesolation))
    return moves
  }

  onCustomMove() {
    const travelerToWelcome = this.remind(Memory.TravelerToWelcome)
    const playedCard = this.playedCard
    const playedItem = playedCard.getItem()!
    if (!playedItem.location.rotation) {
      if (travelerToWelcome) {
        return [this.startRule(RuleId.WelcomingTraveler)]
      }

      const characteristics = LandCardsCharacteristics[playedItem.id as LandCard]
      const colors = characteristics?.types ?? []

      if (colors.some(isVolcano)) {
        return [this.startRule(RuleId.Volcano)]
      }
    }

    return this.goToNextRule()
  }

  disabledPlacedMoon() {
    const card = this.playedCard
    const item = card.getItem()!
    const characteristics = LandCardsCharacteristics[item.id as LandCard]
    const boundaries = new TableauHelper(this.game, this.player).land
    if (characteristics.moon && boundaries.yMin < item.location.y!) {
      return [card.rotateItem(true)]
    }

    return []
  }

  disableOtherMoons() {
    const card = this.playedCard
    const item = card.getItem()!
    return this.panorama
      .filter((i) => !!LandCardsCharacteristics[i.id as LandCard]?.moon && i.location.y! > item.location.y!)
      .rotateItems(true)

  }

  get hasSwampInSameLine() {
    const playedCardItem = this.playedCard.getItem()!
    return this.panorama
      .getItems()
      .some((item) => {
          const colors = LandCardsCharacteristics[item.id as LandCard]?.types ?? []
          return !isEqual(item, playedCardItem) &&
            item.location.y === playedCardItem.location.y &&
            colors.some(isSwamp)
        }
      )
  }

  onPortal(): MaterialMove[] {
    const travelers = this.travelerStack
    if (!travelers.length) return []
    const card = this.playedCard
    const item = card.getItem()!
    const coordinates = { x: item.location.x, y: item.location.y }
    const westCoordinates = getSquareInDirection(coordinates, Direction.West)
    const eastCoordinates = getSquareInDirection(coordinates, Direction.East)
    const westCard = this.panorama.location((l) => l.x === westCoordinates.x && l.y === westCoordinates.y)
    const westCardItem = westCard.getItem()
    const eastCard = this.panorama.location((l) => l.x === eastCoordinates.x && l.y === eastCoordinates.y)
    const eastCardItem = eastCard.getItem()
    if (
      !LandCardsCharacteristics[westCardItem?.id as LandCard]?.portal &&
      !LandCardsCharacteristics[eastCardItem?.id as LandCard]?.portal
    ) return []

    let countTravelers = 0
    if (LandCardsCharacteristics[westCardItem?.id as LandCard]?.portal) {
      const moves = this.fetchAdjacentPortal(westCard, Direction.West)
      if (moves.length) return moves
      countTravelers++
    }

    if (LandCardsCharacteristics[eastCardItem?.id as LandCard]?.portal) {
      const moves = this.fetchAdjacentPortal(eastCard, Direction.East)
      if (moves.length) return moves
      countTravelers++
    }

    if (countTravelers) {
      this.memorize(Memory.TravelerToWelcome, countTravelers)
    }

    return []
  }

  get travelerStack() {
    return this
      .material(MaterialType.TravelerCard)
      .location(LocationType.TravelerStack)
  }

  fetchAdjacentPortal(card: Material, direction: Direction): MaterialMove[] {
    const item = card.getItem()!
    const coordinates = { x: item.location.x, y: item.location.y }
    const adjacentCoordinates = getSquareInDirection(coordinates, direction)
    const adjacentCard = this.panorama.location((l) => l.x === adjacentCoordinates.x && l.y === adjacentCoordinates.y).getItem()
    if (LandCardsCharacteristics[adjacentCard?.id as LandCard]?.portal) {
      return [this.playedCard.rotateItem(true)]
    } else {
      this.memorize(Memory.TravelerToWelcome, 1)
      return []
    }
  }

  get hasAdjacentWaterLand() {
    return this.adjacentCards
      .getItems()
      .some((item) => {
        const colors = LandCardsCharacteristics[item.id as LandCard]?.types ?? []
        return colors.some(isWater)
      })
  }

  get adjacentCards() {
    const playedCardItem = this.playedCard.getItem()!
    return this.panorama
      .filter((item) => getDistanceBetweenSquares(
        { x: item.location.x!, y: item.location.y! },
        { x: playedCardItem.location.x!, y: playedCardItem.location.y! }
      ) === 1)
  }
}