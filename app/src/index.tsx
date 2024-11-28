/** @jsxImportSource @emotion/react */
import { StrangeWorldAboveTheCloudsOptionsSpec } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsOptions'
import { StrangeWorldAboveTheCloudsRules } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsRules'
import { StrangeWorldAboveTheCloudsSetup } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="strange-world-above-the-clouds"
      Rules={StrangeWorldAboveTheCloudsRules}
      optionsSpec={StrangeWorldAboveTheCloudsOptionsSpec}
      GameSetup={StrangeWorldAboveTheCloudsSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
