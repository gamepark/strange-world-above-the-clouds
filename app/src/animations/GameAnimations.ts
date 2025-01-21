import { MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItem, isMoveItemType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move, context) => isMoveItemType(MaterialType.LandCard)(move)
    && context.rules.material(MaterialType.LandCard).getItem(move.itemIndex)!.location.type === LocationType.DraftArea && move.location.type === LocationType.Hand
  )
  .duration(0.4)

gameAnimations
  .when()
  .move((move, context) => isMoveItemType(MaterialType.LandCard)(move)
    && context.rules.material(MaterialType.LandCard).getItem(move.itemIndex)!.location.type === LocationType.LandDeck && move.location.type === LocationType.Hand
  )
  .duration(0.4)

gameAnimations
  .when()
  .move(isDeleteItem)
  .none()