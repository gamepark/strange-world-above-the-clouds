import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Blue = 1, Gray, Green, Yellow
}

export const playerColors = getEnumValues(PlayerColor)