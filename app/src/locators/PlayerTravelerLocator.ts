import { DropAreaDescription, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { TableauHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/TableauHelper'
import { landCardDescription } from '../material/LandCardDescription'
import { tableauLocator } from './TableauLocator'

export class PlayerTravelerLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    const { xMax, xMin, yMax, yMin } = new TableauHelper(context.rules.game, location.player!).globalBoundaries
    const { x, y } = tableauLocator.getBaseCoordinates(location, context)
    const deltaX = (xMin + xMax) / 2
    const deltaY = (yMin + yMax) / 2
    const deltaForZ = location.x! < xMin? -1: 1
    return {
      x: x! + ((location.x!) - deltaX) * (landCardDescription.width + 0.1) + ((location.z ?? 0) * deltaForZ),
      y: y! + ((location.y!) - deltaY) * (landCardDescription.height + 0.1),
      z: (location.z ?? 0) * 0.05
    }
  }

  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    const boundaries = new TableauHelper(context.rules.game, item.location.player!).globalBoundaries
    const transform = ['translateZ(10em)', 'scale(2)']
    if (item.location.x! <= boundaries.xMin) {
      if (item.location.z! >= 1) transform.push('translateX(28%)')
      if (item.location.z === 0) transform.push('translateX(20%)')
    }

    if (item.location.x! > boundaries.xMax) {
      if (item.location.z! >= 1) transform.push('translateX(-28%)')
      if (item.location.z === 0) transform.push('translateX(-20%)')
    }

    return transform
  }

  locationDescription = new DropAreaDescription(landCardDescription)

}

export const playerTravelerLocator = new PlayerTravelerLocator()