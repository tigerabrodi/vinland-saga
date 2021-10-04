import { media } from '@styles/media'
import { pinkFocusStyles, sectionStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const SignSection = styled.section`
  ${sectionStyles}
  margin: 3rem 0;
  ${media.tablet} {
    margin: 6rem 0;
  }
`

export const SignTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  color: ${theme.Pink};
  ${media.tablet} {
    font-size: 5rem;
  }
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  div:first-of-type {
    label {
      margin-top: 2rem;
      ${media.tablet} {
        margin-top: 5rem;
      }
    }
  }
`

export const SwitchText = styled.p`
  color: ${theme.LightPink};
  font-size: 1rem;
  font-weight: 500;
  margin-top: 2rem;
  ${media.tablet} {
    font-size: 1.5rem;
    margin-top: 4rem;
  }
  ${media.desktop} {
    font-size: 1.8rem;
    margin-top: 4rem;
  }
`

export const SwitchLink = styled.a`
  color: white;
  font-weight: 600;
  text-decoration: underline;
  font-size: 1.1rem;
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 1.7rem;
  }
`

export const SubmitButton = styled.button`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${theme.Brown};
  background-color: ${theme.LightPink};
  border-radius: 0.2rem;
  padding: 1rem 3rem;
  margin-top: 5rem;
  box-shadow: 0 0.1rem 0.4rem black;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 2.5rem;
    padding: 1.5rem 4rem;
    margin-top: 9rem;
    transition: all 0.2s ease;
    &:not(:disabled) {
      &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 0.3rem 0.4rem black;
      }
      &:active {
        transform: translateY(0);
        box-shadow: 0 0.1rem 0.4rem black;
      }
    }
  }
`

const formValidationStyles = css`
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 500;
  ${media.tablet} {
    margin-bottom: 0;
    margin-top: 1.5rem;
    font-size: 1.7rem;
  }
`

export const FormError = styled.span`
  ${formValidationStyles}
  color: ${theme.DarkPink};
`

export const FormValid = styled.span`
  ${formValidationStyles}
  color: ${theme.Green};
`
