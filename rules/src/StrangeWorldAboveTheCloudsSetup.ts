import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import times from 'lodash/times'
import { DarkCity } from './material/DarkCity'
import { LandCard } from './material/LandCard'
import { getLandscapeCards } from './material/LandCardPerPlayer'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Traveler } from './material/Traveler'
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
    this.setupDeck()
    this.setupDarkCities()
    this.setupFumaroles()
    this.setupTravelers()
    this.setupPlayers()
  }

  setupDeck() {
    const cardRecord = Object.entries(getLandscapeCards(this.players.length))
    for (const [card, count] of cardRecord) {
      this.material(MaterialType.LandCard)
        .createItems(
          times(count, () => ({
            id: +card,
            location: {
              type: LocationType.LandDeck
            }
          }))
        )
    }

    this.material(MaterialType.LandCard).location(LocationType.LandDeck).shuffle()
  }

  setupPlayers() {
    for (const player of this.players) {
      this.setupPlayer(player)
    }
  }

  setupPlayer(player: PlayerColor) {
    this.material(MaterialType.LandCard)
      .createItem({
        id: getStartingCard(player),
        location: {
          type: LocationType.Tableau,
          player: player,
          x: 0,
          y: 0
        }
      })
  }

  setupTravelers() {
    const items = getEnumValues(Traveler).map((t) => ({
      id: t,
      location: {
        type: LocationType.TravelerStack
      }
    }))

    this.material(MaterialType.TravelerCard).createItems(items)
  }

  setupDarkCities() {
    this.material(MaterialType.DarkCityCard).createItem({ id: DarkCity.DarkCity4, location: { type: LocationType.DarkCityStack } })
    this.material(MaterialType.DarkCityCard).createItem({ id: DarkCity.DarkCity4, location: { type: LocationType.DarkCityStack } })
    this.material(MaterialType.DarkCityCard).createItem({ id: DarkCity.DarkCity5, location: { type: LocationType.DarkCityStack } })
    this.material(MaterialType.DarkCityCard).createItem({ id: DarkCity.DarkCity7, location: { type: LocationType.DarkCityStack } })
    this.material(MaterialType.DarkCityCard).createItem({ id: DarkCity.DarkCity9, location: { type: LocationType.DarkCityStack } })
  }

  setupFumaroles() {
    this.material(MaterialType.LandCard)
      .location(LocationType.FumaroleStack)
      .createItems(
        times(11, () => ({
          id: LandCard.Fumarole,
          location: {
            type: LocationType.FumaroleStack
          }
        }))
      )
  }

  start() {
    this.startRule(RuleId.Deal)
  }
}

const getStartingCard = (color: PlayerColor) => {
  switch (color) {
    case PlayerColor.Blue:
      return LandCard.StartingBlue
    case PlayerColor.Gray:
      return LandCard.StartingGray
    case PlayerColor.Green:
      return LandCard.StartingGreen
    case PlayerColor.Yellow:
      return LandCard.StartingYellow
  }
}