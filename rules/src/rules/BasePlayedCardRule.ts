import { PlayerTurnRule } from "@gamepark/rules-api";
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { TableauHelper } from './helpers/TableauHelper'
import { RuleId } from './RuleId'

export class BasePlayedCardRule extends PlayerTurnRule {
  goToNextRule() {
    if (this.allCardsPlaces) {
      return [this.startRule(RuleId.Deal)]
    } else {
      return [this.startPlayerTurn(RuleId.PlayLandCard, this.nextPlayer)]
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
}