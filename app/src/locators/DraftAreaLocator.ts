import { DropAreaDescription, getRelativePlayerIndex, isItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { landCardDescription } from '../material/LandCardDescription'
import { playerPositions, Position, tableauLocator } from './TableauLocator'

export class DraftAreaLocator extends ListLocator {
  gap = { x: 1, z: 1.5  }

  protected getAreaCoordinates(location: Location, context: MaterialContext<number, number, number>) {
    console.log(location)
    return super.getAreaCoordinates(location, context)
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = tableauLocator.getBaseCoordinates(location, context)
    if (context.rules.players.length > 2) {
      return this.getMoreThanTwoPlayerCoordinates(location, context)
    }

    coordinates.y! += 18
    coordinates.x! += 15
    coordinates.z = 1.5
    return coordinates
  }


  getMoreThanTwoPlayerCoordinates(location: Location, context: MaterialContext) {
    const tableauCoordinates = tableauLocator.getBaseCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const cameFromRight = this.cameFromRight(location.player!, location.id, context)
    tableauCoordinates.z = 1.5
    switch (position) {
      case Position.TopLeft:
        tableauCoordinates.x! += 26
        tableauCoordinates.y! += 22
        return tableauCoordinates
      case Position.BottomLeft:
        tableauCoordinates.x! += 26
        tableauCoordinates.y! += 22
        return tableauCoordinates
      case Position.TopCenter:
        tableauCoordinates.x! += cameFromRight? -26: 26
        tableauCoordinates.y! += 13
        return tableauCoordinates
      case Position.TopRight:
        tableauCoordinates.x! -= 26
        tableauCoordinates.y! += 22
        return tableauCoordinates
      case Position.BottomRight:
        tableauCoordinates.x! -= 26
        tableauCoordinates.y! += 22
        return tableauCoordinates
    }
  }

  cameFromRight(areaPlayer: PlayerColor, sourcePlayer: PlayerColor, context: MaterialContext) {
    const game = context.rules.game
    const previousIndex = game.players.indexOf(areaPlayer) - 1
    if (previousIndex < 0) return game.players[game.players.length - 1] === sourcePlayer
    return game.players[previousIndex] === sourcePlayer
  }

  locationDescription = new DraftAreaDescription()
}

class DraftAreaDescription extends DropAreaDescription {
  constructor() {
    super(landCardDescription)
  }

  getLocationSize(location: Location, context: MaterialContext) {
    if (context.player === undefined || isItemContext(context)) return super.getLocationSize(location, context)
    return {
      width: 10,
      height: 11
    }
  }
}


export const draftAreaLocator = new DraftAreaLocator()
