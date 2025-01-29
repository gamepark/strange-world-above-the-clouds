/** @jsxImportSource @emotion/react */

import { DropAreaDescription, getRelativePlayerIndex, isItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { landCardDescription } from '../material/LandCardDescription'
import { playerHandLocator } from './PlayerHandLocator'
import { playerPositions, Position } from './TableauLocator'

export class DraftAreaLocator extends ListLocator {
  gap = { x: 1, z: 1.5  }

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = playerHandLocator.getCoordinates(location, context)
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    coordinates.z = 1.5
    if (position === Position.TopCenter || position === Position.TopLeft || position === Position.TopRight) {
      coordinates.y! += 12
    } else {
      coordinates.y! -= 12
    }

    if (position === Position.TopCenter || position === Position.TopLeft || position === Position.BottomLeft) {
      coordinates.x! += 5
    } else {
      coordinates.x! -= 5
    }

    return coordinates
  }

  locationDescription = new DraftAreaDescription()


  protected getCurrentMaxGap(location: Location, context: MaterialContext): XYCoordinates {
    const { x: gx = 0, y: gy = 0 } = this.getGap(location, context)
    const { x: mgx, y: mgy } = this.getMaxGap(location, context)
    const gapCount = Math.max(0, this.countListItems(location, context) - 1)
    return { x: (mgx ?? gx * gapCount), y: (mgy ?? gy * gapCount) }
  }
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
