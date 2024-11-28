import { CardDescription } from "@gamepark/react-game";
import { Traveler } from '@gamepark/strange-world-above-the-clouds/material/Traveler'
import Splash from '../images/travelers/Splash.jpg'
import Burk from '../images/travelers/Burk.jpg'
import Kark from '../images/travelers/Kark.jpg'
import Floulou from '../images/travelers/Floulou.jpg'
import Pshit from '../images/travelers/Pshit.jpg'
import Boung from '../images/travelers/Boung.jpg'
import Roro from '../images/travelers/Roro.jpg'
import Rumph from '../images/travelers/Rumph.jpg'

export class TravelerDescription extends CardDescription {
  images = {
    [Traveler.Splash]: Splash,
    [Traveler.Burk]: Burk,
    [Traveler.Kark]: Kark,
    [Traveler.Floulou]: Floulou,
    [Traveler.Pshit]: Pshit,
    [Traveler.Boung]: Boung,
    [Traveler.Roro]: Roro,
    [Traveler.Rumph]: Rumph,
  }
}

export const travelerDescription = new TravelerDescription()