import { Locator } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { darkCityStackLocator } from './DarkCityStack'
import { draftAreaLocator } from './DraftAreaLocator'
import { fumaroleStackLocator } from './FumaroleStackLocator'
import { landDeckLocator } from './LandDeckLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { tableauLocator } from './TableauLocator'
import { travelerStackLocator } from './TravelerStackLocator'
import { playerTravelerLocator } from './PlayerTravelerLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.LandDeck]: landDeckLocator,
  [LocationType.Tableau]: tableauLocator,
  [LocationType.FumaroleStack]: fumaroleStackLocator,
  [LocationType.DarkCityStack]: darkCityStackLocator,
  [LocationType.Hand]: playerHandLocator,
  [LocationType.DraftArea]: draftAreaLocator,
  [LocationType.TravelerStack]: travelerStackLocator,
  [LocationType.PlayerTraveler]: playerTravelerLocator
}
