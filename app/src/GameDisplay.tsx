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
      verticalCenter
      {...sizes[players - 1]}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      css={process.env.NODE_ENV === 'development' && css`border: 5px solid white;`}>
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const sizes = [
  { xMin: -50, xMax: 50, yMin: -31, yMax: 31 },
  { xMin: -61, xMax: 61, yMin: -32, yMax: 32 },
  { xMin: -81 , xMax: 81, yMin: -41, yMax: 41 },
  { xMin: -96, xMax: 96, yMin: -51, yMax: 51 },
]
