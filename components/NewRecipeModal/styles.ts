import { darkFocusStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import CloseSVG from '../../assets/close.svg'
import styled from 'styled-components'
import { media } from '@styles/media'

export const Modal = styled.div`
  width: 30rem;
  height: 23rem;
  border-radius: 0.2rem;
  background-color: ${theme.Pink};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  ${media.tablet} {
    width: 60rem;
    height: 40rem;
  }
  ${media.desktop} {
    width: 80rem;
    height: 50rem;
  }
`

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  opacity: 0.6;
`

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: ${theme.Brown};
  text-decoration: underline;
  ${media.tablet} {
    font-size: 4rem;
  }
  ${media.desktop} {
    font-size: 5rem;
  }
`

export const CloseButton = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1.5rem;
  margin-right: 1.5rem;
  cursor: pointer;
  ${darkFocusStyles}
  ${media.tablet} {
    height: 2.3rem;
    width: 2.3rem;
    margin-top: 2rem;
    margin-right: 2rem;
    transition: all 0.3s ease;
    &:hover {
      transform: rotate(180deg);
    }
  }
  ${media.desktop} {
    height: 2.7rem;
    width: 2.7rem;
    margin-top: 2.2rem;
    margin-right: 2.4rem;
  }
`

export const Close = styled(CloseSVG)`
  height: 100%;
  width: 100%;
  path {
    fill: ${theme.Brown};
  }
`

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
  &::placeholder {
    color: ${theme.Pink};
    opacity: 0.7;
  }
  &:focus {
    box-shadow: 0 0.2rem 0.4rem black;
  }
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
  cursor: pointer;
  ${darkFocusStyles}
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  ${media.tablet} {
    width: 12rem;
    height: 5rem;
    font-size: 2.3rem;
    margin-top: 8rem;
    transition: all 0.2s ease;
    &:not(:disabled) {
      &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 0.5rem 0.2rem black;
      }
      &:active {
        transform: translateY(0);
        box-shadow: 0 0.2rem 0.2rem black;
      }
    }
  }
  ${media.desktop} {
    font-size: 3rem;
    width: 16rem;
    margin-top: 11rem;
    height: 6rem;
  }
`
