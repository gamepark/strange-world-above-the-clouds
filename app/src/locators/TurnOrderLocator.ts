import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { draftAreaLocator } from './DraftAreaLocator'
import { playerPositions, Position } from './TableauLocator'

export class TurnOrderLocator extends ListLocator {
  gap = { x: 1 }

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = draftAreaLocator.getCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]

    if (position === Position.TopLeft || position === Position.BottomLeft || position === Position.TopCenter) {
      coordinates.x! -= 10
    } else {
      coordinates.x! += 10
    }
    return coordinates
  }


  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-25%)']
  }
}

export const turnOrderLocator = new TurnOrderLocator()
