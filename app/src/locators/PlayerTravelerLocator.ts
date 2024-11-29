import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { TableauHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/TableauHelper'
import { landCardDescription } from '../material/LandCardDescription'
import { tableauLocator } from './TableauLocator'

export class PlayerTravelerLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    const { xMax, xMin, yMax, yMin } = new TableauHelper(context.rules.game, location.player!).boundaries
    const { x, y } = tableauLocator.getBaseCoordinates(location, context)
    const deltaX = (xMin + xMax) / 2
    const deltaY = (yMin + yMax) / 2
    const deltaForZ = location.x! < xMin? -1: 1
    return {
      x: x! + ((location.x!) - deltaX) * (landCardDescription.width + 0.1) + ((location.z ?? 0) * deltaForZ),
      y: y! + ((location.y! + 0.5) - deltaY) * (landCardDescription.height + 0.1),
      z: (location.z ?? 0) * 0.05
    }
  }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2)']
  }
}

export const playerTravelerLocator = new PlayerTravelerLocator()