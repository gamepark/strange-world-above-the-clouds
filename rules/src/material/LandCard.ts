export enum LandCard {
  StartingBlue = 1,
  StartingGray,
  StartingGreen,
  StartingYellow,

  LandBlue1 = 10,
  LandBlueGreen1,
  LandBlueYellow1,
  Moon,
  Red1,
  LandGray1,
  LandGrayBlue1,
  LandGrayGray1,
  LandGrayGreen1,
  LandGrayYellow1,
  LandGreen1,
  LandGreenGreen1,
  LandGreenGreen2,
  LandRedBlue1,
  LandRedGrayGray1,
  LandRedGreen1,
  LandRedYellow1,
  LandYellow1,
  LandYellowGreen1,

  Fumarole = 50,
}

export enum LandCardColor {

}


export const isStarting = (card: LandCard) => card < 10