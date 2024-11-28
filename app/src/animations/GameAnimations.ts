import { MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItem } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move(isDeleteItem)
  .none()