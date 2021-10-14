import { css } from 'styled-components'
import { theme } from './theme'

export const pinkFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge #ffbeba;
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const whiteFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge white;
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const yellowFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge ${theme.Yellow};
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const darkFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge ${theme.Brown};
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`
