import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { landDeckLocator } from './LandDeckLocator'

class DarkCityStackLocator extends DeckLocator {

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.rules.game.players.length === 2) return { x: 0, y: -24 }
    return { x: 0, y: landDeckLocator.coordinates.y! + 9.5 }
  }

  getHoverTransform(_item: MaterialItem): string[] {
    return [`translateZ(10em)`, 'scale(2)', 'translateY(25%)']
  }
}

export const darkCityStackLocator = new DarkCityStackLocator()