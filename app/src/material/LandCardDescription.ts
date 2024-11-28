import { CardDescription } from '@gamepark/react-game'
import { LandCard } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
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
    [LandCard.LandDot1]: LandDot1,
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
    [LandCard.LandYellowGreen1]: LandYellowGreen1
  }
}

export const landCardDescription = new LandCardDescription()