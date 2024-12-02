/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { LandType } from '@gamepark/strange-world-above-the-clouds/LandType'
import { LandCard } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
import { LandCardsCharacteristics } from '@gamepark/strange-world-above-the-clouds/material/LandCardCharacteristics'
import uniq from 'lodash/uniq'
import { FC, ReactElement } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import MoonMini from '../../images/icons/moon-mini.png'
import Moon from '../../images/icons/moon.png'
import MountainMini from '../../images/icons/mountain-mini.png'
import Mountain from '../../images/icons/mountain.png'
import Plant from '../../images/icons/plant.png'
import PlantMini from '../../images/icons/star.png'
import Star from '../../images/icons/star.png'
import SwampMini from '../../images/icons/swamp-mini.png'
import Swamp from '../../images/icons/swamp.png'
import Volcano from '../../images/icons/volcano.png'
import WaterMini from '../../images/icons/water-mini.png'
import Water from '../../images/icons/water.png'

export const LandCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const isFumarole = item.id === LandCard.Fumarole
  const characteristics = LandCardsCharacteristics[item.id as LandCard]
  const types = uniq(characteristics?.types ?? [])
  return (
    <>
      <h2>{t(isFumarole ? 'card.fumarole' : 'card.land')}</h2>
      {types.map((type, index) => (
        <>
          <LandTypeHelp key={type} type={type}/>
          {index < types.length - 1 && <hr css={separatorCss} />}
        </>
      ))}
      {characteristics.moon && <LandTypeHelp type="moon"/>}
    </>
  )
}

type LandTypeProps = {
  type: LandType | string
}

const LandTypeHelp: FC<LandTypeProps> = ({ type }) => {
  const icon = LandTypeIcon[type]
  if (!icon) return null
  return (
    <div css={scoringLine}>
      <div css={mainIcon}>
        <Picture src={icon}/>
      </div>
      <div>
        {LandTypeDescription[type]}
      </div>
    </div>
  )
}

const LandTypeIcon: Record<string | number, string> = {
  [LandType.Water]: Water,
  [LandType.Mountain]: Mountain,
  [LandType.Plant]: Plant,
  [LandType.Swamp]: Swamp,
  [LandType.Volcano]: Volcano,
  'moon': Moon
}

export const alignIcon = css`
  height: 1.5em;
  position: relative;
  border-radius: 0.2em;
  top: 0.4em;
  margin-top: -0.3em;
`

const IconsMini = {
  'mountain': <Picture css={alignIcon} src={MountainMini}/>,
  'water': <Picture css={alignIcon} src={WaterMini}/>,
  'plant': <Picture css={alignIcon} src={PlantMini}/>,
  'swamp': <Picture css={alignIcon} src={SwampMini}/>,
  'star': <Picture css={alignIcon} src={Star}/>,
  'moon': <Picture css={alignIcon} src={MoonMini}/>,
  'volcano': <Picture css={alignIcon} src={Volcano}/>
}

const LandTypeDescription: Record<string | number, ReactElement> = {
  [LandType.Water]: <Trans defaults="land.water" components={IconsMini}/>,
  [LandType.Mountain]: <Trans defaults="land.mountain" components={IconsMini}/>,
  [LandType.Plant]: <Trans defaults="land.plant" components={IconsMini}/>,
  [LandType.Swamp]: <Trans defaults="land.swamp" components={IconsMini}/>,
  [LandType.Volcano]: <Trans defaults="land.volcano" components={IconsMini}/>,
  'moon': <Trans defaults="land.moon" components={IconsMini}/>
}

const scoringLine = css`
  display: flex;
  flex-direction: row;
  margin-top: 0.7em;
  margin-bottom: 0.7em;
  white-space: break-spaces;
  line-height: 1.2em;
`

const mainIcon = css`
  > picture > * {
    width: 2em;
  }

  padding-right: 0.5em;
`

const separatorCss = css`
  width: 40%;
  align-self: center;
`