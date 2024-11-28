import { CardDescription } from '@gamepark/react-game'
import { DarkCity } from '@gamepark/strange-world-above-the-clouds/material/DarkCity'
import DarkCityBack4 from '../images/darkcity/DarkCityBack4.jpg'
import DarkCityBack5 from '../images/darkcity/DarkCityBack5.jpg'
import DarkCityBack7 from '../images/darkcity/DarkCityBack7.jpg'
import DarkCityBack9 from '../images/darkcity/DarkCityBack9.jpg'
import DarkCityFront4 from '../images/darkcity/DarkCityFront4.jpg'
import DarkCityFront5 from '../images/darkcity/DarkCityFront5.jpg'
import DarkCityFront7 from '../images/darkcity/DarkCityFront7.jpg'
import DarkCityFront9 from '../images/darkcity/DarkCityFront9.jpg'

export class DarkCitiesDescription extends CardDescription {
  backImages = {
    [DarkCity.DarkCity4]: DarkCityBack4,
    [DarkCity.DarkCity5]: DarkCityBack5,
    [DarkCity.DarkCity7]: DarkCityBack7,
    [DarkCity.DarkCity9]: DarkCityBack9,
  }

  images = {
    [DarkCity.DarkCity4]: DarkCityFront4,
    [DarkCity.DarkCity5]: DarkCityFront5,
    [DarkCity.DarkCity7]: DarkCityFront7,
    [DarkCity.DarkCity9]: DarkCityFront9,
  }
}

export const darkCitiesDescription = new DarkCitiesDescription()