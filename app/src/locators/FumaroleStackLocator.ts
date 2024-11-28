import { DeckLocator } from '@gamepark/react-game'

export class FumaroleStackLocator extends DeckLocator {
  coordinates = { x: 8, y: -24 }
  limit = 20
}

export const fumaroleStackLocator = new FumaroleStackLocator()