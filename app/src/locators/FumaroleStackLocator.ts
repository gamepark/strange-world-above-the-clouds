import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api/dist/material/location/Location'
import { darkCityStackLocator } from './DarkCityStack'

export class FumaroleStackLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (context.rules.game.players.length === 2) return { x: 8, y: -24 }
    return { x: 0, y: darkCityStackLocator.getCoordinates(location, context).y! + 9.5 }
  }
}

export const fumaroleStackLocator = new FumaroleStackLocator()