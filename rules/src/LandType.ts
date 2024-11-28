export enum LandType {
  Water = 1, Snow, Plant, Swamp, Volcano
}

export const isSwamp = (lands: LandType[]) => lands.some((l) => l === LandType.Swamp);
export const isWater = (lands: LandType[]) => lands.some((l) => l === LandType.Water);
export const isVolcano = (lands: LandType[]) => lands.some((l) => l === LandType.Volcano);