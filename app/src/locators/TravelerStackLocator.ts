import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { landCardDescription } from '../material/LandCardDescription'
import { fumaroleStackLocator } from './FumaroleStackLocator'

export class TravelerStackLocator extends DeckLocator {

  getCoordinates(_location: Location, context: ItemContext): Partial<Coordinates> {
   if (context.rules.game.rule?.id === RuleId.WelcomingTraveler && context.rules.game.rule?.player === context.player) {
     const itemInStack = context.rules.material(MaterialType.TravelerCard).location(LocationType.TravelerStack).length
     const coordinates = { x: 0, y: -20, z: 10 }
     coordinates.x -= (itemInStack / 2 * (landCardDescription.width + 1)) - (0.5 * (landCardDescription.width + 1))
     return coordinates
   }

    if (context.rules.game.players.length === 2) return { x: 16, y: -24 }
    return { x: 0, y: fumaroleStackLocator.coordinates.y! + 9.5 }
  }

  getGap(_location: Location, context: ItemContext): Partial<Coordinates> {
    if (context.rules.game.rule?.id === RuleId.WelcomingTraveler && context.rules.game.rule?.player === context.player) {
      return { x: landCardDescription.width + 1 }
    }

    return this.gap
  }

  getHoverTransform(): string[] {
    return ['translateZ(10em)', 'scale(2)', 'translateY(25%)']
  }


  limit = 20
}

export const travelerStackLocator = new TravelerStackLocator()