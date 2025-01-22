import { MaterialHelpProps } from '@gamepark/react-game/dist/components/material/MaterialDescription'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { IconsMini } from './LandCardHelp'

export const DarkCitiesHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  return (
    <>
      <h2>
        <Trans defaults="dark-city" />
      </h2>
      <p>
        <Trans defaults="dark-city.text" components={BaseComponents} values={{ star: item.id}} />
      </p>
    </>
  )
}

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
  ...IconsMini
}