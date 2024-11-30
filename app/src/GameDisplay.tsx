/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({ players }) => {
  return <>
    <GameTable
      {...sizes[players - 1]}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      css={process.env.NODE_ENV === 'development' && css`border: 5px solid white;`}>
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const sizes = [
  { xMin: -50, xMax: 50, yMin: -30, yMax: 30 },
  { xMin: -50, xMax: 50, yMin: -30, yMax: 30 },
  { xMin: -50, xMax: 50, yMin: -55, yMax: 7 },
  { xMin: -50, xMax: 50, yMin: -30, yMax: 30 },
]
