import { isCreateItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class ChooseTurnOrderRule extends PlayerTurnRule {
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

  afterItemMove(move: ItemMove) {
    if (!isCreateItemType(MaterialType.FirstPlayerCard)(move)) return []
    return [this.startRule(RuleId.Deal)]
  }
}