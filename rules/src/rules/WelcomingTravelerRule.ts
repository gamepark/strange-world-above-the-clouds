import { Direction, getSquareInDirection, isMoveItemType, ItemMove, Material, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'

export class WelcomingTravelerRule extends BasePlayedCardRule {
  onRuleStart() {
    const moves: MaterialMove[] = this.handleWelcomingTraveler()
    if (!this.travelerCount) {
      moves.push(...this.goToNextRule())
    }

    return moves
  }

  getPlayerMoves() {
    const boundaries = new TableauHelper(this.game, this.player).boundaries
    const travelers = this.travelers
    const playerTravelers = this.playerTravelers
    const playedCard = this.playedCard.getItem()!
    const moves: MaterialMove[] = []
    if (!playerTravelers.length) {
      moves.push(
        ...this.moveTravelerToTableau(playedCard, boundaries.xMin - 1, travelers, 0),
        ...this.moveTravelerToTableau(playedCard, boundaries.xMax + 1, travelers, 0),
        ...this.moveTravelerToTableau(playedCard, boundaries.xMin - 1, travelers, -1),
        ...this.moveTravelerToTableau(playedCard, boundaries.xMax + 1, travelers, -1)
      )
    } else {
      const firstTraveler = playerTravelers.getItem()!
      const top = this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, 0)
      const bottom = this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, -1)
      if (!top.length && !bottom.length) {
        moves.push(
          ...this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, 0, true),
          ...this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, -1, true),
        )
      } else {
        moves.push(
          ...top,
          ...bottom,
        )
      }
    }

    return moves
  }

  moveTravelerToTableau(playedCard: MaterialItem, x: number, travelers: Material, deltaY: number, allowOverlap?: boolean) {
    const travelersInSamePosition = this.playerTravelers.location((l) => l.x === x && l.y === playedCard.location.y! + deltaY).length
    if (travelersInSamePosition && !allowOverlap) return []
    return travelers.moveItems({
      type: LocationType.PlayerTraveler,
      player: this.player,
      x: x,
      y: playedCard.location.y! + deltaY,
      z: travelersInSamePosition
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.TravelerCard)(move)) return []
    this.decreaseTravelerCount()
    if (this.travelerCount === 0) return this.goToNextRule()
    return []
  }

  get travelers() {
    return this
      .material(MaterialType.TravelerCard)
      .location(LocationType.TravelerStack)
  }

  decreaseTravelerCount() {
    return this.memorize(Memory.TravelerToWelcome, (count: number) => count - 1)
  }

  get travelerCount() {
    return this.remind(Memory.TravelerToWelcome) ?? 0
  }

  handleWelcomingTraveler(): MaterialMove[] {
    const card = this.playedCard
    const item = card.getItem()!
    const coordinates = { x: item.location.x, y: item.location.y }
    const westCoordinates = getSquareInDirection(coordinates, Direction.West)
    const eastCoordinates = getSquareInDirection(coordinates, Direction.East)
    const westCard = this.panorama.location((l) => l.x === westCoordinates.x && l.y === westCoordinates.y)
    const westCardItem = westCard.getItem()
    const eastCard = this.panorama.location((l) => l.x === eastCoordinates.x && l.y === eastCoordinates.y)
    const eastCardItem = eastCard.getItem()
    if (
      !LandCardsCharacteristics[westCardItem?.id as LandCard]?.portal &&
      !LandCardsCharacteristics[eastCardItem?.id as LandCard]?.portal
    ) return []

    if (
      LandCardsCharacteristics[westCardItem?.id as LandCard]?.portal &&
      LandCardsCharacteristics[eastCardItem?.id as LandCard]?.portal
    ) {
      this.memorize(Memory.TravelerToWelcome, 2)
      return []
    }

    if (LandCardsCharacteristics[westCardItem?.id as LandCard]?.portal) {
      return this.fetchAdjacentPortal(westCard, Direction.West)
    }

    if (LandCardsCharacteristics[eastCardItem?.id as LandCard]?.portal) {
      return this.fetchAdjacentPortal(eastCard, Direction.East)
    }

    return []
  }

  fetchAdjacentPortal(card: Material, direction: Direction): MaterialMove[] {
    const item = card.getItem()!
    const coordinates = { x: item.location.x, y: item.location.y }
    const adjacentCoordinates = getSquareInDirection(coordinates, direction)
    const adjacentCard = this.panorama.location((l) => l.x === adjacentCoordinates.x && l.y === adjacentCoordinates.y).getItem()
    if (LandCardsCharacteristics[adjacentCard?.id as LandCard]?.portal) {
      return [this.playedCard.rotateItem(true)]
    } else {
      this.memorize(Memory.TravelerToWelcome, 1)
      return []
    }
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
  }

  get playerTravelers() {
    return this
      .material(MaterialType.TravelerCard)
      .location(LocationType.PlayerTraveler)
      .player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.TravelerToWelcome)
    this.forget(Memory.PlayedLand)
    return []
  }


}