import { DeckLocator } from '@gamepark/react-game'

export class TravelerStackLocator extends DeckLocator {
  coordinates = { x: 16, y: -24 }
  limit = 20
}

export const travelerStackLocator = new TravelerStackLocator()