import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { StrangeWorldAboveTheCloudsSetup } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsSetup'

export const me = PlayerColor.Gray
export const opponentLeft = PlayerColor.Yellow
export const opponentRight = PlayerColor.Green


export class TutorialSetup extends StrangeWorldAboveTheCloudsSetup {

  setupTurnOrder() {
    this.material(MaterialType.FirstPlayerCard).createItem({
      location: {
        type: LocationType.TurnOrder,
        player: opponentLeft
      }
    })
  }

  start() {
    this.startRule(RuleId.Deal)
  }
}