import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { landCardDescription } from '../material/LandCardDescription'
import { tableauLocator } from './TableauLocator'

export class DraftAreaLocator extends ListLocator {
  gap = { x: 1 }
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = tableauLocator.getBaseCoordinates(location, context)
    coordinates.y += 18
    coordinates.x += 15
    return coordinates
  }

  locationDescription = new DropAreaDescription(landCardDescription)
}



export const draftAreaLocator = new DraftAreaLocator()