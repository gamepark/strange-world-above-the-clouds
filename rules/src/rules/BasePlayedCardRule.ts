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
    if (this.allCardsPlaces) {
      return [this.startRule(RuleId.Deal)]
    } else {
      return [this.startPlayerTurn(RuleId.PlayLandCard, this.nextPlayer)]
    }
  }

  isNotDisabled(item: MaterialItem) {
    return !item.location.rotation && item.id !== LandCard.Fumarole
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

  get playedCard() {
    return this
      .material(MaterialType.LandCard)
      .index(this.remind(Memory.PlayedLand))
  }
}