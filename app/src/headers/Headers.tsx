/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { ComponentType } from 'react'
import { DraftHeader } from './DraftHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Draft]: DraftHeader
}