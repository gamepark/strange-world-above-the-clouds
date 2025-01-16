import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChangeFirstPlayerRule extends MaterialRulesPart {
  onRuleStart() {
    const newFirstPlayer = this.nextPlayer
    return [
      this.firstPlayerCard.moveItem({
        type: LocationType.TurnOrder,
        player: newFirstPlayer
      }),
      this.startPlayerTurn(RuleId.ChooseTurnOrder, newFirstPlayer)
    ]
  }

  get nextPlayer() {
    return this.game.players[(this.game.players.indexOf(this.firstPlayer) + 1) % this.game.players.length]
  }

  get firstPlayerCard() {
    return this.material(MaterialType.FirstPlayerCard)
  }

  get firstPlayer() {
    return this.firstPlayerCard.getItem()!.location.player!
  }
}
