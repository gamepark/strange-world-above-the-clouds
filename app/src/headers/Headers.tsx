/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseTurnOrderHeader } from './ChooseTurnOrderHeader'
import { DesolationOfTheTzimimeHeader } from './DesolationOfTheTzimimeHeader'
import { DraftHeader } from './DraftHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseTurnOrder]: ChooseTurnOrderHeader,
  [RuleId.Draft]: DraftHeader,
  [RuleId.DesolationOfTheTzimime]: DesolationOfTheTzimimeHeader
}