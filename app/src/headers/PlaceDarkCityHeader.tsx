import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlaceDarkCityHeader = () => {
  const rules = useRules<MaterialRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)
  const itsMe = activePlayer === player
  if (itsMe) {
    return (
      <Trans i18nKey="header.dark-city"/>
    )
  }
  return (
    <Trans i18nKey="header.dark-city.player" values={{ player: name }}/>
  )

}
