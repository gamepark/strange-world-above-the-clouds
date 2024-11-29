import { isMoveItemType, ItemMove, Material, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'

export class WelcomingTravelerRule extends BasePlayedCardRule {
  onRuleStart() {
    if (!this.travelerCount) {
      return this.goToNextRule()
    }

    return []
  }

  getPlayerMoves() {
    const boundaries = new TableauHelper(this.game, this.player).boundaries
    const travelers = this.travelers
    const playerTravelers = this.playerTravelers
    const playedCard = this.playedCard.getItem()!
    const moves: MaterialMove[] = []
    if (!playerTravelers.length) {
      moves.push(
        ...this.moveTravelerToTableau(playedCard, boundaries.xMin - 1, travelers, 0),
        ...this.moveTravelerToTableau(playedCard, boundaries.xMax + 1, travelers, 0),
        ...this.moveTravelerToTableau(playedCard, boundaries.xMin - 1, travelers, -1),
        ...this.moveTravelerToTableau(playedCard, boundaries.xMax + 1, travelers, -1)
      )
    } else {
      const firstTraveler = playerTravelers.getItem()!
      const top = this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, 0)
      const bottom = this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, -1)
      if (!top.length && !bottom.length) {
        moves.push(
          ...this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, 0, true),
          ...this.moveTravelerToTableau(playedCard, firstTraveler.location.x!, travelers, -1, true),
        )
      } else {
        moves.push(
          ...top,
          ...bottom,
        )
      }
    }

    return moves
  }

  moveTravelerToTableau(playedCard: MaterialItem, x: number, travelers: Material, deltaY: number, allowOverlap?: boolean) {
    const travelersInSamePosition = this.playerTravelers.location((l) => l.x === x && l.y === playedCard.location.y! + deltaY).length
    if (travelersInSamePosition && !allowOverlap) return []
    return travelers.moveItems({
      type: LocationType.PlayerTraveler,
      player: this.player,
      x: x,
      y: playedCard.location.y! + deltaY,
      z: travelersInSamePosition
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.TravelerCard)(move)) return []
    this.decreaseTravelerCount()
    if (this.travelerCount === 0) return this.goToNextRule()
    return []
  }

  get travelers() {
    return this
      .material(MaterialType.TravelerCard)
      .location(LocationType.TravelerStack)
  }

  decreaseTravelerCount() {
    return this.memorize(Memory.TravelerToWelcome, (count: number) => count - 1)
  }

  get travelerCount() {
    return this.remind(Memory.TravelerToWelcome) ?? 0
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
      .filter((item) => this.isNotDisabled(item))
  }

  get playerTravelers() {
    return this
      .material(MaterialType.TravelerCard)
      .location(LocationType.PlayerTraveler)
      .player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.TravelerToWelcome)
    return []
  }

}