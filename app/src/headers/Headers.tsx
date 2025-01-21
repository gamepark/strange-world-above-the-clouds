/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { ComponentType } from 'react'
import { ChangeFirstPlayerHeader } from './ChangeFirstPlayerHeader'
import { ChooseTurnOrderHeader } from './ChooseTurnOrderHeader'
import { DealHeader } from './DealHeader'
import { DesolationOfTheTzimimeHeader } from './DesolationOfTheTzimimeHeader'
import { DraftHeader } from './DraftHeader'
import { PlaceDarkCityHeader } from './PlaceDarkCityHeader'
import { PlayLandCardHeader } from './PlayLandCardHeader'
import { VolcanoHeader } from './VolcanoHeader'
import { WelcomingTravelerHeader } from './WelcomingTravelerHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Deal]: DealHeader,
  [RuleId.Draft]: DraftHeader,
  [RuleId.PlayLandCard]: PlayLandCardHeader,
  [RuleId.WelcomingTraveler]: WelcomingTravelerHeader,
  [RuleId.PlaceDarkCity]: PlaceDarkCityHeader,
  [RuleId.Volcano]: VolcanoHeader,
  [RuleId.ChooseTurnOrder]: ChooseTurnOrderHeader,
  [RuleId.ChangeFirstPlayer]: ChangeFirstPlayerHeader,
  [RuleId.DesolationOfTheTzimime]: DesolationOfTheTzimimeHeader
}