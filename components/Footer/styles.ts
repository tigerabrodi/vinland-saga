import { theme } from '@styles/theme'
import styled from 'styled-components'
import { media } from '@styles/media'
import { pinkFocusStyles } from '@styles/focusStyles'

export const FooterContainer = styled.footer`
  position: relative;
  z-index: 1;
  background-color: ${theme.Brown};
  width: 100%;
  flex: 0 0 8rem;
  border-top: solid 0.2rem ${theme.Pink};
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.tablet} {
    flex: 0 0 9rem;
  }
  ${media.desktop} {
    flex: 0 0 10.5rem;
    border-top: solid 0.3rem ${theme.Pink};
  }
`

export const FooterText = styled.p`
  font-weight: 500;
  font-size: 1.3rem;
  color: ${theme.Pink};
  ${media.tablet} {
    font-size: 1.8rem;
  }
`

export const FooterLink = styled.a`
  position: relative;
  color: ${theme.LightPink};
  text-decoration: underline;
  ${pinkFocusStyles}
  svg {
    position: absolute;
    top: -1.2rem;
    right: -1rem;
    height: 1.2rem;
    width: 1.2rem;
    ${media.tablet} {
      top: -1.8rem;
      right: -1.4rem;
      height: 1.7rem;
      width: 1.7rem;
    }

    ${media.desktop} {
      top: -2.2rem;
      right: -1.6rem;
      height: 1.9rem;
      width: 1.9rem;
    }
  }
`
