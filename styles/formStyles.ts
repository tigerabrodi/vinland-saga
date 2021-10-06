import styled, { css } from 'styled-components'
import { media } from './media'
import { pinkFocusStyles, sectionStyles } from './sharedStyles'
import { theme } from './theme'

export const formGroupStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;
`

export const FormGroup = styled.div`
  ${formGroupStyles}
`

export const Label = styled.label<{ isLoginMode?: boolean }>`
  font-weight: bold;
  font-size: 1.4rem;
  color: ${theme.Pink};
  margin-top: 4rem;
  ${(props) => props.isLoginMode && 'margin-top: 9rem;'};
  ${media.tablet} {
    font-size: 2.5rem;
    margin-top: 8rem;
    ${(props) => props.isLoginMode && 'margin-top: 18rem;'};
  }
`

export const formInputStyles = `
  border-radius: 0.2rem;
  background-color: ${theme.LightPink};
  padding-left: 0.5rem;
  color: ${theme.Brown};
  font-weight: 500;
  transition: all 0.2s ease;
  width: 23rem;
  height: 2.5rem;
  margin-top: 1rem;
  &:focus {
    box-shadow: 0 0.2rem 0.5rem black;
    outline: 0;
  }
  &::placeholder {
    opacity: 0.5;
    color: ${theme.Brown};
  }
  ${media.custom(360)} {
    margin-top: 1.5rem;
  }
  ${media.tablet} {
    padding-left: 1rem;
    width: 39rem;
    height: 3.5rem;
    margin-top: 2rem;
    font-size: 1.8rem;
  }
  ${media.desktop} {
    width: 55rem;
    height: 4rem;
  }
`

export const Input = styled.input`
  ${formInputStyles}
`

export const SignSection = styled.section<{ isLoginMode?: boolean }>`
  ${sectionStyles}
  margin: 3rem 0;
  ${(props) =>
    props.isLoginMode &&
    css`
      justify-content: flex-start;
      row-gap: 3rem;
      margin-bottom: 2rem;
    `};
  ${media.tablet} {
    margin: 6rem 0;
    ${(props) => props.isLoginMode && 'margin-bottom: 0rem;'};
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

export const formValidationStyles = css`
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 500;
  ${media.tablet} {
    margin-bottom: 0;
    margin-top: 1.5rem;
    font-size: 1.7rem;
  }
`

export const FormError = styled.span<{ isLoginMode?: boolean }>`
  ${formValidationStyles}
  color: ${theme.DarkPink};
  ${(props) =>
    props.isLoginMode &&
    css`
      margin-top: 1.5rem;
      font-size: 1.2rem;
      ${media.tablet} {
        margin-top: 3rem;
        font-size: 2rem;
      }
    `};
`
