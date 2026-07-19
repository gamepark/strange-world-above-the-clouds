/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { cream, gold, goldDark, goldLight, ink } from './colors'

/**
 * Round "sticker" button with the thick ink outline of the illustrations.
 */
export const InkCloseButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button css={inkCloseButtonCss} onClick={onClick}>
    &times;
  </button>
)

const inkCloseButtonCss = css`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  z-index: 10;
  width: 1.6em;
  height: 1.6em;
  font-size: min(calc(3em * var(--gp-scale, 1)), 2.5vh);
  line-height: 1;
  padding: 0 0 0.1em;
  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(circle at 35% 30%, ${goldLight} 0%, ${gold} 55%, ${goldDark} 100%);
  color: ${cream};
  border: 0.09em solid ${ink};
  border-radius: 50%;
  box-shadow: 0 0.1em 0 ${ink}, 0 0.2em 0.4em rgba(43, 37, 33, 0.35);
  text-shadow: 0 0.05em 0 rgba(43, 37, 33, 0.4);
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;

  &:hover {
    filter: brightness(1.1);
    transform: rotate(90deg);
  }

  &:active {
    transform: translateY(0.08em);
    box-shadow: 0 0.04em 0 ${ink}, 0 0.1em 0.2em rgba(43, 37, 33, 0.35);
  }
`
