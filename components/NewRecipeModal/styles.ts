import { darkFocusStyles } from '@styles/focusStyles'
import { theme } from '@styles/theme'
import styled from 'styled-components'
import { media } from '@styles/media'

export const Form = styled.form`
  display: grid;
  justify-items: flex-start;
  align-items: center;
  grid-template-areas: 'label' 'input' 'button';
`

export const Label = styled.label`
  grid-area: label;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${theme.Brown};
  ${media.tablet} {
    font-size: 2.5rem;
  }
  ${media.desktop} {
    font-size: 3rem;
  }
`

export const Input = styled.input`
  grid-area: input;
  width: 21rem;
  height: 3rem;
  border-radius: 0.2rem;
  background-color: ${theme.Brown};
  color: ${theme.Pink};
  padding-left: 0.5rem;
  margin-top: 1.3rem;
  transition: all 0.2s ease;
  ${media.tablet} {
    width: 35rem;
    height: 5rem;
    font-size: 2.2rem;
    padding-left: 1rem;
  }
  ${media.desktop} {
    width: 55rem;
    margin-top: 2rem;
    font-size: 2.5rem;
  }
`

export const CreateButton = styled.button`
  grid-area: button;
  justify-self: center;
  padding: 1 2rem;
  border-radius: 0.2rem;
  background-color: ${theme.Brown};
  color: ${theme.Pink};
  box-shadow: 0 0.2rem 0.2rem black;
  font-size: 1.6rem;
  font-weight: 500;
  width: 8.2rem;
  height: 3.3rem;
  margin-top: 4rem;

  ${darkFocusStyles}
  ${media.tablet} {
    width: 12rem;
    height: 5rem;
    font-size: 2.3rem;
    margin-top: 8rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.5rem 0.2rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.2rem 0.2rem black;
    }
  }
  ${media.desktop} {
    font-size: 3rem;
    width: 16rem;
    margin-top: 11rem;
    height: 6rem;
  }
`
