import { Location, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export type Boundaries = {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}


export class TableauHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: number) {
    super(game)
  }

  get availableSpaces() {
    const availableSpaces: Location[] = []
    const boundaries = this.boundaries
    const playedCards = this.panorama.getItems()

    if (playedCards.length === 0) {
      availableSpaces.push({ type: LocationType.Tableau, player: this.player, x: 0, y: 0, z: 0 })
    }


    playedCards.forEach(playedCard => {
      const coordinates = { x: playedCard.location.x, y: playedCard.location.y }
      const left = { x: playedCard.location.x! - 1, y: playedCard.location.y! }
      if (!playedCards.find(item => isAnyCardToTheLeft(item, coordinates)) && (boundaries.xMax - left.x < 4)) {
        availableSpaces.push({ type: LocationType.Tableau, player: this.player, x: left.x, y: left.y, z: 0 })
      }

      const right = { x: playedCard.location.x! + 1, y: playedCard.location.y! }
      if (!playedCards.find(item => isAnyCardToTheRight(item, coordinates)) && (right.x - boundaries.xMin < 4)) {
        availableSpaces.push({ type: LocationType.Tableau, player: this.player, x: right.x, y: right.y, z: 0 })
      }

      const below = { x: playedCard.location.x!, y: playedCard.location.y! + 1 }
      if (!playedCards.find(item => isAnyCardBelow(item, coordinates)) && (below.y - boundaries.yMin < 4)) {
        availableSpaces.push({ type: LocationType.Tableau, player: this.player, x: below.x, y: below.y, z: 0 })
      }

      const above = { x: playedCard.location.x!, y: playedCard.location.y! - 1 }
      if (!playedCards.find(item => isAnyCardAbove(item, coordinates)) && (boundaries.yMax - above.y < 4)) {
        availableSpaces.push({ type: LocationType.Tableau, player: this.player, x: above.x, y: above.y, z: 0 })
      }
    })


    return uniqBy(availableSpaces, (location) => JSON.stringify(location))

  }

  get boundaries(): Boundaries {
    const panorama = this.panorama
    return {
      xMin: panorama.minBy((item) => item.location.x!).getItem()?.location?.x ?? 0,
      xMax: panorama.maxBy((item) => item.location.x!).getItem()?.location?.x ?? 0,
      yMin: panorama.minBy((item) => item.location.y!).getItem()?.location?.y ?? 0,
      yMax: panorama.maxBy((item) => item.location.y!).getItem()?.location?.y ?? 0
    }
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
  }

  get isFull() {
    return this.panorama.length === 16
  }

}

export const isAnyCardToTheLeft = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! - 1 && slotToCheck.location.y === reference.y
}
export const isAnyCardToTheRight = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! + 1 && slotToCheck.location.y === reference.y
}
export const isAnyCardAbove = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! && slotToCheck.location.y === reference.y! - 1
}
export const isAnyCardBelow = (slotToCheck: MaterialItem, reference: { x?: number; y?: number }) => {
  return slotToCheck.location.x === reference.x! && slotToCheck.location.y === reference.y! + 1
}