import { DeckLocator } from '@gamepark/react-game'

export class FumaroleStackLocator extends DeckLocator {
  coordinates = { x: 8, y: -24 }
  limit = 200
}

export const fumaroleStackLocator = new FumaroleStackLocator()