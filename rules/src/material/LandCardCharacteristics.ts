import { LandColor } from '../LandColor'
import { LandCard } from './LandCard'

type LandCardCharacteristics = {
  colors?: LandColor[],
  portal?: boolean,
  moon?: boolean,
  volcano?: boolean,
  fumarole?: boolean
}

export const LandCardsCharacteristics: Record<LandCard, LandCardCharacteristics> = {
  [LandCard.StartingBlue]: {
    colors: [LandColor.Blue],
  },
  [LandCard.StartingGray]: {
    colors: [LandColor.Gray],
  },
  [LandCard.StartingGreen]: {
    colors: [LandColor.Green],
  },
  [LandCard.StartingYellow]: {
    colors: [LandColor.Yellow],
  },
  [LandCard.LandBlue1]: {
    colors: [LandColor.Blue],
    portal: true,
  },
  [LandCard.LandBlueGreen1]: {
    colors: [LandColor.Blue, LandColor.Green],
  },
  [LandCard.LandBlueYellow1]: {
    colors: [LandColor.Blue, LandColor.Yellow],
  },
  [LandCard.Moon]: {
    moon: true
  },
  [LandCard.Red1]: {
    colors: [LandColor.Red],
    volcano: true,
    portal: true,
  },
  [LandCard.LandGray1]: {
    colors: [LandColor.Gray],
    portal: true,
  },
  [LandCard.LandGrayBlue1]: {
    colors: [LandColor.Gray, LandColor.Blue],
  },
  [LandCard.LandGrayGray1]: {
    colors: [LandColor.Gray, LandColor.Gray],
  },
  [LandCard.LandGrayGreen1]: {
    colors: [LandColor.Gray, LandColor.Green],
  },
  [LandCard.LandGrayYellow1]: {
    colors: [LandColor.Gray, LandColor.Yellow],
  },
  [LandCard.LandGreen1]: {
    colors: [LandColor.Green],
    portal: true,
  },
  [LandCard.LandGreenGreen1]: {
    colors: [LandColor.Green, LandColor.Green],
  },
  [LandCard.LandGreenGreen2]: {
    colors: [LandColor.Green, LandColor.Green],
  },
  [LandCard.LandRedBlue1]: {
    colors: [LandColor.Red, LandColor.Blue],
    volcano: true,
    portal: true,
  },
  [LandCard.LandRedGrayGray1]: {
    colors: [LandColor.Red, LandColor.Gray, LandColor.Gray],
    volcano: true,
  },

  [LandCard.LandRedGreen1]: {
    colors: [LandColor.Red, LandColor.Green],
    volcano: true,
  },
  [LandCard.LandRedYellow1]: {
    colors: [LandColor.Red, LandColor.Yellow],
    volcano: true,
  },

  [LandCard.LandYellow1]: {
    colors: [LandColor.Yellow],
    portal: true,
  },

  [LandCard.LandYellowGreen1]: {
    colors: [LandColor.Yellow, LandColor.Green],
  },

  [LandCard.Fumarole]: {
    fumarole: true,
  },
}