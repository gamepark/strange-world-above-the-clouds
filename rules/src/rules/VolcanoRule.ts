import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { isSwamp, isWater } from '../LandType'
import { LandCard } from '../material/LandCard'
import { LandCardsCharacteristics } from '../material/LandCardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { RuleId } from './RuleId'

export class VolcanoRule extends BasePlayedCardRule {
  onRuleStart() {

    if (!this.canCoverCard) {
      return [
        this.playedCard.rotateItem(true),
        ...this.goToNextRule()
      ]
    }

    return []
  }

  getPlayerMoves() {
    const adjacentCards = this.adjacentCards.getItems()
    const fumaroles = this.fumaroles.deck()
    const moves: MaterialMove[] = []
    for (const item of adjacentCards) {
      moves.push(
        fumaroles.moveItem({
          ...item.location,
          z: (item.location.z ?? 0) + 1
        })
      )
    }

    return moves
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandCard)(move) || move.location.rotation) return []
    const cardOnPlace = this.panorama.location((l) => l.x === move.location.x && l.y === move.location.y)
    const moves: MaterialMove[] = cardOnPlace.deleteItems()

    if (this.isAlsoWater) {
      moves.push(this.startRule(RuleId.Water))
    } else if (this.isAlsoSwamp) {
      moves.push(this.startRule(RuleId.Swamp))
    } else {
      moves.push(...this.goToNextRule())
    }

    return moves
  }

  get fumaroles() {
    return this
      .material(MaterialType.LandCard)
      .location(LocationType.FumaroleStack)
  }

  get canCoverCard() {
    return this.adjacentCards.length > 0
  }

  get adjacentCards() {
    const playedCardItem = this.playedCard.getItem()!
    return this.panorama
      .filter((item) => getDistanceBetweenSquares(
        { x: item.location.x!, y: item.location.y! },
        { x: playedCardItem.location.x!, y: playedCardItem.location.y! }
      ) === 1 && this.isNotDisabled(item))
  }

  get isAlsoWater() {
    return isWater(this.playedCardCharacteristics.colors ?? [])
  }

  get isAlsoSwamp() {
    return isSwamp(this.playedCardCharacteristics.colors ?? [])
  }

  get playedCardCharacteristics() {
    const item = this.playedCard.getItem()!
    return LandCardsCharacteristics[item.id as LandCard]
  }
}