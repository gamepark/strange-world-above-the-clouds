import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerPositions, Position, tableauLocator } from './TableauLocator'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = tableauLocator.getBaseCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    if (this.isTop(position)) {
      coordinates.y! -= 21
    } else {
      coordinates.y! += 21
    }

    if (position === Position.BottomLeft || position === Position.TopLeft) coordinates.x! += 10
    if (position === Position.BottomRight || position === Position.TopRight) coordinates.x! -= 10

    coordinates.z = 1.5
    return coordinates
  }

  getBaseAngle(location: Location, context: MaterialContext): number {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    if (this.isTop(position)) {
      return 180
    }

    return super.getBaseAngle(location, context)
  }

  isTop(position: Position) {
    return position === Position.TopCenter || position === Position.TopLeft || position === Position.TopRight
  }

  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    if (item.location.player !== context.player) return []
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-40%)']
  }
}

export const playerHandLocator = new PlayerHandLocator()