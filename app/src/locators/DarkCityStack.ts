import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { landDeckLocator } from './LandDeckLocator'

class DarkCityStackLocator extends DeckLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const landCoordinates =  landDeckLocator.getCoordinates(location, context)
    if (context.rules.game.players.length === 3) return { x: landCoordinates.x! + 7, y: landCoordinates.y! }
    if (context.rules.game.players.length === 2) return { x: 0, y: -24 }
    return { x: 0, y: landDeckLocator.getCoordinates(location, context).y! + 9.5 }
  }

  getHoverTransform(_item: MaterialItem, context: MaterialContext): string[] {
    if (context.rules.game.players.length === 3) return ['translateZ(10em)', 'scale(2)']
    return [`translateZ(10em)`, 'scale(2)', 'translateY(25%)']
  }
}

export const darkCityStackLocator = new DarkCityStackLocator()