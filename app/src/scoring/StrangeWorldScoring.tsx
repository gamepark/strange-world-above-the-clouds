/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ScoringDescription } from '@gamepark/react-client'
import { Picture } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/strange-world-above-the-clouds/PlayerColor'
import { ScoringHelper } from '@gamepark/strange-world-above-the-clouds/rules/helpers/ScoringHelper'
import { StrangeWorldAboveTheCloudsRules } from '@gamepark/strange-world-above-the-clouds/StrangeWorldAboveTheCloudsRules'
import { Trans } from 'react-i18next'
import DarkCities from '../images/darkcity/DarkCityBack9.jpg'
import Portal from '../images/icons/portal.jpg'
import Moon from '../images/icons/moon.png'
import Mountain from '../images/icons/mountain.png'
import Plant from '../images/icons/plant.png'
import Swamp from '../images/icons/swamp.png'
import Water from '../images/icons/water.png'


enum ScoringKeys {
  Mountain = 1,
  Water,
  Swamp,
  Plant,
  Moon,
  DarkCities,
  Travelers,
  Total
}

export class StrangeWorldScoring implements ScoringDescription {
  getScoringKeys() {

    return [
      ScoringKeys.Mountain,
      ScoringKeys.Water,
      ScoringKeys.Swamp,
      ScoringKeys.Plant,
      ScoringKeys.Moon,
      ScoringKeys.DarkCities,
      ScoringKeys.Travelers,
      ScoringKeys.Total,
    ]
  }

  getScoringHeader(key: ScoringKeys) {
    const pictureProps = { css: miniCss } as any
    switch (key) {
      case ScoringKeys.Mountain:
        return (
          <div css={centeredCss}>
            <Picture picture={pictureProps} css={mini} src={Mountain}/>
          </div>
        )
      case ScoringKeys.Water:
        return (
          <div css={centeredCss}>
            <Picture picture={pictureProps} css={mini} src={Water}/>
          </div>
        )
      case ScoringKeys.Swamp:
        return (
          <div css={centeredCss}>
            <Picture picture={pictureProps} css={mini} src={Swamp}/>
          </div>
        )
      case ScoringKeys.Plant:
        return (
          <div css={centeredCss}>
            <Picture picture={pictureProps} css={mini} src={Plant}/>
          </div>
        )
      case ScoringKeys.Moon:
        return (
          <div css={centeredCss}>
            <Picture picture={pictureProps} css={mini} src={Moon}/>
          </div>
        )
      case ScoringKeys.DarkCities:
        return (
          <div css={[centeredCss]}>
            <Picture picture={pictureProps} css={[mini, roundedCss]} src={DarkCities}/>
          </div>
        )
      case ScoringKeys.Travelers:
        return (
          <div css={[centeredCss]}>
            <Picture picture={pictureProps} css={[mini, roundedCss]} src={Portal}/>
          </div>
        )
      case ScoringKeys.Total:
      default:
        return (
          <div css={[bold, totalCss, centeredCss]}>
            <Trans defaults="scoring.total"/>
          </div>
        )
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerColor, rules: StrangeWorldAboveTheCloudsRules) {
    const helper = new ScoringHelper(rules.game, player)
    switch (key) {
      case ScoringKeys.Mountain:
        return <div css={centeredCss}>{helper.mountainScoring}</div>
      case ScoringKeys.Water:
        return <div css={centeredCss}>{helper.waterScoring}</div>
      case ScoringKeys.Swamp:
        return <div css={centeredCss}>{helper.swampScoring}</div>
      case ScoringKeys.Plant:
        return <div css={centeredCss}>{helper.plantScoring}</div>
      case ScoringKeys.Moon:
        return <div css={centeredCss}>{helper.moonScoring}</div>
      case ScoringKeys.DarkCities:
        return <div css={centeredCss}>{helper.darkCityScoring}</div>
      case ScoringKeys.Travelers:
        return <div css={centeredCss}>{helper.travelerScore}</div>
      case ScoringKeys.Total:
      default:
        return <div css={centeredCss}>{helper.score}</div>
    }
  }
}

const bold = css`
  font-weight: bold;
`

const totalCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1em;
`

const centeredCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2em;
`

const mini = css`
  position: relative;
  height: 2em;
`

const roundedCss = css`
  border-radius: 0.1em;
  box-shadow: 0 0 0.1em black;
  border: 0.01em solid black;
`

const miniCss = css`
height: 2em;
`
