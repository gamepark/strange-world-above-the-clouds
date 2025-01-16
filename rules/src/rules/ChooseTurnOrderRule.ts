import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseTurnOrderRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.Round, (r = 0) => r + 1)
    return []
  }
  getPlayerMoves() {
    const turnOrder = this.turnOrder
    const moves: MaterialMove[] = []
    if (turnOrder.getItem()!.location.rotation) {
      moves.push(turnOrder.rotateItem(false))
    } else {
      moves.push(turnOrder.rotateItem(true))
    }

    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }

  get turnOrder() {
    return this
      .material(MaterialType.FirstPlayerCard)
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return []
    return [this.startRule(RuleId.Deal)]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.FirstPlayerCard)(move)) return []
    return [this.startRule(RuleId.Deal)]
  }
}
