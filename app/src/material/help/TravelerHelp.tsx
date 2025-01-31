import { MaterialHelpProps } from '@gamepark/react-game/dist/components/material/MaterialDescription'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IconsMini } from './LandCardHelp'

export const TravelerHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props;
  const { t } = useTranslation()
  return (
    <>
      <h2>
        {t(`traveler.${item.id}`)}
      </h2>
      <p>
        <Trans defaults="traveler.base" components={BaseComponents} />
      </p>
      <p>
        <Trans defaults={`traveler.${item.id}.text`} components={BaseComponents} />
      </p>
    </>
  )
}

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
  ...IconsMini
}