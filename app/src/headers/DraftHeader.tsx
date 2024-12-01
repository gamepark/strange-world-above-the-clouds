/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useGame, useLegalMove, usePlayerId } from '@gamepark/react-game'
import { isEndPlayerTurn, MaterialGame } from '@gamepark/rules-api'
import { DraftRule } from '@gamepark/strange-world-above-the-clouds/rules/DraftRule'

export const DraftHeader = () => {
  const move = useLegalMove((move) => isEndPlayerTurn(move))
  const game = useGame<MaterialGame>()!
  const player = usePlayerId();
  const rules = new DraftRule(game)
  const draftStep = rules.draftStep
  const cardToPlace = 3 - draftStep
  if (player === undefined) return null
  const placedCardCount = rules.getPlacedCards(player).length
  if (cardToPlace === placedCardCount && game.rule?.players?.includes(player)) {
    return (
      <PlayMoveButton move={move} auto={5}>
        Valider le draft
      </PlayMoveButton>
    )
  }
  return <>Hello world!</>
}
