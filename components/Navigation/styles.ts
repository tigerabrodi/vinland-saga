import styled from "styled-components";
import { theme } from "@styles/theme";
import { pinkFocusStyles, yellowFocusStyles } from "@styles/sharedStyles";

export const NavigationWrapper = styled.nav`
  height: 7rem;
  box-shadow: 0 0.1rem 0.2rem black;
  width: 100%;
  border-bottom: 0.2rem solid ${theme.Pink};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const NavLink = styled.a`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${theme.Pink};
  margin-top: 2rem;
  ${pinkFocusStyles}
`;

export const NavButtonLink = styled.a`
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 0.2rem;
  background-color: ${theme.Pink};
  padding: 1rem 1.5rem;
  box-shadow: 0 0.1rem 0.2rem black;
  margin-top: 1rem;
  color: ${theme.Brown};
  ${pinkFocusStyles}
`;

export const NavLogo = styled.a`
  background-color: ${theme.Yellow};
  font-weight: bold;
  font-size: 2.4rem;
  padding: 0.6rem;
  margin-top: 0.2rem;
  color: ${theme.Brown};
  ${yellowFocusStyles}
`;
