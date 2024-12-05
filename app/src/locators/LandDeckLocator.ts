import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class LandDeckLocator extends DeckLocator {
  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.rules.game.players.length === 2) return { x: -8, y: -24 }
    return { x: 0, y: -10 }
  }
  limit = 20
}

export const landDeckLocator = new LandDeckLocator()