export enum LandType {
  Water = 1, Snow, Plant, Swamp, Volcano
}

export const isSwamp = (land: LandType) => land === LandType.Swamp;
export const isWater = (land: LandType) => land === LandType.Water;
export const isVolcano = (land: LandType) => land === LandType.Volcano;