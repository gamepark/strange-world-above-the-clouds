import isEqual from 'lodash/isEqual'
import { isSwamp } from '../LandType'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { RuleId } from './RuleId'

export class SwampRule extends BasePlayedCardRule {
  onRuleStart() {
    if (this.hasSwampInSameLine) {
      return [
        this.playedCard.rotateItem(true),
        ...this.goToNextRule()
      ]
    } else if (this.playedCardCharacteristics.portal) {
      return [this.startRule(RuleId.WelcomingTraveler)]
    }

    return this.goToNextRule()
  }

  get hasSwampInSameLine() {
    const playedCardItem = this.playedCard.getItem()!;
    return this.panorama
      .getItems()
      .some((item) =>
        !isEqual(item, playedCardItem) &&
        item.location.y === playedCardItem.location.y &&
        isSwamp(LandCardsCharacteristics[item.id as LandCard]?.colors ?? []) &&
        this.isNotDisabled(item)
      )
  }

  get playedCardCharacteristics() {
    const item = this.playedCard.getItem()!
    return LandCardsCharacteristics[item.id as LandCard]
  }
}