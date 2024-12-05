import { MaterialItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LandCard } from '../material/LandCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BasePlayedCardRule extends PlayerTurnRule {
  goToNextRule() {

    if (this.game.players.every((p) => new TableauHelper(this.game, p).isFull)) {
      return [this.endGame()]
    }

    if (this.allCardsPlaces) {
      return [this.startRule(RuleId.Deal)]
    } else {
      return [this.startPlayerTurn(RuleId.PlayLandCard, this.nextPlayer)]
    }
  }

  get nextPlayer() {
    if (this.turnOrderCard) {
      const previousIndex = this.game.players.indexOf(this.player) - 1
      if (previousIndex < 0) return this.game.players[this.game.players.length - 1]
      return this.game.players[previousIndex - 1]
    }

    return this.game.players[(this.game.players.indexOf(this.player) + 1) % this.game.players.length]
  }

  get turnOrderCard() {
    return this.material(MaterialType.FirstPlayerCard)
      .getItem()?.location.rotation
  }

  isNotFumarole(item: MaterialItem) {
    return item.id !== LandCard.Fumarole
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
      .rotation((r) => r === undefined)
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

  get playedCard() {
    return this
      .material(MaterialType.LandCard)
      .index(this.remind(Memory.PlayedLand))
  }
}