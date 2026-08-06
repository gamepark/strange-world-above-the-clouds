import { StrangeWorldAboveTheCloudsOptionsSpecV2 } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsOptions'
import { StrangeWorldAboveTheCloudsRules } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsRules'
import { StrangeWorldAboveTheCloudsSetup } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { StrangeWorldScoring } from './scoring/StrangeWorldScoring'
import { strangeWorldTheme } from './theme'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="strange-world-above-the-clouds"
      Rules={StrangeWorldAboveTheCloudsRules}
      optionsSpec={StrangeWorldAboveTheCloudsOptionsSpecV2}
      GameSetup={StrangeWorldAboveTheCloudsSetup}
      material={Material}
      locators={Locators}
      tutorial={new Tutorial()}
      scoring={new StrangeWorldScoring()}
      animations={gameAnimations}
      theme={strangeWorldTheme}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
