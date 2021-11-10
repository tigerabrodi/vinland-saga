import { AssistiveTechnologyOnly, sectionStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'
import { media } from '@styles/media'
import { darkFocusStyles, pinkFocusStyles } from '@styles/focusStyles'
import { DotIcon as DotSVG } from '@icons/Dot'

export const Wrapper = styled.div`
  margin: 3rem 0;
  ${sectionStyles}
  ${media.tablet} {
    justify-content: flex-start;
  }
`

export const ProfileSection = styled.section`
  display: grid;
  grid-template-areas: 'avatar avatar' 'username username' 'fullname edit' 'text text' 'line line';
  align-items: center;
  justify-items: center;
  width: 29rem;
  height: 38rem;
  background-color: ${theme.LightPink};
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
  ${media.tablet} {
    grid-template-areas: 'avatar username fullname edit' 'avatar text text text' 'line line line line';
    grid-template-columns: auto min-content 18rem auto;
    column-gap: 1rem;
    width: 72rem;
    height: 32rem;
    justify-items: flex-start;
  }
  ${media.desktop} {
    width: 100rem;
    height: 35rem;
  }
`

export const HiddenProfileTitle = styled.h1`
  ${AssistiveTechnologyOnly}
`

export const Avatar = styled.img`
  grid-area: avatar;
  height: 15rem;
  width: 15rem;
  padding: 0.5rem;
  background-color: ${theme.Brown};
  border-radius: 50%;
  ${media.tablet} {
    height: 20rem;
    width: 20rem;
    margin-left: 1.5rem;
    margin-right: 2.5rem;
  }
  ${media.desktop} {
    height: 23rem;
    width: 23rem;
  }
`

export const ProfileUsername = styled.span`
  grid-area: username;
  font-weight: 500;
  font-size: 1.6rem;
  color: ${theme.Brown};
  ${media.tablet} {
    align-self: flex-end;
    font-size: 2rem;
  }
  ${media.desktop} {
    font-size: 2.3rem;
  }
`

export const ProfileTitle = styled.h1<{ isNotAuthorizedUser: boolean }>`
  grid-area: fullname;
  font-weight: 600;
  font-size: 1.8rem;
  margin-left: 5rem;
  color: ${theme.Brown};
  ${(props) =>
    props.isNotAuthorizedUser &&
    css`
      text-align: center;
      width: 19rem;
      margin-left: 5rem;
    `};
  ${media.tablet} {
    width: auto;
    margin: 0;
    align-self: flex-end;
    font-size: 2.4rem;
  }
  ${media.desktop} {
    font-size: 2.8rem;
  }
`

export const EditLink = styled.a`
  grid-area: edit;
  background-color: ${theme.Brown};
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.4rem black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-right: 5.5rem;
  transition: all 0.2s ease;
  ${darkFocusStyles}
  ${media.tablet} {
    margin: 0;
    align-self: flex-end;
    padding: 1.2rem;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.5rem 0.4rem black;
    }
    &:active {
      box-shadow: 0 0.2rem 0.4rem black;
      transform: translateY(0);
    }
  }
  ${media.desktop} {
    padding: 1.2rem;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
    ${media.tablet} {
      height: 2rem;
      width: 2rem;
    }
    ${media.desktop} {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`

export const ProfileText = styled.p`
  grid-area: text;
  text-align: center;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.4;
  padding: 0 2rem;
  color: ${theme.Brown};
  ${media.tablet} {
    padding: 0;
    text-align: left;
    align-self: flex-start;
    margin-top: 3rem;
    padding-right: 5rem;
    font-size: 1.7rem;
  }
  ${media.desktop} {
    padding-right: 11rem;
    font-size: 2rem;
    margin-top: 4rem;
  }
`

export const Dot = styled(DotSVG)`
  height: 0.4rem;
  width: 0.4rem;
  margin: 0 1rem 0.25rem;
  g {
    fill: ${theme.Brown};
  }
`

export const Line = styled.div`
  grid-area: line;
  height: 0.4rem;
  width: 23rem;
  background-color: ${theme.Brown};
  border-radius: 0.2rem;
  ${media.tablet} {
    justify-self: center;
    height: 0.6rem;
    margin-bottom: 1rem;
    width: 63rem;
  }
  ${media.desktop} {
    width: 86rem;
  }
`

export const RecipesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 3rem;
  ${media.tablet} {
    margin-top: 5rem;
    width: 65rem;
  }
  ${media.desktop} {
    margin-top: 8rem;
    width: 80%;
  }
`

export const RecipesHeading = styled.h2`
  font-weight: bold;
  font-size: 3.6rem;
  color: ${theme.LightPink};
  text-decoration: underline;
  margin-bottom: 1rem;
  ${media.tablet} {
    font-size: 6rem;
  }
`

export const NoRecipesText = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${theme.LightPink};
  text-align: center;
  margin-top: 1rem;
  ${media.tablet} {
    font-size: 3rem;
    margin-top: 5rem;
  }
  ${media.desktop} {
    font-size: 3.2rem;
  }
`

export const NewRecipeButton = styled.button`
  background-color: ${theme.LightPink};
  color: ${theme.Brown};
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.2rem black;
  margin-top: 5rem;
  padding: 1.3rem 2.2rem;
  transition: all 0.2s ease;
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 2rem;
    padding: 1.8rem 3rem;
    margin-top: 10rem;
    box-shadow: 0 0.2rem 0.2rem black;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.4rem 0.2rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.2rem 0.2rem black;
    }
  }
  ${media.desktop} {
    font-size: 2.5rem;
    padding: 2rem 3.5rem;
    margin-top: 13rem;
  }
`
