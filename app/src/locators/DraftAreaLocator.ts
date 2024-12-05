import { DropAreaDescription, getRelativePlayerIndex, isItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { landCardDescription } from '../material/LandCardDescription'
import { playerPositions, Position, tableauLocator } from './TableauLocator'

export class DraftAreaLocator extends ListLocator {
  gap = { x: 1 }

  getGap(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]

    if (context.rules.players.length !== 2) {
      if (!context.player === undefined || position !== Position.BottomLeft) {
        return { y: 1, z: 1.5 }
      }
    }

    return { x: 1, z: 1.5 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = tableauLocator.getBaseCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]

    if (context.rules.players.length !== 2) {
      if ((context.player === undefined && position === Position.BottomLeft) || position === Position.TopLeft) {
        coordinates.y! += 11
        coordinates.x! -= 25.5
        coordinates.z = 1.5
        return coordinates
      }

      if (position === Position.TopRight || position === Position.BottomRight) {
        coordinates.y! -= 11
        coordinates.x! += 25.5
        coordinates.z = 1.5
        return coordinates
      }
    }

    coordinates.y! += 18
    coordinates.x! += 15
    coordinates.z = 1.5
    return coordinates
  }

  getRotateZ(location: Location, context: MaterialContext): number {
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

    return 0
  }

  getLocationCoordinates(location: Location, context: MaterialContext, index: number | undefined = this.getLocationIndex(location, context)): Partial<Coordinates> {
    const coordinates = super.getLocationCoordinates(location, context, index)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    if (isItemContext(context)) return coordinates
    if (context.rules.players.length === 2) {
      coordinates.x! -= 11.4
      return coordinates
    }

    if (position === Position.BottomLeft || position === Position.TopLeft) {
      coordinates.y! -= 9.5
    } else {
      coordinates.y! += 9.5
    }
    return coordinates
  }

  locationDescription = new DraftAreaDescription()
}

class DraftAreaDescription extends DropAreaDescription {
  constructor() {
    super(landCardDescription)
  }

  width = 30
  height = landCardDescription.height + 1
}


export const draftAreaLocator = new DraftAreaLocator()