import { DeckLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class DarkCityStackLocator extends DeckLocator {
  coordinates = { x: 0, y: -24 }

  getHoverTransform(_item: MaterialItem): string[] {
    return [`translateZ(10em)`, 'scale(2)', 'translateY(25%)']
  }
}

export const darkCityStackLocator = new DarkCityStackLocator()