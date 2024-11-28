import { DeckLocator } from '@gamepark/react-game'

export class LandDeckLocator extends DeckLocator {
  coordinates = { x: -8, y: -24 }
  limit = 20
}

export const landDeckLocator = new LandDeckLocator()