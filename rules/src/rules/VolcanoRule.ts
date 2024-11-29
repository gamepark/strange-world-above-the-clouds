import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LandCard } from '../material/LandCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayedCardRule } from './BasePlayedCardRule'
import { Memory } from './Memory'
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
    this.forget(Memory.PlayedLand, move.itemIndex)

    const goToDarkCityPlacement = this.goToDarkCityPlacement(move);
    if (goToDarkCityPlacement.length) {
      moves.push(...goToDarkCityPlacement)
      return moves
    }

    moves.push(...this.goToNextRule())
    return moves
  }

  goToDarkCityPlacement(move: MoveItem) {
    const adjacentCards = this.panorama
      .filter((item) => getDistanceBetweenSquares(
        { x: item.location.x!, y: item.location.y! },
        { x: move.location.x!, y: move.location.y! }
      ) === 1 && item.id === LandCard.Fumarole)

    if (adjacentCards.length >= 1) {
      this.memorize(Memory.PlayedFumarole, move.itemIndex)
      return [this.startRule(RuleId.PlaceDarkCity)]
    }

    return []
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
}