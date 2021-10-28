import { darkFocusStyles } from '@styles/focusStyles'
import { media } from '@styles/media'
import { theme } from '@styles/theme'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
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
  svg {
    height: 100%;
    width: 100%;
    path {
      fill: ${theme.Brown};
    }
  }
`
