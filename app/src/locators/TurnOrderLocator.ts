import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerPositions, Position, tableauLocator } from './TableauLocator'

export class TurnOrderLocator extends ListLocator {
  gap = { x: 1 }

  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]

    const coordinates = tableauLocator.getBaseCoordinates(location, context)

    if (context.rules.players.length !== 2) {
      if ((context.player === undefined || position === Position.BottomLeft) || position === Position.TopLeft) {
        coordinates.y! -= 14.5
        coordinates.x! -= 25.5
        return coordinates
      }

      if (position === Position.TopRight || position === Position.BottomRight) {
        coordinates.y! -= 14.5
        coordinates.x! += 25.5
        return coordinates
      }
    }

    coordinates.y! += 18
    coordinates.x! -= 18
    return coordinates
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]

    if (context.rules.players.length !== 2) {
      if (context.player === undefined && (position === Position.TopLeft || position === Position.BottomLeft)) {
        return 90
      }

      if (context.player === undefined && (position === Position.TopRight || position === Position.BottomRight)) {
        return -90
      }
    }

    return 0
  }


  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-25%)']
  }
}

export const turnOrderLocator = new TurnOrderLocator()