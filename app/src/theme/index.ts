import { css } from '@emotion/react'
import { BottomBarNavigation, GameTheme } from '@gamepark/react-game'
import { cream, creamDeep, gold, goldDark, goldLight, ink, inkSoft, volcano } from './colors'
import { InkCloseButton } from './InkCloseButton'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

const headings = "'Fredoka', 'Nunito', sans-serif"

/**
 * Cartoon "sticker" button: cream fill, thick ink outline and a hard drop
 * shadow, like the cut-out illustrations of the cards.
 */
const inkButtonCss = css`
  font-family: ${headings};
  font-weight: 600;
  color: ${ink};
  background: linear-gradient(180deg, ${cream} 0%, ${creamDeep} 100%);
  border: 0.09em solid ${ink};
  border-radius: 0.6em;
  padding: 0.25em 0.8em;
  box-shadow: 0 0.12em 0 ${ink};
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;

  &:hover:not(:disabled), &:focus-visible:not(:disabled) {
    background: linear-gradient(180deg, ${goldLight} 0%, ${gold} 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(0.12em);
    box-shadow: 0 0 0 ${ink};
    background: linear-gradient(180deg, ${gold} 0%, ${goldDark} 100%);
  }

  &:disabled {
    color: ${inkSoft};
    background: #DCD3C2;
    border-color: ${inkSoft};
    box-shadow: 0 0.12em 0 ${inkSoft};
    cursor: default;

    img, picture {
      filter: grayscale(1) opacity(0.5);
    }
  }
`

export const strangeWorldTheme: DeepPartial<GameTheme> = {
  root: {
    fontFamily: 'Nunito',
    background: {
      image: '/cover-1920.jpg',
      overlay: 'rgba(28, 22, 14, 0.78)'
    }
  },
  palette: {
    primary: gold,
    primaryHover: goldLight,
    primaryActive: goldDark,
    primaryLight: 'rgba(217, 150, 42, 0.10)',
    primaryLighter: 'rgba(217, 150, 42, 0.05)',
    surface: cream,
    onSurface: ink,
    onSurfaceFocus: 'rgba(217, 150, 42, 0.16)',
    onSurfaceActive: 'rgba(217, 150, 42, 0.28)',
    danger: volcano,
    dangerHover: '#FBE3DF',
    dangerActive: '#F6C9C2',
    disabled: '#A2947C'
  },
  dialog: {
    backgroundColor: cream,
    color: ink,
    container: css`
      border-radius: 1em;
      background:
        radial-gradient(ellipse at 50% 0%, rgba(240, 195, 60, 0.28), transparent 60%),
        linear-gradient(170deg, ${cream} 0%, #F8EBCE 45%, ${creamDeep} 100%);
      border: 0.06em solid ${ink};
      box-shadow:
        0 0 0 0.12em ${cream},
        0 0 0 0.18em ${ink},
        0 0.6em 2em rgba(28, 22, 14, 0.55);
      overflow: visible;
    `,
    content: css`
      color: ${ink};

      h2, h3 {
        font-family: ${headings};
        font-weight: 600;
        color: ${goldDark};
      }
    `,
    buttons: inkButtonCss,
    closeButton: InkCloseButton,
    navigation: BottomBarNavigation
  },
  buttons: inkButtonCss,
  dropArea: {
    backgroundColor: 'rgba(217, 150, 42, 0.35)'
  },
  header: {
    bar: css`
      background: linear-gradient(180deg, ${goldLight} 0%, ${gold} 55%, ${goldDark} 100%);
      color: ${ink};
      font-family: ${headings};
      border-bottom: 0.04em solid ${ink};
      box-shadow: 0 0.15em 0.6em rgba(28, 22, 14, 0.45);

      // The framework clips the bar and the title (overflow: hidden) and adds
      // 0.2em margins on the h1, which together push the content past the 7em
      // bar and shave the hard shadow off the bottom of the buttons.
      // Center the title instead of relying on its margins, and let the shadow
      // escape the box.
      overflow: visible;
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        overflow: visible;
        margin: 0;
      }
    `,
    // The header bar is 7em tall and buttons sit inside an h1 at font-size 4.5em:
    // keep the total height (line-height + border + hard shadow) under the 1.2em
    // line box of the title so the button never grows the bar.
    buttons: css`
      ${inkButtonCss};
      font-size: 0.75em;
      line-height: 1.2;
      padding: 0 0.6em;
      border-width: 0.06em;
      vertical-align: middle;
      box-shadow: 0 0.08em 0 ${ink};

      &:active:not(:disabled) {
        transform: translateY(0.08em);
      }

      &:disabled {
        box-shadow: 0 0.08em 0 ${inkSoft};
      }
    `
  },
  menu: {
    mainButton: css`
      background: linear-gradient(180deg, ${goldLight} 0%, ${gold} 100%) !important;
      color: ${ink};
      border: 0.06em solid ${ink};
      box-shadow: 0 0.15em 0.5em rgba(28, 22, 14, 0.5);
    `,
    popButton: css`
      color: ${ink};
      background: ${cream};

      &:focus, &:hover {
        background: ${gold};
        color: ${ink};
      }

      &:active {
        background: ${goldDark};
        color: ${cream};
      }
    `,
    panel: css`
      background: linear-gradient(170deg, ${cream} 0%, ${creamDeep} 100%);
      color: ${ink};
      box-shadow: 0 0.2em 0.8em rgba(28, 22, 14, 0.35), inset 0 0.05em 0 rgba(255, 255, 255, 0.6);
    `
  },
  journal: {
    tab: css`
      font-family: ${headings};
    `,
    tabSelected: css`
      color: ${ink};
    `,
    historyEntry: css`
      border-radius: 0.5em;
      border-left: 0.25em solid ${gold};
      background: rgba(217, 150, 42, 0.10);
      color: ${ink};
    `,
    chatBar: css`
      background: linear-gradient(180deg, ${goldLight} 0%, ${gold} 100%);
    `
  },
  result: {
    border: gold,
    icon: goldDark,
    container: css`
      border-radius: 1em;
    `
  },
  tutorial: {
    container: css`
      border-radius: 1em;
      box-shadow:
        0 0 0 0.12em ${cream},
        0 0 0 0.18em ${ink},
        0 0.5em 1.6em rgba(28, 22, 14, 0.5);
    `
  },
  playerPanel: {
    activeRingColors: [goldLight, gold]
  },
  timeStats: {
    thinkBackground: 'rgba(217, 150, 42, 0.14)',
    waitBackground: 'rgba(201, 164, 106, 0.16)'
  }
}

export * from './colors'
