/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture, PlayMoveButton, RulesDialog, ThemeButton, useLegalMove, usePlayerId, useRules, useUndo } from '@gamepark/react-game'
import { isCustomMoveType, MaterialRules } from '@gamepark/rules-api'
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
  const desolationKind = rules.remind<DesolationKind>(Memory.DesolationKind)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.ValidateDesolation))
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  if (player === undefined || activePlayer !== player) return null
  return (
    <>
      <ThemeButton onClick={() => setOpen(true)}>
        <Trans defaults="header.desolation"/>
      </ThemeButton>
      <RulesDialog open={open} close={() => setOpen(false)}>
        <div css={rulesCss}>
          <h2>
            <Trans defaults="header.desolation"/>
          </h2>
          <p>
            {desolationKind === DesolationKind.Portal && <Trans defaults="warn.portal"/>}
            {desolationKind === DesolationKind.Moon && <Trans defaults="warn.moon" components={{ moon: <Picture css={iconCss} src={Moon}/> }}/>}
            {desolationKind === DesolationKind.Swamp && <Trans defaults="warn.swamp" components={{ swamp: <Picture css={iconCss} src={Swamp}/> }}/>}
            {desolationKind === DesolationKind.Water && <Trans defaults="warn.water" components={{ water: <Picture css={iconCss} src={Water}/> }}/>}
          </p>
          <p>
            <Trans defaults="warn.tzimime"/>
          </p>
          <p css={buttonContainerCss}>
            <PlayMoveButton move={pass} onPlay={() => setOpen(false)}>
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
  height: 1.5em;
  position: relative;
  border-radius: 0.2em;
  top: 0.4em;
  margin-top: 0;
`

const buttonContainerCss = css`
  display: flex;
  margin-top: 2em;
  gap: 1em;
`
