import { darkFocusStyles } from '@styles/focusStyles'
import { media } from '@styles/media'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const Text = styled.p`
  color: ${theme.Brown};
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
  ${media.tablet} {
    font-size: 3rem;
  }
  ${media.desktop} {
    font-size: 3.5rem;
    padding: 0 5rem;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 5rem;
  ${media.tablet} {
    column-gap: 10rem;
  }
  ${media.desktop} {
    column-gap: 16rem;
  }
`

const buttonStyles = css`
  background-color: ${theme.Brown};
  border-radius: 0.2rem;
  font-weight: 600;
  height: 4rem;
  width: 8.5rem;
  font-size: 2rem;
  box-shadow: 0 0.2rem 0.2rem black;
  ${darkFocusStyles}
  ${media.tablet} {
    height: 5rem;
    width: 12rem;
    font-size: 2.5rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.4rem 0.2rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.2rem 0.2rem black;
    }
  }
  ${media.desktop} {
    height: 6.3rem;
    width: 15rem;
    font-size: 3.3rem;
  }
`

export const ConfirmButton = styled.button`
  ${buttonStyles}
  color: ${theme.Green};
`

export const CancelButton = styled.button`
  ${buttonStyles}
  color: ${theme.Pink};
`
