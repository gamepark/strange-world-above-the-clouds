/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getRelativePlayerIndex, StyledPlayerPanel, useGame, useMaterialContext, usePlayers } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { ScoringHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/ScoringHelper'
import { createPortal } from 'react-dom'
import Star from '../images/icons/star.png'
import { playerPositions, Position } from '../locators/TableauLocator'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const game = useGame<MaterialGame>()!
  const root = document.getElementById('root')
  const context = useMaterialContext()
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
          const playerIndex = getRelativePlayerIndex(context, player.id)
          const position = playerPositions[context.rules.players.length - 2][playerIndex]

          return <StyledPlayerPanel key={player.id} player={player} color={playerColorCode[player.id]} css={[panelPosition, getPositionCss(position)]}
                                    mainCounter={{
                                      image: Star,
                                      value: new ScoringHelper(game, player.id).score
                                    }}/>
        }
      )}
    </>,
    root
  )
}
const panelPosition = css`
  position: absolute;
  width: 28em;
`

const getPositionCss = (position: Position) => {
  switch (position) {
    case Position.TopLeft:
      return topLeft
    case Position.TopRight:
      return topRight
    case Position.BottomRight:
      return bottomRight
    case Position.BottomLeft:
    default:
      return bottomLeft
  }
}

const topLeft = css`
  top: 8.5em;
  left: 1em;
`

const topRight = css`
  top: 8.5em;
  right: 1em;
`

const bottomRight = css`
  bottom: 1em;
  right: 1em;
`

const bottomLeft = css`
  bottom: 1em;
  left: 1em;
`


export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Gray]: 'gray',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Yellow]: 'yellow'
}