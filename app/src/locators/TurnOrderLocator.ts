import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerPositions, Position, tableauLocator } from './TableauLocator'

export class TurnOrderLocator extends ListLocator {
  gap = { x: 1 }

  getCoordinates(location: Location, context: MaterialContext) {
    return this.getTurnOrderCoordinates(location, context)
  }


  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-25%)']
  }


  getTurnOrderCoordinates(location: Location, context: MaterialContext) {
    const tableauCoordinates = tableauLocator.getBaseCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    tableauCoordinates.z = 1.5
    tableauCoordinates.y! -= 13
    switch (position) {
      case Position.TopLeft:
        tableauCoordinates.x! += 26
        return tableauCoordinates
      case Position.BottomLeft:
        tableauCoordinates.x! += 26
        return tableauCoordinates
      case Position.TopCenter:
        tableauCoordinates.x! += -26
        return tableauCoordinates
      case Position.TopRight:
        tableauCoordinates.x! -= 26
        return tableauCoordinates
      case Position.BottomRight:
        tableauCoordinates.x! -= 26
        return tableauCoordinates
    }
  }
}

export const turnOrderLocator = new TurnOrderLocator()