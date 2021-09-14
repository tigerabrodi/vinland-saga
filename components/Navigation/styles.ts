import styled, { css } from "styled-components";
import { theme } from "@styles/theme";
import { pinkFocusStyles, yellowFocusStyles } from "@styles/sharedStyles";
import { media } from "@styles/media";

export const NavigationWrapper = styled.nav`
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
`;

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
    width: 70%;
  }
`;

export const ButtonLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

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
`;

export const NavLink = styled.a`
  ${linkStyles}
  font-size: 1.4rem;
  margin-top: 2rem;
`;

export const LoginLink = styled.a`
  ${linkStyles}
  display: none;
  ${media.tablet} {
    margin-right: 3rem;
    display: inline;
  }
`;

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
`;

export const NavLogo = styled.a`
  background-color: ${theme.Yellow};
  font-weight: bold;
  font-size: 2.4rem;
  padding: 0.6rem;
  margin-top: 0.4rem;
  box-shadow: 0 0.1rem 0.2rem black;
  color: ${theme.Brown};
  ${yellowFocusStyles}
  ${media.tablet} {
    font-size: 2.6rem;
    padding: 0.7rem;
    box-shadow: 0 0.1rem 0.2rem black;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.2rem 0.2rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.1rem 0.2rem black;
    }
  }
`;
