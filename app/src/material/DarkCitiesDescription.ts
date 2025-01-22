/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { DarkCity } from '@gamepark/strange-world-above-the-clouds/material/DarkCity'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import DarkCityBack4 from '../images/darkcity/DarkCityBack4.jpg'
import DarkCityBack5 from '../images/darkcity/DarkCityBack5.jpg'
import DarkCityBack7 from '../images/darkcity/DarkCityBack7.jpg'
import DarkCityBack9 from '../images/darkcity/DarkCityBack9.jpg'
import DarkCityFront4 from '../images/darkcity/DarkCityFront4.jpg'
import DarkCityFront5 from '../images/darkcity/DarkCityFront5.jpg'
import DarkCityFront7 from '../images/darkcity/DarkCityFront7.jpg'
import DarkCityFront9 from '../images/darkcity/DarkCityFront9.jpg'
import { DarkCitiesHelp } from './help/DarkCitiesHelp'

export class DarkCitiesDescription extends CardDescription {
  backImages = {
    [DarkCity.DarkCity4]: DarkCityBack4,
    [DarkCity.DarkCity5]: DarkCityBack5,
    [DarkCity.DarkCity7]: DarkCityBack7,
    [DarkCity.DarkCity9]: DarkCityBack9
  }

  images = {
    [DarkCity.DarkCity4]: DarkCityFront4,
    [DarkCity.DarkCity5]: DarkCityFront5,
    [DarkCity.DarkCity7]: DarkCityFront7,
    [DarkCity.DarkCity9]: DarkCityFront9
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    if (item.location?.y !== undefined && item.location.y % 1 !== 0) return true
    return super.isFlippedOnTable(item, context)
  }

  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    const locator = context.locators[item.location.type]
    if (!locator) return []
    return locator.getHoverTransform(item, context)
  }

  getItemExtraCss(item: MaterialItem, _context: ItemContext): Interpolation<Theme> {
    if (item.location?.type === LocationType.Tableau) {
      return css`
        > div > div {
          box-shadow: unset;
        }
      `
    }

    return
  }

  help = DarkCitiesHelp
}

export const darkCitiesDescription = new DarkCitiesDescription()