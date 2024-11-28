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

    // TODO: Manage more than 2 player games by checking the first player card rotation
    const targetedPlayer = this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
    return hand.moveItems({
      type: LocationType.DraftArea,
      id: player,
      player: targetedPlayer
    })
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
      moves.push(this.startPlayerTurn(RuleId.PlayLandCard, this.game.players[0]))
    } else {
      this.memorize(Memory.DraftStep, (step: number = 1) => step + 1)
      moves.push(this.startSimultaneousRule(RuleId.Draft, this.game.players))
    }
    return moves
  }

}