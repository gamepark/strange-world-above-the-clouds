import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { landCardDescription } from './LandCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandCard]: landCardDescription
}
