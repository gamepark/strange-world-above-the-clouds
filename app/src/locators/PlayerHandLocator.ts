import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerPositions, Position, tableauLocator } from './TableauLocator'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = tableauLocator.getBaseCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]

    if (context.rules.players.length !== 2) {
      if ((context.player === undefined && position === Position.BottomLeft) || position === Position.TopLeft) {
        coordinates.y! -= 2
        coordinates.x! -= 25.5
        return coordinates
      }

      if (position === Position.TopRight || position === Position.BottomRight) {
        coordinates.y! += 2
        coordinates.x! += 25.5
        return coordinates
      }
    }

    coordinates.y! += 18
    coordinates.z = 1.5
    return coordinates
  }

  getBaseAngle(location: Location, context: MaterialContext): number {
    if (context.rules.players.length !== 2) {
      const playerIndex = getRelativePlayerIndex(context, location.player)
      const position = playerPositions[context.rules.players.length - 2][playerIndex]
      if (context.rules.players.length !== 2) {
      if ((context.player === undefined && position === Position.BottomLeft) || position === Position.TopLeft) {
        return 90
      }

      if (position === Position.TopRight || position === Position.BottomRight) {
        return -90
      }
      }
    }


    return super.getBaseAngle(location, context)
  }


  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    if (item.location.player !== context.player) return []
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-25%)']
  }
}

export const playerHandLocator = new PlayerHandLocator()