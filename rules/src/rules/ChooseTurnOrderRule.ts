import { isCreateItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseTurnOrderRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      this.material(MaterialType.FirstPlayerCard)
        .createItem({
          location: {
            type: LocationType.TurnOrder,
            player: this.player,
            rotation: false
          }
        }),
      this.material(MaterialType.FirstPlayerCard)
        .createItem({
          location: {
            type: LocationType.TurnOrder,
            player: this.player,
            rotation: true
          }
        })
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isCreateItemType(MaterialType.FirstPlayerCard)(move)) return []
    return [this.startRule(RuleId.Deal)]
  }
}