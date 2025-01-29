/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DeckLocator, ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { landCardDescription } from '../material/LandCardDescription'
import { fumaroleStackLocator } from './FumaroleStackLocator'

export class TravelerStackLocator extends DeckLocator {

  getCoordinates(location: Location, context: ItemContext): Partial<Coordinates> {
   if (context.rules.game.rule?.id === RuleId.WelcomingTraveler && context.rules.game.rule?.player === context.player) {
     const itemInStack = context.rules.material(MaterialType.TravelerCard).location(LocationType.TravelerStack).length
     const coordinates = { x: 0, y: context.rules.players.length === 2? -20: -12, z: 40 }
     coordinates.x -= (itemInStack / 2 * (landCardDescription.width + 1)) - (0.5 * (landCardDescription.width + 1))
     return coordinates
   }

   const fumaroleCoordinates = fumaroleStackLocator.getCoordinates(location, context)
    if (context.rules.game.players.length === 3) return { x: fumaroleCoordinates.x! + 7, y: fumaroleCoordinates.y! }
    if (context.rules.game.players.length === 2) return { x: fumaroleCoordinates.x + 8, y: -24 }
    return { x: 0, y: fumaroleStackLocator.getCoordinates(location, context).y! + 9.5 }
  }

  getGap(_location: Location, context: ItemContext): Partial<Coordinates> {
    if (context.rules.game.rule?.id === RuleId.WelcomingTraveler && context.rules.game.rule?.player === context.player) {
      return { x: landCardDescription.width + 1 }
    }

    return this.gap
  }

  getHoverTransform(_item: MaterialItem, context: MaterialContext): string[] {
    if (context.rules.game.players.length === 3) return ['translateZ(10em)', 'scale(2)']
    return ['translateZ(10em)', 'scale(2)', 'translateY(25%)']
  }

  limit = 20

  locationDescription = new TravelerStackDescription()

  getLocations(context: MaterialContext) {
    if (context.rules.game.rule?.id === RuleId.WelcomingTraveler && context.rules.game.rule?.player === context.player) {
      return [{
        type: LocationType.TravelerStack
      }]
    }

    return []

  }
}

class TravelerStackDescription extends LocationDescription {

  constructor() {
    super(landCardDescription)
  }

  getExtraCss(_location: Location, context: MaterialContext) {
    const size = context.rules.material(MaterialType.TravelerCard).location(LocationType.TravelerStack).length
    const itemInStack = context.rules.material(MaterialType.TravelerCard).location(LocationType.TravelerStack).length
    const coordinates = { x: 0, y: context.rules.players.length === 2? -20: -12, z: 10 }
    coordinates.x -= (itemInStack / 2 * (landCardDescription.width + 1) + 0.75)

      return css`
        background-color: #b298bf;
        box-shadow: 0 0 0.5em black;
        width: ${(landCardDescription.width + 1) * size + 1.5}em;
        height: ${landCardDescription.height + 2}em;
        transform: translateY(-50%) translate3d(${coordinates.x}em, ${coordinates.y}em, 39em);
      `
    }
}

export const travelerStackLocator = new TravelerStackLocator()
