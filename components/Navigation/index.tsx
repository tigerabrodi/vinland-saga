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
  NavMenuButton,
  Avatar,
} from "./styles";
import defaultAvatar from "../../assets/default-avatar.png";
import Link from "next/link";
import { useMedia } from "@hooks/useMedia";
import { useUserContext } from "@lib/context";
import { useGetUser } from "@hooks/useGetUser";

export const Navigation = () => {
  const isTabletLayout = useMedia("min", "768");

  const { username } = useUserContext();
  const { user } = useGetUser(username);

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

        {user ? (
          <NavMenuButton aria-label="Menu" aria-haspopup="menu">
            <Avatar
              src={user.avatarUrl !== "" ? user.avatarUrl : defaultAvatar.src}
              alt=""
            />
          </NavMenuButton>
        ) : (
          <ButtonLinkWrapper>
            <Link passHref href="/sign-in">
              <LoginLink>Login</LoginLink>
            </Link>
            <Link passHref href="/sign-up">
              <RegisterLink>Create Account</RegisterLink>
            </Link>
          </ButtonLinkWrapper>
        )}
      </NavigationContainer>
    </NavigationWrapper>
  );
};
