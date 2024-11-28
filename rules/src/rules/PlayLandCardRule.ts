import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isSwamp, isVolcano, isWater } from '../LandType'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayLandCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const helper = new TableauHelper(this.game, this.player)
    return helper.availableSpaces
      .filter((location) => !this.isBlockedByTraveler(location))
      .flatMap((location) => {
        return this.hand.moveItems(location)
      })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandCard)(move) || move.location.rotation !== undefined) return []
    const card = this.material(move.itemType).index(move.itemIndex)
    this.memorize(Memory.PlayedLand, move.itemIndex)
    const item = card.getItem()!
    const moves: MaterialMove[] = []
    const characteristics = LandCardsCharacteristics[item.id as LandCard]
    const colors = characteristics?.colors ?? []
    if (isVolcano(colors)) return [this.startRule(RuleId.Volcano)]
    if (isWater(colors)) return [this.startRule(RuleId.Water)]
    if (isSwamp(colors)) return [this.startRule(RuleId.Swamp)]
    if (characteristics.moon) return [this.startRule(RuleId.Moon)]
    if (characteristics?.portal) return [this.startRule(RuleId.WelcomingTraveler)]
    if (this.allCardsPlaces) {
      moves.push(this.startRule(RuleId.Deal))
    } else {
      moves.push(this.startPlayerTurn(RuleId.PlayLandCard, this.nextPlayer))
    }

    return moves
  }

  get panorama() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Tableau)
      .player(this.player)
  }

  get allCardsPlaces() {
    return this.game
      .players
      .every((p) => this.getHand(p).length === 0)
  }

  getHand(player: PlayerColor) {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.Hand)
      .player(player)
  }

  isBlockedByTraveler(location: Location) {
    const travelerX = this.travelerX
    if (travelerX === undefined) return false
    const boundaries = new TableauHelper(this.game, this.player).boundaries
    if (travelerX < boundaries.xMin) return location.x! < travelerX
    return location.x! > travelerX
  }

  get travelerX() {
    const travelers = this.material(MaterialType.TravelerCard)
      .location(LocationType.PlayerTraveler)
      .player(this.player)

    if (!travelers.length) return undefined
    return travelers.getItem()!.location.x
  }

  get hand() {
    return this.getHand(this.player)
  }
}