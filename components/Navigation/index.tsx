import {
  RegisterLink,
  LoginLink,
  NavigationWrapper,
  NavLink,
  NavLogo,
  NavigationContainer,
  ButtonLinkWrapper,
} from "./styles";
import Link from "next/link";

export const Navigation = () => {
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
          <NavLogo>VS</NavLogo>
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
