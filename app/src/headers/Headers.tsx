/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { ComponentType } from 'react'
import { TheFirstStepHeader } from './TheFirstStepHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.TheFirstStep]: TheFirstStepHeader
}