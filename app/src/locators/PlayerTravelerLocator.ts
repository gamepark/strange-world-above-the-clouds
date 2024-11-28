import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { TableauHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/TableauHelper'
import { landCardDescription } from '../material/LandCardDescription'
import { playerPositions, Position } from './TableauLocator'

export class PlayerTravelerLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    const { xMax, xMin, yMax, yMin } = new TableauHelper(context.rules.game, location.player!).boundaries
    const { x, y } = this.getBaseCoordinates(location, context)
    const deltaX = (xMin + xMax) / 2
    const deltaY = (yMin + yMax) / 2
    const deltaForZ = location.x! < xMin? -1: 1
    return {
      x: x + ((location.x!) - deltaX) * (landCardDescription.width + 0.2) + ((location.z ?? 0) * deltaForZ),
      y: y + ((location.y! + 0.5) - deltaY) * (landCardDescription.height + 0.2),
      z: (location.z ?? 0) * 0.05
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

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2)']
  }
}

export const playerTravelerLocator = new PlayerTravelerLocator()