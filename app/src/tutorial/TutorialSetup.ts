import { LandCard } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { RuleId } from '@gamepark/strange-world-above-the-clouds/rules/RuleId'
import { StrangeWorldAboveTheCloudsSetup } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsSetup'

export const me = PlayerColor.Gray
export const myStartingHand = [LandCard.LandGreen1, LandCard.LandBlue1, LandCard.Moon]
export const celine = PlayerColor.Yellow
export const celineStartingHand = [LandCard.LandGrayBlue1, LandCard.LandYellow1, LandCard.LandGray1]
export const florian = PlayerColor.Green
export const florianStartingHand = [LandCard.LandGreenGreen1, LandCard.LandBlueYellow1, LandCard.LandBlue1]

export const round2Cards = [
  LandCard.Moon, LandCard.Moon, LandCard.LandRedBlue1,
  LandCard.LandRedGrayGray1, LandCard.Moon, LandCard.LandGreenGreen1,
  LandCard.LandYellow1, LandCard.LandRedGrayGray1, LandCard.Moon,
]


export class TutorialSetup extends StrangeWorldAboveTheCloudsSetup {

  setupTurnOrder() {
    this.material(MaterialType.FirstPlayerCard).createItem({
      location: {
        type: LocationType.TurnOrder,
        player: celine
      }
    })
  }

  setupDeck() {
    super.setupDeck()
    this.material(MaterialType.LandCard)
      .createItems(round2Cards.map((id) => ({
        id,
        location: {
          type: LocationType.LandDeck
        }
      })))

  }

  get cardsForPlayers() {
    return TutoDeck
  }

  setupPlayer(player: PlayerColor) {
    super.setupPlayer(player)
    if (player === me) {
      this.material(MaterialType.LandCard)
        .createItems(myStartingHand.map((id) => ({
          id,
          location: {
            type: LocationType.Hand,
            player: me
          }
        })))
    }

    if (player === celine) {
      this.material(MaterialType.LandCard)
        .createItems(celineStartingHand.map((id) => ({
          id,
          location: {
            type: LocationType.Hand,
            player: celine
          }
        })))
    }

    if (player === florian) {
      this.material(MaterialType.LandCard)
        .createItems(florianStartingHand.map((id) => ({
          id,
          location: {
            type: LocationType.Hand,
            player: florian
          }
        })))
    }
  }

  start() {
    this.startSimultaneousRule(RuleId.Draft)
  }
}

const TutoDeck = {
  [LandCard.Moon]: 3, // 8 -> 5
  [LandCard.LandGreen1]: 1, // 2 -> 1
  [LandCard.LandYellow1]: 1, // 3 -> 2
  [LandCard.LandBlue1]: 1, // 3 -> 2
  [LandCard.LandGray1]: 1, // 2 -> 1
  [LandCard.Red1]: 0, // 0
  [LandCard.LandRedYellow1]: 1, // 1
  [LandCard.LandRedBlue1]: 0, // 1 -> 1
  [LandCard.LandRedGrayGray1]: 1, // 3 -> 2
  [LandCard.LandRedGreen1]: 3, // 3
  [LandCard.LandGrayGray1]: 2, // 2
  [LandCard.LandGrayGreen1]: 2, // 2
  [LandCard.LandGrayBlue1]: 1, // 2 -> 1
  [LandCard.LandGrayYellow1]: 2, // 2
  [LandCard.LandBlueYellow1]: 1, // 2 -> 1
  [LandCard.LandYellowGreen1]: 2, // 2
  [LandCard.LandGreenGreen1]: 1, // 3 -> 2
  [LandCard.LandGreenGreen2]: 2, // 2
  [LandCard.LandBlueGreen1]: 2, // 2
}
