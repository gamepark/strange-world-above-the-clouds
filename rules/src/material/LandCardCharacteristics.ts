import { LandType } from '../LandType'
import { LandCard } from './LandCard'

type LandCardCharacteristics = {
  colors?: LandType[],
  portal?: boolean,
  moon?: boolean,
  fumarole?: boolean
}

export const LandCardsCharacteristics: Record<LandCard, LandCardCharacteristics> = {
  [LandCard.StartingBlue]: {
    colors: [LandType.Water],
  },
  [LandCard.StartingGray]: {
    colors: [LandType.Snow],
  },
  [LandCard.StartingGreen]: {
    colors: [LandType.Plant],
  },
  [LandCard.StartingYellow]: {
    colors: [LandType.Swamp],
  },
  [LandCard.LandBlue1]: {
    colors: [LandType.Water],
    portal: true,
  },
  [LandCard.Red1]: {
    colors: [LandType.Volcano],
    portal: true,
  },
  [LandCard.LandBlueGreen1]: {
    colors: [LandType.Water, LandType.Plant],
  },
  [LandCard.LandBlueYellow1]: {
    colors: [LandType.Water, LandType.Swamp],
  },
  [LandCard.Moon]: {
    moon: true
  },
  [LandCard.Red1]: {
    colors: [LandType.Volcano],
    portal: true,
  },
  [LandCard.LandGray1]: {
    colors: [LandType.Snow],
    portal: true,
  },
  [LandCard.LandGrayBlue1]: {
    colors: [LandType.Snow, LandType.Water],
  },
  [LandCard.LandGrayGray1]: {
    colors: [LandType.Snow, LandType.Snow],
  },
  [LandCard.LandGrayGreen1]: {
    colors: [LandType.Snow, LandType.Plant],
  },
  [LandCard.LandGrayYellow1]: {
    colors: [LandType.Snow, LandType.Swamp],
  },
  [LandCard.LandGreen1]: {
    colors: [LandType.Plant],
    portal: true,
  },
  [LandCard.LandGreenGreen1]: {
    colors: [LandType.Plant, LandType.Plant],
  },
  [LandCard.LandGreenGreen2]: {
    colors: [LandType.Plant, LandType.Plant],
  },
  [LandCard.LandRedBlue1]: {
    colors: [LandType.Volcano, LandType.Water]
  },
  [LandCard.LandRedGrayGray1]: {
    colors: [LandType.Volcano, LandType.Snow, LandType.Snow],
  },

  [LandCard.LandRedGreen1]: {
    colors: [LandType.Volcano, LandType.Plant],
  },
  [LandCard.LandRedYellow1]: {
    colors: [LandType.Volcano, LandType.Swamp],
  },

  [LandCard.LandYellow1]: {
    colors: [LandType.Swamp],
    portal: true,
  },

  [LandCard.LandYellowGreen1]: {
    colors: [LandType.Swamp, LandType.Plant],
  },

  [LandCard.Fumarole]: {
    fumarole: true,
  },
}