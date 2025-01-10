import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class TurnOrderLocator extends ListLocator {
  gap = { x: 1 }

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.rules.game.players.length === 3) return { x: 0, y: 0 }
    if (context.rules.game.players.length === 2) return { x: -8, y: -24 }
    return { x: 0, y: 20 }
  }


  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-25%)']
  }
}

export const turnOrderLocator = new TurnOrderLocator()