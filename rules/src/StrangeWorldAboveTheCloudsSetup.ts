import { MaterialGameSetup } from '@gamepark/rules-api'
import times from 'lodash/times'
import { LandCard } from './material/LandCard'
import { getLandscapeCards } from './material/LandCardPerPlayer'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { StrangeWorldAboveTheCloudsOptions } from './StrangeWorldAboveTheCloudsOptions'
import { StrangeWorldAboveTheCloudsRules } from './StrangeWorldAboveTheCloudsRules'

/**
 * This class creates a new Game based on the game options
 */
export class StrangeWorldAboveTheCloudsSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, StrangeWorldAboveTheCloudsOptions> {
  Rules = StrangeWorldAboveTheCloudsRules

  setupMaterial(_options: StrangeWorldAboveTheCloudsOptions) {
    this.setupPlayers()
    this.setupDeck()
  }

  setupDeck() {
    const cardRecord = Object.entries(getLandscapeCards(this.players.length))
    for (const [card, count] of cardRecord) {
      this.material(MaterialType.LandCard)
        .createItems(
          times(count, () => ({
            id: +card,
            location: {
              type: LocationType.LandDeck,
            }
          }))
        )
    }
  }

  setupPlayers() {
    for (const player of this.players) {
      this.material(MaterialType.LandCard)
        .createItem({
          id: getStartingCard(player),
          location: {
            type: LocationType.Landscape,
            player: player,
            x: 0,
            y: 0
          }
        })
    }
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}

const getStartingCard = (color: PlayerColor) => {
  switch (color) {
    case PlayerColor.Blue:
      return LandCard.StartingBlue;
    case PlayerColor.Gray:
      return LandCard.StartingGray;
    case PlayerColor.Green:
      return LandCard.StartingGreen;
    case PlayerColor.Yellow:
      return LandCard.StartingYellow;
  }
}