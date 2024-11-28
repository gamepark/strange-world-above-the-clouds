import { HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { tableauLocator } from './TableauLocator'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = tableauLocator.getBaseCoordinates(location, context)
    coordinates.y += 18
    return coordinates
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const coordinates = super.getItemCoordinates(item, context)
    if (item.selected) {
      coordinates.y -= 50
    }
    return coordinates
  }

  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-25%)']
  }
}



export const playerHandLocator = new PlayerHandLocator()