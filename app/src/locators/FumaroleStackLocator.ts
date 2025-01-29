import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api/dist/material/location/Location'
import { darkCityStackLocator } from './DarkCityStack'

export class FumaroleStackLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const darkCityCoordinates = darkCityStackLocator.getCoordinates(location, context)
    if (context.rules.game.players.length === 3) return { x: -3, y: darkCityCoordinates.y! + 9.5 }
    if (context.rules.game.players.length === 2) return { x: darkCityCoordinates.x + 8, y: -24 }
    return { x: 0, y: darkCityCoordinates.y! + 9.5 }
  }
}

export const fumaroleStackLocator = new FumaroleStackLocator()
