/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useGame, useLegalMove, usePlayerId } from '@gamepark/react-game'
import { isEndPlayerTurn, MaterialGame } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { DraftRule } from '@gamepark/strange-world-above-the-clouds/rules/DraftRule'
import { Trans } from 'react-i18next'

export const DraftHeader = () => {
  const move = useLegalMove((move) => isEndPlayerTurn(move))
  const game = useGame<MaterialGame>()!
  const player = usePlayerId();
  const rules = new DraftRule(game)
  const draftStep = rules.draftStep
  const cardToPlace = 3 - draftStep

  if (player !== undefined && cardToPlace === rules.getPlacedCards(player).length && game.rule?.players?.includes(player)) {
    return (
      <PlayMoveButton move={move} auto={5}>
        <Trans defaults="header.draft.confirm" />
      </PlayMoveButton>
    )
  }

  if (rules.game.players.length === 2) {
    return (
      <Trans defaults="header.draft" values={{ cards: cardToPlace }} />
    )
  }

  const turnOrderCard = rules.material(MaterialType.FirstPlayerCard).getItem()!.location.rotation

  if (!turnOrderCard) {
    return (
      <Trans defaults="header.draft.left" values={{ cards: cardToPlace }} />
    )
  }

  return (
    <Trans defaults="header.draft.right" values={{ cards: cardToPlace }} />
  )

}
