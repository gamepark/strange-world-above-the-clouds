import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { darkCitiesDescription } from './DarkCitiesDescription'
import { landCardDescription } from './LandCardDescription'
import { travelerDescription } from './TravelerDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandCard]: landCardDescription,
  [MaterialType.DarkCityCard]: darkCitiesDescription,
  [MaterialType.TravelerCard]: travelerDescription
}
