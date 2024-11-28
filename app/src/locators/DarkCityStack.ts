import { DeckLocator } from '@gamepark/react-game'

class DarkCityStackLocator extends DeckLocator {
  coordinates = { x: 0, y: -24 }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2)', 'translateY(25%)']
  }
}

export const darkCityStackLocator = new DarkCityStackLocator()