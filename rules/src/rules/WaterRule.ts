import { getDistanceBetweenSquares } from '@gamepark/rules-api'
import { isSwamp, isWater } from '../LandType'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { RuleId } from './RuleId'

export class WaterRule extends BasePlayedCardRule {
  onRuleStart() {
    if (this.hasAdjacentWaterLand) {
      return [
        this.playedCard.rotateItem(true),
        ...this.goToNextRule()
      ]
    } else if (this.isAlsoSwamp) {
      return [this.startRule(RuleId.Swamp)]
    } else if (this.playedCardCharacteristics.portal) {
      return [this.startRule(RuleId.WelcomingTraveler)]
    }

    return this.goToNextRule()
  }

  get hasAdjacentWaterLand() {
    return this.adjacentCards
      .getItems()
      .some((item) => isWater(LandCardsCharacteristics[item.id as LandCard]?.colors ?? []))
  }

  get adjacentCards() {
    const playedCardItem = this.playedCard.getItem()!
    return this.panorama
      .filter((item) => getDistanceBetweenSquares(
        { x: item.location.x!, y: item.location.y! },
        { x: playedCardItem.location.x!, y: playedCardItem.location.y! }
      ) === 1 && this.isNotDisabled(item))
  }

  get isAlsoSwamp() {
    return isSwamp(this.playedCardCharacteristics.colors ?? [])
  }

  get playedCardCharacteristics() {
    const item = this.playedCard.getItem()!
    return LandCardsCharacteristics[item.id as LandCard]
  }
}