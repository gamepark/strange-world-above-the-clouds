import { DropAreaDescription, getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, isMoveItemType, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { TableauHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/TableauHelper'
import isEqual from 'lodash/isEqual'
import { landCardDescription } from '../material/LandCardDescription'

export enum Position {
  TopLeft, TopCenter, TopRight, BottomLeft, BottomRight
}

export const playerPositions = [
  [Position.BottomLeft, Position.BottomRight], // 2 players
  [Position.BottomLeft, Position.TopCenter, Position.BottomRight], // 3 players
  [Position.BottomLeft, Position.TopLeft, Position.TopRight, Position.BottomRight], // 4 players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight] // 4 players
]

class TableauLocator extends Locator {

  getLocations({ rules, player }: MaterialContext) {
    const selectedCard = rules.material(MaterialType.LandCard).selected(true)
    if (!!player && selectedCard.length) {
      return rules.getLegalMoves(player).filter(isMoveItemType(MaterialType.LandCard))
        .filter(move => move.itemIndex === selectedCard.getIndex() && move.location.rotation === selectedCard.getItem()?.location.rotation)
        .map(move => move.location) as Location[]
    }
    return []
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { xMax, xMin, yMax, yMin } = new TableauHelper(context.rules.game, location.player!).boundaries
    const { x, y } = this.getBaseCoordinates(location, context)
    const deltaX = (xMin + xMax) / 2
    const deltaY = (yMin + yMax) / 2
    return {
      x: x + (location.x! - deltaX) * (landCardDescription.width + 0.2),
      y: y + (location.y! - deltaY) * (landCardDescription.height + 0.2)
    }
  }

  getBaseCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        return { x: -33, y: -40 }
      case Position.TopCenter:
        return { x: 7.5, y: -40 }
      case Position.TopRight:
        return { x: 33, y: -40 }
      case Position.BottomLeft:
        return players === 2 ? { x: -30, y: 7 } : players === 3 ? { x: -35, y: -28 } : { x: -33, y: -9 }
      case Position.BottomRight:
        return players === 2 ? { x: 33, y: 7 } : players === 3 ? { x: 35, y: -28 } : { x: 33, y: -9 }
    }
  }

  getHoverTransform = (item: MaterialItem, context: ItemContext) => {
    const { rules } = context
    const player = item.location.player
    const index = getRelativePlayerIndex(context, player)
    const isBottomPlayers = rules.players.length === 2 || (rules.players.length === 5? (index === 0 || index === 4): (rules.players.length === 4? (index === 0 || index === 3): index === 0))
    const helper =  new TableauHelper(context.rules.game, item.location.player!).boundaries
    const transform = ['translateZ(10em)', 'scale(2)']
    if (!isBottomPlayers && helper.yMin === item.location.y) transform.push('translateY(25%)')
    if (isBottomPlayers && helper.yMax === item.location.y) transform.push('translateY(-25%)')

    return transform
  }

  locationDescription = new TableauSpotDescription()
}

export class TableauSpotDescription extends DropAreaDescription {
  constructor() {
    super(landCardDescription)
  }

  canShortClick(move: MaterialMove, location: Location, { rules }: MaterialContext) {
    return isMoveItemType(MaterialType.LandCard)(move)
      && isEqual(move.location, location)
      && rules.material(MaterialType.LandCard).getItem(move.itemIndex).selected === true

  }

  getBestDropMove(moves: MaterialMove[], _location: Location, context: ItemContext): MaterialMove {
    const moveWithSameRotation = moves.find(move =>
      isMoveItem(move) && move.location.rotation === context.rules.material(move.itemType).getItem(move.itemIndex)?.location.rotation
    )
    return moveWithSameRotation ?? moves[0]
  }
}

export const tableauLocator = new TableauLocator()