import { css } from 'styled-components'
import { pinkFocusStyles } from './focusStyles'
import { media } from './media'
import { theme } from './theme'

export const recipeDetailButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 400;
  color: ${theme.Pink};
  font-size: 1.6rem;
  margin-top: 2rem;
  column-gap: 0.5rem;
  ${pinkFocusStyles}
  svg {
    width: 2.2rem;
    height: 2.2rem;
    ${media.tablet} {
      width: 3rem;
      height: 3rem;
    }
    ${media.desktop} {
      width: 5rem;
      height: 5rem;
    }
  }
  ${media.tablet} {
    font-size: 2rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
    }
  }
  ${media.desktop} {
    margin-top: 3rem;
    font-size: 3.5rem;
  }
`

export const editDeleteStyles = css`
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${theme.LightPink};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.2rem black;
  margin-top: 3rem;
  ${pinkFocusStyles}
  svg {
    width: 1.4rem;
    height: 1.4rem;
    path {
      fill: ${theme.Brown};
    }
    ${media.tablet} {
      width: 2rem;
      height: 2rem;
    }
    ${media.desktop} {
      width: 3rem;
      height: 3rem;
    }
  }
  ${media.tablet} {
    width: 4rem;
    height: 4rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.4rem 0.3rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.2rem 0.2rem black;
    }
  }
  ${media.desktop} {
    margin-top: 5rem;
    width: 6rem;
    height: 6rem;
  }
`
