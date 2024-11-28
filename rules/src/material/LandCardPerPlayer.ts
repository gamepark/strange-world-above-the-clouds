import { LandCard } from './LandCard'

export const getLandscapeCards = (players: number) => {
  if (players === 2) return twoPlayersCards
  if (players === 3) return threePlayersCards
  if (players === 4) return fourPlayerCards
  return onePlayerCards
}

const onePlayerCards = {
  [LandCard.LandDot1]: 4,
  [LandCard.LandGreen1]: 1,
  [LandCard.LandYellow1]: 1,
  [LandCard.LandBlue1]: 1,
  [LandCard.LandGray1]: 1,
  [LandCard.LandRed1]: 0,
  [LandCard.LandRedYellow1]: 1,
  [LandCard.LandRedBlue1]: 1,
  [LandCard.LandRedGrayGray1]: 1,
  [LandCard.LandRedGreen1]: 1,
  [LandCard.LandGrayGray1]: 1,
  [LandCard.LandGrayGreen1]: 1,
  [LandCard.LandGrayBlue1]: 1,
  [LandCard.LandGrayYellow1]: 1,
  [LandCard.LandBlueYellow1]: 1,
  [LandCard.LandYellowGreen1]: 1,
  [LandCard.LandGreenGreen1]: 1,
  [LandCard.LandGreenGreen2]: 1,
  [LandCard.LandBlueGreen1]: 1,
}

const twoPlayersCards = {
  [LandCard.LandDot1]: 6,
  [LandCard.LandGreen1]: 2,
  [LandCard.LandYellow1]: 2,
  [LandCard.LandBlue1]: 2,
  [LandCard.LandGray1]: 2,
  [LandCard.LandRed1]: 0,
  [LandCard.LandRedYellow1]: 1,
  [LandCard.LandRedBlue1]: 1,
  [LandCard.LandRedGrayGray1]: 2,
  [LandCard.LandRedGreen1]: 2,
  [LandCard.LandGrayGray1]: 2,
  [LandCard.LandGrayGreen1]: 2,
  [LandCard.LandGrayBlue1]: 2,
  [LandCard.LandGrayYellow1]: 2,
  [LandCard.LandBlueYellow1]: 2,
  [LandCard.LandYellowGreen1]: 2,
  [LandCard.LandGreenGreen1]: 2,
  [LandCard.LandGreenGreen2]: 2,
  [LandCard.LandBlueGreen1]: 2,
}

const threePlayersCards = {
  [LandCard.LandDot1]: 8,
  [LandCard.LandGreen1]: 2,
  [LandCard.LandYellow1]: 3,
  [LandCard.LandBlue1]: 3,
  [LandCard.LandGray1]: 2,
  [LandCard.LandRed1]: 0,
  [LandCard.LandRedYellow1]: 1,
  [LandCard.LandRedBlue1]: 1,
  [LandCard.LandRedGrayGray1]: 3,
  [LandCard.LandRedGreen1]: 3,
  [LandCard.LandGrayGray1]: 2,
  [LandCard.LandGrayGreen1]: 2,
  [LandCard.LandGrayBlue1]: 2,
  [LandCard.LandGrayYellow1]: 2,
  [LandCard.LandBlueYellow1]: 2,
  [LandCard.LandYellowGreen1]: 2,
  [LandCard.LandGreenGreen1]: 3,
  [LandCard.LandGreenGreen2]: 2,
  [LandCard.LandBlueGreen1]: 2,
}

const fourPlayerCards = {
  [LandCard.LandBlue1]: 10,
  [LandCard.LandBlueGreen1]: 3,
  [LandCard.LandBlueYellow1]: 3,
  [LandCard.LandDot1]: 3,
  [LandCard.LandGray1]: 3,
  [LandCard.LandRed1]: 1,
  [LandCard.LandGrayBlue1]: 2,
  [LandCard.LandGrayGray1]: 2,
  [LandCard.LandGrayGreen1]: 3,
  [LandCard.LandGrayYellow1]: 3,
  [LandCard.LandGreen1]: 3,
  [LandCard.LandGreenGreen1]: 3,
  [LandCard.LandGreenGreen2]: 3,
  [LandCard.LandRedBlue1]: 3,
  [LandCard.LandRedGrayGray1]: 3,
  [LandCard.LandRedGreen1]: 3,
  [LandCard.LandRedYellow1]: 3,
  [LandCard.LandYellow1]: 3,
  [LandCard.LandYellowGreen1]: 3,
}