import { LandType } from '../LandType'

export enum Traveler {
  Splash = 1,
  Burk,
  Kark,
  Floulou,
  Pshit,
  Boung,
  Roro,
  Rumph
}

export type TravelerCharacteristic = {
  types?: LandType[]
  fumarole?: boolean
  portal?: boolean
  animal?: boolean
  min: number
  score: number
}

export const TravelerCharacteristics: Record<Traveler, TravelerCharacteristic> = {
  [Traveler.Splash]: {
    types: [LandType.Water],
    min: 3,
    score: 5
  },
  [Traveler.Burk]: {
    types: [LandType.Swamp],
    min: 2,
    score: 4
  },
  [Traveler.Kark]: {
    types: [LandType.Mountain],
    min: 5,
    score: 6
  },
  [Traveler.Floulou]: {
    types: [LandType.Plant, LandType.Water, LandType.Mountain, LandType.Swamp],
    min: 2,
    score: 8,
  },
  [Traveler.Pshit]: {
    fumarole: true,
    min: 3,
    score: 5
  },
  [Traveler.Boung]: {
    portal: true,
    min: 2,
    score: 8
  },
  [Traveler.Roro]: {
    animal: true,
    min: 4,
    score: 4
  },
  [Traveler.Rumph]: {
    types: [LandType.Volcano],
    min: 3,
    score: 6
  },
}