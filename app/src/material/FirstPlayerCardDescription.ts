import { CardDescription } from "@gamepark/react-game";
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import FirstPlayerLeft from '../images/FirstPlayerLeft.jpg'
import FirstPlayerRight from '../images/FirstPlayerRight.jpg'

export class FirstPlayerCardDescription extends CardDescription {
  image = FirstPlayerLeft
  backImage = FirstPlayerRight

  isFlipped(item: MaterialItem) {
    return item.location.rotation
  }
}

export const firstPlayerCardDescription = new FirstPlayerCardDescription()