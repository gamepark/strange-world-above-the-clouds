import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const WelcomingTravelerHeader = () => {
  const rules = useRules<MaterialRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)
  const itsMe = player && activePlayer === player
  if (itsMe) {
    return (
      <Trans i18nKey="header.traveler"/>
    )
  }
  return (
    <Trans i18nKey="header.traveler.player" values={{ player: name }}/>
  )

}
