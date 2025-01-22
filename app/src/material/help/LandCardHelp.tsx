/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api/dist/material/MaterialRules'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { LandType } from '@gamepark/strange-world-above-the-clouds/LandType'
import { LandCard } from '@gamepark/strange-world-above-the-clouds/material/LandCard'
import { LandCardsCharacteristics } from '@gamepark/strange-world-above-the-clouds/material/LandCardCharacteristics'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
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
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const player = usePlayerId()
  const draft = useLegalMove((move) => isMoveItemType(MaterialType.LandCard)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.DraftArea) as MoveItem | undefined
  const target = usePlayerName(draft?.location.player)
  if (item.location?.type === LocationType.LandDeck) return <DeckCard {...props} />
  if (item.location?.type === LocationType.DraftArea && item.location.id !== player) return <DraftCard {...props} />
  if (item.location?.rotation && item.location.type === LocationType.Tableau) return <TzimimeCard {...props} />
  if (item.id === undefined) return <InvisibleCard {...props} />
  const isFumarole = item.id === LandCard.Fumarole
  const characteristics = LandCardsCharacteristics[item.id as LandCard]
  const types = uniq(characteristics?.types ?? [])
  return (
    <>
      <h2>{t(isFumarole ? 'card.fumarole' : 'card.land')}</h2>
      {!!draft && (
        <p>
        <PlayMoveButton move={draft} onPlay={closeDialog}>
          {t('button.give.to', { player: target})}
        </PlayMoveButton>
        </p>
      )}
      {isFumarole && (
        <p>
          <Trans defaults="land.fumarole" components={IconsMini}/>
        </p>
      )}
      {types.map((type, index) => (
        <>
          <LandTypeHelp key={type} type={type}/>
          {index < types.length - 1 && <hr css={separatorCss}/>}
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

const InvisibleCard: FC<MaterialHelpProps> = () => {
  return (
    <>
    </>
  )
}

const TzimimeCard: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('card.tzimime')}</h2>
      <p>
        <Trans defaults="card.tzimime.text" components={BaseComponents}/>
      </p>
    </>
  )
}

const DraftCard: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(props.item.location?.id)
  const target = usePlayerName(props.item.location?.player)
  const toMe = playerId !== undefined && playerId === props.item.location?.player


  return (
    <>
      <h2>{t('card.land')}</h2>
      <p>
        <Trans
          defaults={toMe ? 'card.draft-area.to-me' : 'card.draft-area'}
          components={BaseComponents}
          values={{
            player,
            target
          }}
        />
      </p>
    </>
  )
}

const DeckCard: FC<MaterialHelpProps> = () => {
  const rules = useRules<MaterialRules>()!
  const deckSize = rules.material(MaterialType.LandCard).location(LocationType.LandDeck).length
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('card.deck')}</h2>
      <p>
        <Trans
          defaults="card.deck.text"
          components={BaseComponents}
          values={{ cards: deckSize }}
        />
      </p>
    </>
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

export const IconsMini = {
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

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
  ...IconsMini
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
