/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getRelativePlayerIndex, StyledPlayerPanel, useFocusContext, useMaterialContext, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { ScoringHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/ScoringHelper'
import { useCallback } from 'react'
import { createPortal } from 'react-dom'
import Star from '../images/icons/star.png'
import EarthPanel from '../images/panel/earth.jpg'
import MountainPanel from '../images/panel/mountain.jpg'


import SwampPanel from '../images/panel/swamp.jpg'
import WaterPanel from '../images/panel/water.jpg'
import { playerPositions, Position } from '../locators/TableauLocator'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<MaterialRules>()!
  const game = rules.game
  const root = document.getElementById('root')
  const context = useMaterialContext()
  const isEnded = game.rule === undefined
  const playerId = usePlayerId()
  const { setFocus } = useFocusContext()

  const onPlayerClick = useCallback((player) => {
    const itsMe = player === playerId
      setFocus({
        materials: itsMe? [
          rules.material(MaterialType.LandCard).player(player),
          rules.material(MaterialType.LandCard).location(LocationType.LandDeck),
          rules.material(MaterialType.LandCard).location(LocationType.FumaroleStack),
          rules.material(MaterialType.TravelerCard).location(LocationType.TravelerStack),
          rules.material(MaterialType.DarkCityCard).location(LocationType.DarkCityStack)
        ]: [
          rules.material(MaterialType.LandCard).player(player)
        ],
        staticItems: [],
        locations: [],
        animationTime: 500,
        margin: {
          top: 5,
          bottom: 5,
          left: 5
        }
      })
  }, [rules, playerId])

  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
          const playerIndex = getRelativePlayerIndex(context, player.id)
          const position = playerPositions[context.rules.players.length - 2][playerIndex]


          return <StyledPlayerPanel
            key={player.id}
            player={player}
            color={playerColorCode[player.id]}
            onClick={() => onPlayerClick(player.id)}
            css={[panelPosition, getPositionCss(position)]}
            backgroundImage={getPlayerBackground(player.id)}
            mainCounter={isEnded ? {
              image: Star,
              value: new ScoringHelper(game, player.id).score
            } : undefined}
          />
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

const getPlayerBackground = (player: PlayerColor) => {
  switch (player) {
    case PlayerColor.Blue:
      return WaterPanel
    case PlayerColor.Gray:
      return MountainPanel
    case PlayerColor.Green:
      return EarthPanel
    case PlayerColor.Yellow:
      return SwampPanel

  }
}

const getPositionCss = (position: Position) => {
  switch (position) {
    case Position.TopLeft:
      return topLeft
    case Position.TopRight:
      return topRight
    case Position.BottomRight:
      return bottomRight
    case Position.BottomLeft:
      return bottomLeft
    case Position.TopCenter:
      return topCenter
  }
}

const topCenter = css`
  top: 8.5em;
  left: 40em;
`

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
