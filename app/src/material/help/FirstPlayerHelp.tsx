import { MaterialHelpProps } from '@gamepark/react-game/dist/components/material/MaterialDescription'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const FirstPlayerHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props;
  const { t } = useTranslation()
  const player = usePlayerName(item.location?.player)
  return (
    <>
      <h2>
        {t('card.first-player')}
      </h2>
      <p>
        <Trans defaults="card.first-player.text" values={{ player }} />
      </p>
      { !item.location?.rotation && (
        <p>
          <Trans defaults="card.first-player.clockwise"/>
        </p>
      )}
      { !!item.location?.rotation && (
        <p>
          <Trans defaults="card.first-player.counterclockwise"/>
        </p>
      )}
    </>
  )
}