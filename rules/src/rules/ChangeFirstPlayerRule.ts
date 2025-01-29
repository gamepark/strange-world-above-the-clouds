import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChangeFirstPlayerRule extends MaterialRulesPart {
  onRuleStart() {
    const newFirstPlayer = this.nextPlayer
    const moves: MaterialMove[] = [
      this.firstPlayerCard.moveItem({
        type: LocationType.TurnOrder,
        player: newFirstPlayer
      })
    ]

    if (this.game.players.length > 2) {
      moves.push(this.startPlayerTurn(RuleId.ChooseTurnOrder, newFirstPlayer))

    } else {
      moves.push(this.startRule(RuleId.Deal))
    }

    return moves
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
