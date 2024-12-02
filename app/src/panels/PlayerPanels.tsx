/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { StyledPlayerPanel, useGame, usePlayers } from '@gamepark/react-game'
import { ScoringHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/ScoringHelper'
import { createPortal } from 'react-dom'
import { MaterialGame } from '@gamepark/rules-api'
import Star from '../images/icons/star.png'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const game = useGame<MaterialGame>()!
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <StyledPlayerPanel key={player.id} player={player} color={playerColorCode[player.id]} css={panelPosition(index)} mainCounter={{
          image: Star,
          value: new ScoringHelper(game, player.id).score
        }}/>
      )}
    </>,
    root
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Gray]: 'gray',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Yellow]: 'yellow'
}