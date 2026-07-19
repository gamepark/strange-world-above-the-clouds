import { useGame, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { ChangeFirstPlayerRule } from '@gamepark/strange-world-above-the-clouds/rules/ChangeFirstPlayerRule'
import { Trans } from 'react-i18next'

export const ChangeFirstPlayerHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new ChangeFirstPlayerRule(game);
  const newPlayer = rule.nextPlayer
  const name = usePlayerName(newPlayer)
  return (
    <Trans i18nKey="header.change-player" values={{ player: name }} />
  )

}
