import { DropAreaDescription, FlatMaterialDescription, getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialItem } from '@gamepark/rules-api'
import { isStarting } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { TableauHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/TableauHelper'
import { landCardDescription } from '../material/LandCardDescription'

export enum Position {
  TopLeft, TopCenter, TopRight, BottomLeft, BottomRight
}

export const playerPositions = [
  [Position.BottomLeft, Position.BottomRight], // 2 players
  [Position.BottomLeft, Position.TopCenter, Position.BottomRight], // 3 players
  [Position.BottomLeft, Position.TopLeft, Position.TopRight, Position.BottomRight], // 4 players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight] // 4 players
]

class TableauLocator extends Locator {

  getLocations({ rules, player }: MaterialContext) {
    const selectedCard = rules.material(MaterialType.LandCard).selected(true)
    if (!!player && selectedCard.length) {
      return rules.getLegalMoves(player).filter(isMoveItemType(MaterialType.LandCard))
        .filter(move => move.itemIndex === selectedCard.getIndex() && move.location.rotation === selectedCard.getItem()?.location.rotation)
        .map(move => move.location) as Location[]
    }
    return []
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { xMax, xMin, yMax, yMin } = new TableauHelper(context.rules.game, location.player!).globalBoundaries
    const { x, y } = this.getBaseCoordinates(location, context)
    const deltaX = (xMin + xMax) / 2
    const deltaY = (yMin + yMax) / 2
    return {
      x: x! + (location.x! - deltaX) * (landCardDescription.width + 0.1),
      y: y !+ (location.y! - deltaY) * (landCardDescription.height + 0.1),
      z: (location.z ?? 0) * 0.05
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const coordinates = super.getItemCoordinates(item, context)
    if (context.type === MaterialType.DarkCityCard) coordinates.z = (coordinates.z ?? 0) + 1
    return coordinates
  }

  getBaseCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        return { x: -45, y: -40 }
      case Position.TopCenter:
        return { x: 0, y: -20 }
      case Position.TopRight:
        return { x: 45, y: -40 }
      case Position.BottomLeft:
        return players === 2 ? { x: -22, y: 7 } : players === 3 ? { x: -30, y: 15 } : { x: -22, y: 2 }
      case Position.BottomRight:
        return players === 2 ? { x: 22, y: 7 } : players === 3 ? { x: 30, y: 15 } : { x: 22, y: 2 }
    }
  }

  getHoverTransform = (item: MaterialItem, context: ItemContext) => {
    const { rules } = context
    const player = item.location.player
    const index = getRelativePlayerIndex(context, player)
    const isBottomPlayers = rules.players.length < 4 || (index === 0 || index === 3)
    const helper =  new TableauHelper(context.rules.game, item.location.player!).globalBoundaries
    const isFlipped = (context.material[context.type]! as FlatMaterialDescription).isFlippedOnTable(item, context) ?? false
    const transform = [`translateZ(${isFlipped? -10: 10}em)`, 'scale(2)']
    if (isStarting(item.id)) return transform
    if (!isBottomPlayers && helper.yMin === item.location.y) transform.push('translateY(25%)')
    if (isBottomPlayers && helper.yMax === item.location.y) transform.push('translateY(-25%)')

    return transform
  }

  locationDescription = new DropAreaDescription(landCardDescription)
}

export const tableauLocator = new TableauLocator()
