import { isMoveItemType, ItemMove, Location, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { TableauHelper } from './helpers/TableauHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayLandCardRule extends PlayerTurnRule {
  onRuleStart() {
    this.forget(Memory.PlayedLand)
    this.forget(Memory.DesolationKind)
    return []
  }

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
    this.memorize(Memory.PlayedLand, move.itemIndex)
    return [this.startRule(RuleId.DesolationOfTheTzimime)]
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
    if (travelerX < boundaries.xMin) return location.x! <= travelerX
    return location.x! >= travelerX
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