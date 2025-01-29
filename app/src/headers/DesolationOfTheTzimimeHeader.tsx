/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture, PlayMoveButton, RulesDialog, ThemeButton, useLegalMove, usePlayerId, usePlayerName, useRules, useUndo } from '@gamepark/react-game'
import { isCustomMoveType, MaterialRules } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { CustomMoveType } from '@gamepark/strange-world-above-the-clouds/rules/CustomMoveType'
import { DesolationKind } from '@gamepark/strange-world-above-the-clouds/rules/DesolationOfTheTzimimeRule'
import { Memory } from '@gamepark/strange-world-above-the-clouds/rules/Memory'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import Swamp from '../images/icons/swamp.png'
import Water from '../images/icons/water.png'
import Moon from '../images/icons/moon.png'


export const DesolationOfTheTzimimeHeader = () => {
  const [open, setOpen] = useState(true)
  const [undo] = useUndo()
  const rules = useRules<MaterialRules>()!
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.ValidateDesolation))
  const player = usePlayerId()
  const desolationKind = rules.remind<DesolationKind>(Memory.DesolationKind)
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)
  if (player === undefined || activePlayer !== player) {
    return (
      <Trans defaults={getDesolationKey(desolationKind, player, activePlayer)} values={{ player: name }} components={{
        ...components,
        button: <u />
      }} />
    )
  }

  return (
    <>
      <Trans defaults={getDesolationKey(desolationKind, player, activePlayer)} components={{
        ...components,
        button: <ThemeButton onClick={() => setOpen(true)} />
      }} />
      <RulesDialog open={open} close={() => setOpen(false)}>
        <div css={rulesCss}>
          <h2>
            <Trans defaults="header.desolation"/>
          </h2>
          <p>
            {desolationKind === DesolationKind.Portal && <Trans defaults="warn.portal"/>}
            {desolationKind === DesolationKind.Moon && <Trans defaults="warn.moon" components={components}/>}
            {desolationKind === DesolationKind.Swamp && <Trans defaults="warn.swamp" components={components}/>}
            {desolationKind === DesolationKind.Water && <Trans defaults="warn.water" components={components}/>}
          </p>
          <p>
            <Trans defaults="warn.tzimime"/>
          </p>
          <p css={buttonContainerCss}>
            <PlayMoveButton move={pass} onPlay={() => setOpen(false)} auto={10} >
              <Trans defaults="warn.confirm" />
            </PlayMoveButton>
            <ThemeButton onClick={() => undo()} onPlay={() => setOpen(false)}>
              <Trans defaults="warn.undo" />
            </ThemeButton>
          </p>
        </div>
      </RulesDialog>
    </>
  )
}


export const getDesolationKey = (kind: DesolationKind, player: PlayerColor, activePlayer?: PlayerColor) => {
  const itsMe = player === activePlayer
  switch (kind) {
      case DesolationKind.Water:
        return itsMe? 'header.desolation.water': 'header.desolation.water.player';
      case DesolationKind.Swamp:
        return itsMe? 'header.desolation.swamp': 'header.desolation.swamp.player';
      case DesolationKind.Portal:
        return itsMe? 'header.desolation.portal': 'header.desolation.portal.player';
      case DesolationKind.Moon:
        return itsMe? 'header.desolation.moon': 'header.desolation.moon.player';
    }
}

const rulesCss = css`
  font-size: 3em;
  padding: 0 1em;
  overflow: auto;
  max-height: inherit;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`


export const iconCss = css`
  height: 1em;
  position: relative;
  border-radius: 0.2em;
  top: 0.1em;
`


export const components = {
  moon: <Picture css={iconCss} src={Moon}/>,
  swamp: <Picture css={iconCss} src={Swamp}/>,
  water: <Picture css={iconCss} src={Water}/>,
  u: <u />
}

const buttonContainerCss = css`
  display: flex;
  margin-top: 2em;
  gap: 1em;
`
