import * as React from 'react'
import Link from 'next/link'
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
  NavMenuWrapper,
  MenuItemButton,
  MenuItemLink,
  Menu,
} from './styles'
import defaultAvatar from '../../assets/default-avatar.png'
import RecipeSVG from '../../assets/recipe.svg'
import ProfileSVG from '../../assets/profile.svg'
import { useMedia } from '@hooks/useMedia'
import { useUserContext } from '@lib/context'
import { auth } from '@lib/firebase/firebase'
import toast from 'react-hot-toast'
import { useLoadingStore, useNewRecipeStore } from '@lib/store'
import { useRouter } from 'next/router'
import { useFocusTrap } from '@hooks/useFocusTrap'
import { useClickOutside } from '@hooks/useClickOutside'
import { useCloseEscape } from '@hooks/useCloseEscape'
import { ChefProfile } from '@lib/types'
import { useRealtimeState } from '@hooks/useRealtimeState'
import { MoonIcon } from '@icons/Moon'

export const Navigation = () => {
  const isTabletLayout = useMedia('min', '768')
  const { push } = useRouter()
  const { username } = useUserContext()
  const { setIsModalOpen } = useNewRecipeStore()
  const { setStatus } = useLoadingStore()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuRef = useFocusTrap(isMenuOpen)
  useClickOutside({
    ref: menuRef,
    callback: () => setIsMenuOpen(false),
    shouldTriggerCallback: isMenuOpen,
  })
  useCloseEscape(() => setIsMenuOpen(false))

  const signOut = () => {
    setStatus('loading')
    setIsMenuOpen(false)
    auth.signOut()
    push('/')
    toast.success('Successfully signed out of your account.')
    setStatus('success')
  }

  const chef = useRealtimeState<ChefProfile>(
    `chefs/${auth.currentUser?.uid}`
  )?.data()

  return (
    <NavigationWrapper>
      <NavigationContainer>
        <Link passHref href="/">
          <NavLink>Recipes</NavLink>
        </Link>
        <Link passHref href="/chefs">
          <NavLink>Chefs</NavLink>
        </Link>
        <Link passHref href="/">
          <NavLogoLink>
            <NavLogo>VS</NavLogo>
            {isTabletLayout && <NavLogoText>Vinland Saga</NavLogoText>}
          </NavLogoLink>
        </Link>

        {chef && username ? (
          <NavMenuWrapper>
            <NavMenuButton
              aria-label="Menu"
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Avatar
                src={chef.avatarUrl !== '' ? chef.avatarUrl : defaultAvatar.src}
                alt=""
              />
            </NavMenuButton>
            {isMenuOpen && (
              <Menu role="menu" ref={menuRef}>
                <Link passHref href={`/${username}`}>
                  <MenuItemLink
                    role="menuitem"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ProfileSVG /> Profile
                  </MenuItemLink>
                </Link>
                <MenuItemButton
                  role="menuitem"
                  onClick={() => {
                    setIsModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  <RecipeSVG /> New Recipe
                </MenuItemButton>
                <MenuItemButton role="menuitem" onClick={() => signOut()}>
                  <MoonIcon /> Sign Out
                </MenuItemButton>
              </Menu>
            )}
          </NavMenuWrapper>
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
  )
}
