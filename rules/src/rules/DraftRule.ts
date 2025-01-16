import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DraftRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: PlayerColor) {
    const hand = this.getHand(player)
    const cardToPlace = 3 - this.draftStep
    if (cardToPlace === this.getPlacedCards(player).length) {
      return [this.endPlayerTurn(player)]
    }

    const targetedPlayer = this.getNextPlayer(player)
    return hand.moveItems({
      type: LocationType.DraftArea,
      id: player,
      player: targetedPlayer
    })
  }

  getNextPlayer(player: PlayerColor) {
    if (this.turnOrderCard?.rotation) {
      const previousIndex = this.game.players.indexOf(player) - 1
      if (previousIndex < 0) return this.game.players[this.game.players.length - 1]
      return this.game.players[previousIndex]
    }

    return this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
  }

  get turnOrderCard() {
    return this.material(MaterialType.FirstPlayerCard)
      .getItem()?.location
  }

  get draftStep() {
    return this.remind(Memory.DraftStep) ?? 1
  }

  getHand(player: PlayerColor) {
    return this.material(MaterialType.LandCard)
      .location(LocationType.Hand)
      .player(player)
  }

  getPlacedCards(player: PlayerColor) {
    return this.material(MaterialType.LandCard)
      .location(LocationType.DraftArea)
      .locationId(player)
  }

  getCardsToTakeInHand(player: PlayerColor) {
    return this.material(MaterialType.LandCard)
      .location(LocationType.DraftArea)
      .player(player)
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      moves.push(
        ...this.getCardsToTakeInHand(player)
          .moveItems({
            type: LocationType.Hand,
            player: player
          })
      )
    }


    if (this.draftStep === 2) {
      this.forget(Memory.DraftStep)
      // TODO: First player has the first player card
      if (this.game.players.length > 2) {
        const firstPlayer = this.turnOrderCard?.player!
        moves.push(this.startPlayerTurn(RuleId.PlayLandCard, firstPlayer))
      } else {
        moves.push(this.startPlayerTurn(RuleId.PlayLandCard, this.game.players[0]))
      }

    } else {
      this.memorize(Memory.DraftStep, (step: number = 1) => step + 1)
      moves.push(this.startSimultaneousRule(RuleId.Draft, this.game.players))
    }
    return moves
  }

}
