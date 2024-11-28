import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DealRule extends MaterialRulesPart {
  onRuleStart() {
    const deck = this.material(MaterialType.LandCard).location(LocationType.LandDeck).deck()
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      moves.push(
        ...deck.deal({
          type: LocationType.Hand,
          player: player
        }, 3)
      )
    }

    moves.push(this.startSimultaneousRule(RuleId.Draft))

    return moves
  }
}