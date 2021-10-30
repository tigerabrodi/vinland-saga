import { pinkFocusStyles } from '@styles/focusStyles'
import { media } from '@styles/media'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const ListItem = styled.li`
  display: grid;
  grid-template-areas:
    'avatar fullname recipesCount'
    'avatar username .'
    'avatar location clapsCount';
  align-items: center;
  justify-items: center;
  border: 0.2rem solid ${theme.Yellow};
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.2rem black;
  grid-template-rows: auto 1rem auto;
  width: 100%;
  ${media.tablet} {
    flex: 0 0 30rem;
  }
  ${media.desktop} {
    flex: 1 0 30rem;
    max-width: 40rem;
  }
`

export const AvatarImage = styled.img`
  grid-area: avatar;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  margin: 1.3rem 0;
  ${media.desktop} {
    height: 7rem;
    width: 7rem;
  }
`

export const Fullname = styled.h2`
  grid-area: fullname;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${theme.Pink};
  justify-self: self-start;
  margin-left: 0.7rem;
  text-decoration: underline;
  ${media.tablet} {
    transition: all 0.2s;
    &:hover {
      transform: translateY(-0.2rem);
    }

    &:active {
      transform: translateY(0);
    }
  }
  ${media.desktop} {
    font-size: 1.6rem;
  }
`

export const FullnameLink = styled.a`
  ${pinkFocusStyles}
`

export const Username = styled.p`
  grid-area: username;
  font-weight: 500;
  font-size: 1.3rem;
  color: ${theme.Pink};
  justify-self: self-start;
  margin-left: 0.7rem;
  ${media.desktop} {
    font-size: 1.4rem;
  }
`

export const Location = styled.p`
  grid-area: location;
  font-weight: 500;
  font-size: 1rem;
  color: ${theme.Pink};
  justify-self: self-start;
  margin-left: 0.7rem;
  ${media.desktop} {
    font-size: 1.2rem;
  }
`

const countStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: ${theme.Pink};
  font-size: 1.2rem;
  column-gap: 0.5rem;
  svg {
    height: 2rem;
    width: 2rem;
    path {
      fill: ${theme.Pink};
    }
  }
  ${media.desktop} {
    font-size: 1.5rem;
    column-gap: 0.7rem;
    svg {
      height: 2.4rem;
      width: 2.4rem;
    }
  }
`

export const RecipesCount = styled.p`
  ${countStyles};
  grid-area: recipesCount;
  position: relative;
  bottom: -0.3rem;
`

export const ClapsCount = styled.p`
  ${countStyles};
  grid-area: clapsCount;
`
