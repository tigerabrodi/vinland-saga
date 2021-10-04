import styled, { css } from 'styled-components'
import { theme } from '@styles/theme'
import { pinkFocusStyles, yellowFocusStyles } from '@styles/sharedStyles'
import { media } from '@styles/media'

export const NavigationWrapper = styled.nav`
  position: sticky;
  background-color: ${theme.Brown};
  z-index: 10;
  top: 0;
  height: 7rem;
  width: 100%;
  box-shadow: 0 0.2rem 0.2rem black;
  border-bottom: 0.3rem solid ${theme.Pink};
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.tablet} {
    height: 8rem;
  }
  ${media.desktop} {
    height: 9rem;
  }
`

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  ${media.tablet} {
    width: 95%;
  }
  ${media.desktop} {
    width: 55%;
  }
`

export const ButtonLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const linkStyles = css`
  font-weight: 500;
  color: ${theme.Pink};
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 1.7rem;
    margin-top: 1.8rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      filter: brightness(120%);
    }
  }
`

export const NavLink = styled.a`
  ${linkStyles}
  font-size: 1.4rem;
  margin-top: 2rem;
`

export const LoginLink = styled.a`
  ${linkStyles}
  display: none;
  ${media.tablet} {
    margin-right: 3rem;
    display: inline;
  }
`

export const RegisterLink = styled.a`
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 0.2rem;
  background-color: ${theme.Pink};
  padding: 1rem 1.5rem;
  box-shadow: 0 0.1rem 0.2rem black;
  margin-top: 1rem;
  color: ${theme.Brown};
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 1.5rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.2rem 0.4rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.1rem 0.2rem black;
    }
  }
`

export const NavLogo = styled.span`
  background-color: ${theme.Yellow};
  font-weight: bold;
  font-size: 2.4rem;
  padding: 0.6rem;
  margin-top: 0.4rem;
  box-shadow: 0 0.1rem 0.2rem black;
  color: ${theme.Brown};
  ${media.tablet} {
    font-size: 2.2rem;
    padding: 0.7rem;
    box-shadow: 0 0.1rem 0.2rem black;
  }
`

export const NavLogoLink = styled.a`
  transition: all 0.2s ease;
  ${yellowFocusStyles}
  &:hover {
    transform: translateY(-0.1rem);
    filter: brightness(120%);
  }
  &:active {
    transform: translateY(0);
  }
`

export const NavLogoText = styled.span`
  color: ${theme.Yellow};
  font-size: 2rem;
  font-weight: 500;
  margin-left: 2rem;
`

export const NavMenuWrapper = styled.div`
  position: relative;
`

export const NavMenuButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  ${media.tablet} {
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      img {
        box-shadow: 0 0.3rem 0.2rem black;
      }
    }
    &:active {
      transform: translateY(0);
      img {
        box-shadow: 0 0.1rem 0.2rem black;
      }
    }
  }
  ${pinkFocusStyles}
`

export const Avatar = styled.img`
  height: 4.2rem;
  width: 4.2rem;
  border-radius: 50%;
  background-color: ${theme.Pink};
  padding: 0.2rem;
  margin-top: 0.4rem;
  margin-left: 3rem;
  box-shadow: 0 0.1rem 0.2rem black;
  ${media.tablet} {
    transition: all 0.2s ease;
    height: 6rem;
    width: 6rem;
    padding: 0.3rem;
  }
`

export const Menu = styled.div`
  position: absolute;
  bottom: -20.5rem;
  height: 20rem;
  width: 15rem;
  right: 0;
  background-color: ${theme.LightPink};
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${media.tablet} {
    width: 21rem;
    height: 27rem;
    bottom: -27.5rem;
  }
`

const menuLinkButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  color: ${theme.Brown};
  column-gap: 1rem;
  cursor: pointer;
  svg {
    height: 2.4rem;
    width: 2.4rem;
    ${media.tablet} {
      width: 3.3rem;
      height: 3.3rem;
    }
  }
  ${media.tablet} {
    font-size: 2rem;
    transition: all 0.2s;
    padding: 1rem;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.2rem 0.1rem;
    }
  }
`

export const MenuItemLink = styled.a`
  ${menuLinkButtonStyles}
`

export const MenuItemButton = styled.button`
  ${menuLinkButtonStyles}
`
