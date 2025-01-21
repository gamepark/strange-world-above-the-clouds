import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LandCard } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { Trans } from 'react-i18next'
import MoonMini from '../images/icons/moon-mini.png'
import Moon from '../images/icons/moon.png'
import MountainMini from '../images/icons/mountain-mini.png'
import Mountain from '../images/icons/mountain.png'
import Plant from '../images/icons/plant.png'
import PlantMini from '../images/icons/star.png'
import Star from '../images/icons/star.png'
import SwampMini from '../images/icons/swamp-mini.png'
import Swamp from '../images/icons/swamp.png'
import Volcano from '../images/icons/volcano.png'
import WaterMini from '../images/icons/water-mini.png'
import Water from '../images/icons/water.png'
import Fumarole from '../images/lands/Fumarole.jpg'
import LandBack from '../images/lands/LandBack.jpg'
import LandBlue1 from '../images/lands/LandBlue1.jpg'
import LandBlueGreen1 from '../images/lands/LandBlueGreen1.jpg'
import LandBlueYellow1 from '../images/lands/LandBlueYellow1.jpg'
import LandDot1 from '../images/lands/LandDot1.jpg'
import LandGray1 from '../images/lands/LandGray1.jpg'
import LandGrayBlue1 from '../images/lands/LandGrayBlue1.jpg'
import LandGrayGray1 from '../images/lands/LandGrayGray1.jpg'
import LandGrayGreen1 from '../images/lands/LandGrayGreen1.jpg'
import LandGrayYellow1 from '../images/lands/LandGrayYellow1.jpg'
import LandGreen1 from '../images/lands/LandGreen1.jpg'
import LandGreenGreen1 from '../images/lands/LandGreenGreen1.jpg'
import LandGreenGreen2 from '../images/lands/LandGreenGreen2.jpg'
import LandRed1 from '../images/lands/LandRed1.jpg'
import LandRedBlue1 from '../images/lands/LandRedBlue1.jpg'
import LandRedGrayGray1 from '../images/lands/LandRedGrayGray1.jpg'
import LandRedGreen1 from '../images/lands/LandRedGreen1.jpg'
import LandRedYellow1 from '../images/lands/LandRedYellow1.jpg'
import LandYellow1 from '../images/lands/LandYellow1.jpg'
import LandYellowGreen1 from '../images/lands/LandYellowGreen1.jpg'
import StartingBlue from '../images/lands/StartingBlue.jpg'
import StartingGray from '../images/lands/StartingGray.jpg'
import StartingGreen from '../images/lands/StartingGreen.jpg'
import StartingYellow from '../images/lands/StartingYellow.jpg'
import EarthPanel from '../images/panel/earth.jpg'
import MountainPanel from '../images/panel/mountain.jpg'

import SwampPanel from '../images/panel/swamp.jpg'
import WaterPanel from '../images/panel/water.jpg'
import { LandCardHelp } from './help/LandCardHelp'

export class LandCardDescription extends CardDescription {
  backImage = LandBack

  images = {
    [LandCard.StartingBlue]: StartingBlue,
    [LandCard.StartingGray]: StartingGray,
    [LandCard.StartingGreen]: StartingGreen,
    [LandCard.StartingYellow]: StartingYellow,
    [LandCard.LandBlue1]: LandBlue1,
    [LandCard.LandBlueGreen1]: LandBlueGreen1,
    [LandCard.LandBlueYellow1]: LandBlueYellow1,
    [LandCard.Moon]: LandDot1,
    [LandCard.Red1]: LandRed1,
    [LandCard.LandGray1]: LandGray1,
    [LandCard.LandGrayBlue1]: LandGrayBlue1,
    [LandCard.LandGrayGray1]: LandGrayGray1,
    [LandCard.LandGrayGreen1]: LandGrayGreen1,
    [LandCard.LandGrayYellow1]: LandGrayYellow1,
    [LandCard.LandGreen1]: LandGreen1,
    [LandCard.LandGreenGreen1]: LandGreenGreen1,
    [LandCard.LandGreenGreen2]: LandGreenGreen2,
    [LandCard.LandRedBlue1]: LandRedBlue1,
    [LandCard.LandRedGrayGray1]: LandRedGrayGray1,
    [LandCard.LandRedGreen1]: LandRedGreen1,
    [LandCard.LandRedYellow1]: LandRedYellow1,
    [LandCard.LandYellow1]: LandYellow1,
    [LandCard.LandYellowGreen1]: LandYellowGreen1,
    [LandCard.Fumarole] : Fumarole
  }

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    if (item.location?.type === LocationType.Tableau && item.location.rotation) return true
    return super.isFlipped(item, context)
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    if (item.location?.type === LocationType.DraftArea) return true;
    return super.isFlippedOnTable(item, context)
  }

  getImages(): string[] {
    const images = super.getImages()
    images.push(Moon)
    images.push(MoonMini)
    images.push(Mountain)
    images.push(MountainMini)
    images.push(Plant)
    images.push(PlantMini)
    images.push(Swamp)
    images.push(SwampMini)
    images.push(Water)
    images.push(WaterMini)
    images.push(Star)
    images.push(Volcano)
    images.push(SwampPanel)
    images.push(WaterPanel)
    images.push(MountainPanel)
    images.push(EarthPanel)

    return images
  }

  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    const locator = context.locators[item.location.type]
    if (!locator) return []
    return locator.getHoverTransform(item, context)
  }

  getHelpButton() {
    return <></>
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const draftMove: MoveItem | undefined = legalMoves.find((move) => this.isDraftMove(move, context)) as MoveItem | undefined
    if (draftMove) {
      const players = context.rules.game.players
      const imAtLeft = players[(players.indexOf(draftMove.location.player!) + 1) % players.length] === context.player
      return (
        <>
          <ItemMenuButton label={<Trans defaults="Give"/>}
                          move={draftMove}
                          angle={0}
                          radius={5}
          >
            <FontAwesomeIcon icon={imAtLeft? faArrowRight: faArrowUp}/>
          </ItemMenuButton>
          </>
      )
    }

    return
  }

  isMenuAlwaysVisible(): boolean {
    return true
  }

  isDraftMove(move: MaterialMove, context: ItemContext): move is MoveItem {
    return isMoveItemType(MaterialType.LandCard)(move)
      && move.location.type === LocationType.DraftArea
      && move.itemIndex === context.index

  }

  help = LandCardHelp

}

export const landCardDescription = new LandCardDescription()
