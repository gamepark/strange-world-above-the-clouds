import { LandType } from '../LandType'
import { LandCard } from './LandCard'

enum Animal {
  Rat = 1,
  Deer,
  Spirit,
  Bear,
  Goat,
  Phoenix,
  Snake
}

type LandCardCharacteristics = {
  types?: LandType[],
  animals?: Animal[]
  portal?: boolean,
  moon?: boolean,
  fumarole?: boolean
}

export const LandCardsCharacteristics: Record<LandCard, LandCardCharacteristics> = {
  [LandCard.StartingBlue]: {
    types: [LandType.Water],
  },
  [LandCard.StartingGray]: {
    types: [LandType.Mountain],
  },
  [LandCard.StartingGreen]: {
    types: [LandType.Plant],
    animals: [Animal.Bear]
  },
  [LandCard.StartingYellow]: {
    types: [LandType.Swamp],
  },
  [LandCard.LandBlue1]: {
    types: [LandType.Water],
    portal: true,
  },
  [LandCard.Red1]: {
    types: [LandType.Volcano],
    portal: true,
  },
  [LandCard.LandBlueGreen1]: {
    types: [LandType.Water, LandType.Plant],
    animals: [Animal.Spirit]
  },
  [LandCard.LandBlueYellow1]: {
    types: [LandType.Water, LandType.Swamp],
  },
  [LandCard.Moon]: {
    moon: true
  },
  [LandCard.Red1]: {
    types: [LandType.Volcano],
    portal: true,
  },
  [LandCard.LandGray1]: {
    types: [LandType.Mountain],
    portal: true,
  },
  [LandCard.LandGrayBlue1]: {
    types: [LandType.Mountain, LandType.Water],
  },
  [LandCard.LandGrayGray1]: {
    types: [LandType.Mountain, LandType.Mountain],
  },
  [LandCard.LandGrayGreen1]: {
    types: [LandType.Mountain, LandType.Plant],
    animals: [Animal.Goat]
  },
  [LandCard.LandGrayYellow1]: {
    types: [LandType.Mountain, LandType.Swamp],
  },
  [LandCard.LandGreen1]: {
    types: [LandType.Plant],
    animals: [Animal.Rat],
    portal: true,
  },
  [LandCard.LandGreenGreen1]: {
    types: [LandType.Plant, LandType.Plant],
    animals: [Animal.Deer, Animal.Goat]
  },
  [LandCard.LandGreenGreen2]: {
    types: [LandType.Plant, LandType.Plant],
    animals: [Animal.Deer, Animal.Spirit]
  },
  [LandCard.LandRedBlue1]: {
    types: [LandType.Volcano, LandType.Water]
  },
  [LandCard.LandRedGrayGray1]: {
    types: [LandType.Volcano, LandType.Mountain, LandType.Mountain],
  },

  [LandCard.LandRedGreen1]: {
    types: [LandType.Volcano, LandType.Plant],
    animals: [Animal.Phoenix]
  },
  [LandCard.LandRedYellow1]: {
    types: [LandType.Volcano, LandType.Swamp],
  },

  [LandCard.LandYellow1]: {
    types: [LandType.Swamp],
    portal: true,
  },

  [LandCard.LandYellowGreen1]: {
    types: [LandType.Swamp, LandType.Plant],
    animals: [Animal.Snake]
  },

  [LandCard.Fumarole]: {
    fumarole: true,
  },
}