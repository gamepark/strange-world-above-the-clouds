import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
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
    const card = this.material(move.itemType).index(move.itemIndex)
    this.memorize(Memory.PlayedLand, move.itemIndex)
    const item = card.getItem()!
    const moves: MaterialMove[] = []
    const characteristics = LandCardsCharacteristics[item.id as LandCard]
    if (characteristics?.portal) return [this.startRule(RuleId.WelcomingTraveler)]
    //if (characteristics.moon) return [this.startRule(RuleId.Moon)]
    //if (characteristics.volcano) return [this.startRule(RuleId.Eruption)]
    if (this.allCardsPlaces) {
      moves.push(this.startRule(RuleId.Deal))
    } else {
      moves.push(this.startPlayerTurn(RuleId.PlayLandCard, this.nextPlayer))
    }

    return moves
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