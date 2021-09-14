import { NavButtonLink, NavigationWrapper, NavLink, NavLogo } from "./styles";
import Link from "next/link";

export const Navigation = () => {
  return (
    <NavigationWrapper>
      <Link passHref href="/">
        <NavLink>Home</NavLink>
      </Link>
      <Link passHref href="/users">
        <NavLink>Users</NavLink>
      </Link>
      <Link passHref href="/">
        <NavLogo>VS</NavLogo>
      </Link>
      <Link passHref href="/sign-up">
        <NavButtonLink>Create Account</NavButtonLink>
      </Link>
    </NavigationWrapper>
  );
};
