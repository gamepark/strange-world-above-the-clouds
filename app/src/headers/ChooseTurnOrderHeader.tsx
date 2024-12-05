/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialComponent, PlayMoveButton, RulesDialog, ThemeButton, useLegalMove, usePlayerId } from '@gamepark/react-game'
import { isCreateItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const ChooseTurnOrderHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)
  const turnLeft = useLegalMove((move) => isCreateItemType(MaterialType.FirstPlayerCard)(move) && !move.item.location.rotation)
  const turnRight = useLegalMove((move) => isCreateItemType(MaterialType.FirstPlayerCard)(move) && !!move.item.location.rotation)
  const player = usePlayerId()
  if (player === undefined) return null
  return (
    <>
    <ThemeButton onClick={() => setOpen(true)}>
      <Trans defaults="header.choose.turn"/>
    </ThemeButton>
      <RulesDialog open={open} close={() => setOpen(false)}>
        <div css={rulesCss}>
          <h2><Trans defaults="header.choose.turn"><span/></Trans></h2>
          <div css={choiceContainerCss}>
            <div>
              <MaterialComponent type={MaterialType.FirstPlayerCard}/>
              <PlayMoveButton move={turnLeft} onPlay={() => setOpen(false)}>
                {t('header.choose.left')}
              </PlayMoveButton>
            </div>
            <div>
              <MaterialComponent type={MaterialType.FirstPlayerCard} css={css`transform: rotateY(180deg)`}/>
              <PlayMoveButton move={turnRight} onPlay={() => setOpen(false)}>
                {t('header.choose.right')}
              </PlayMoveButton>
            </div>
          </div>
        </div>
      </RulesDialog>
    </>
  )
}

const choiceContainerCss = css`
  display: flex;
  flex-direction: row;
  gap: 1em;
  margin-bottom: 1em;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    > button {
      margin-top: 1em;
    }
  }
`

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
