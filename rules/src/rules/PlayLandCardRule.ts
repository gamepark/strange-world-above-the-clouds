import { Direction, getSquareInDirection, isMoveItemType, isStartRule, ItemMove, Material, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayLandCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    const helper = new TableauHelper(this.game, this.player)
    return helper.availableSpaces.flatMap((location) => {
      return this.hand.moveItems(location)
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandCard)(move) || move.location.rotation !== undefined) return []
    const moves: MaterialMove[] = this.handleWelcomingTraveler(move)
    if (moves.some(isStartRule)) return moves
    if (this.allCardsPlaces) {
      moves.push(this.startRule(RuleId.Deal))
    } else {
      moves.push(this.startPlayerTurn(RuleId.PlayLandCard, this.nextPlayer))
    }

    return moves
  }

  handleWelcomingTraveler(move: MoveItem): MaterialMove[] {
    const card = this.material(move.itemType).index(move.itemIndex)
    const item = card.getItem()!
    const coordinates = { x: item.location.x, y: item.location.y }
    if (!LandCardsCharacteristics[item.id as LandCard]?.portal) return []
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
      return [this.startRule(RuleId.WelcomeTraveler)]
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
      return [card.rotateItem(true)]
    } else {
      this.memorize(Memory.TravelerToWelcome, 1)
      return [this.startRule(RuleId.WelcomeTraveler)]
    }
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
  }

  get allCardsPlaces() {
    return this.game
      .players
      .every((p) => this.getHand(p).length === 0)
  }

  getHand(player: PlayerColor) {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Hand)
      .player(player)
  }

  get isEnd() {
    return this.game
      .players
      .every((p) => new TableauHelper(this.game, p).isFull)
  }

  get hand() {
    return this.getHand(this.player)
  }
}