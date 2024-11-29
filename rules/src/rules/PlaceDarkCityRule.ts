import { isMoveItemType, ItemMove, Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { Memory } from './Memory'
import { getAdjacentFumarole } from './utils/volcano.utils'

export class PlaceDarkCityRule extends BasePlayedCardRule {
  getPlayerMoves() {
    const darkCities = this.darkCities
    const fumaroleItem = this.placedFumarole.getItem()!
    const adjacentFumaroleItems = this.adjacentFumarole.getItems()

    const moves: MaterialMove[] = []
    for (const item of adjacentFumaroleItems) {
      const leftX = item.location.x! < fumaroleItem.location.x!? item.location.x!: fumaroleItem.location.x!
      const rightX = item.location.x! < fumaroleItem.location.x!? fumaroleItem.location.x!: item.location.x!
      const topY = item.location.y! < fumaroleItem.location.y!? item.location.y!: fumaroleItem.location.y!
      const bottomY = item.location.y! < fumaroleItem.location.y!? fumaroleItem.location.y!: item.location.y!
       moves.push(
         darkCities.moveItem({
           type: LocationType.Tableau,
           player: this.player,
           x: leftX + ((rightX - leftX) / 2),
           y: topY + ((bottomY - topY) / 2),
         })
       )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.DarkCityCard)(move)) return []
    return this.goToNextRule()
  }

  get adjacentFumarole() {
    return getAdjacentFumarole(this.panorama, this.playerDarkCities, this.placedFumarole.getItem()!.location)
  }

  hasDarkCitiesOnIt(location: Location) {
    return this.playerDarkCities
      .getItems()
      .some((item) =>
        Math.abs(location.x! - (item.location.x!)) === 0.5 ||
        Math.abs(location.y! - (item.location.y!)) === 0.5)
  }

  get placedFumarole() {
    return this
      .material(MaterialType.LandCard)
      .index(this.remind(Memory.PlayedFumarole))
  }

  get darkCities() {
    return this
      .material(MaterialType.DarkCityCard)
      .location(LocationType.DarkCityStack)
      .sort((item) => -item.location.x!)
  }

  get playerDarkCities() {
    return this
      .material(MaterialType.DarkCityCard)
      .location(LocationType.Tableau)
      .player(this.player)
  }
}