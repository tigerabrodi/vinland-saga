import {
  RegisterLink,
  LoginLink,
  NavigationWrapper,
  NavLink,
  NavLogo,
  NavigationContainer,
  ButtonLinkWrapper,
  NavLogoText,
  NavLogoLink,
} from "./styles";
import Link from "next/link";
import { useMedia } from "@hooks/useMedia";

export const Navigation = () => {
  const isTabletLayout = useMedia("min", "768");

  return (
    <NavigationWrapper>
      <NavigationContainer>
        <Link passHref href="/">
          <NavLink>Home</NavLink>
        </Link>
        <Link passHref href="/users">
          <NavLink>Users</NavLink>
        </Link>
        <Link passHref href="/">
          <NavLogoLink>
            <NavLogo>VS</NavLogo>
            {isTabletLayout && <NavLogoText>Vinland Saga</NavLogoText>}
          </NavLogoLink>
        </Link>
        <ButtonLinkWrapper>
          <Link passHref href="/sign-in">
            <LoginLink>Login</LoginLink>
          </Link>
          <Link passHref href="/sign-up">
            <RegisterLink>Create Account</RegisterLink>
          </Link>
        </ButtonLinkWrapper>
      </NavigationContainer>
    </NavigationWrapper>
  );
};
