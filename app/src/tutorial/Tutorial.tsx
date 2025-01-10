import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { LocationType } from '@gamepark/strange-world-above-the-clouds/material/LocationType'
import { MaterialType } from '@gamepark/strange-world-above-the-clouds/material/MaterialType'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { Trans } from 'react-i18next'
import { me, opponentLeft, opponentRight, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>
}

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 4

  options = {
    players: [
      { id: me },
      { id: opponentLeft },
      { id: opponentRight }
    ]
  }

  players = [
    { id: me },
    { id: opponentLeft },
    { id: opponentRight }
  ]
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.panorama" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.starting" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.green" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.one" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r1.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.received.r1.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r1.1" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.received.r1.1" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.sun" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.place" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.mountain.score" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.mountain.score.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.water.score" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.water.warning" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.animal.score" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.last" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.swamp.score" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.portal" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler.choose" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler.placement" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.traveler.world" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.play.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r2.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draft.r2.1" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.moon.score" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.moon.score.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.moon.warning" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.volcano" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.play" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.cover" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.warning" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.play.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fumarole.dark-city" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.dark-city.score" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.end.trigger" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reminder" components={BaseComponents}/>
      }
    }
  ]
}