import { media } from '@styles/media'
import { pinkFocusStyles, yellowFocusStyles } from '@styles/focusStyles'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const RecipeListItem = styled.li`
  width: 28rem;
  min-height: 32rem;
  row-gap: 0.7rem;
  display: grid;
  grid-template-areas:
    'image image image image'
    'avatar author .... ....'
    'avatar date ..... .....'
    'title title title title'
    'clap comment .... time';
  align-items: center;
  justify-items: center;
  border: 0.2rem solid ${theme.Yellow};
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.2rem black;
  grid-template-columns: 30% 30% 10% 30%;
  grid-template-rows: min-content auto auto auto 3.8rem;
  overflow: hidden;
  ${media.tablet} {
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.3rem 0.3rem black;
      filter: brightness(120%);
    }
  }
  ${media.desktop} {
    width: 33rem;
    min-height: 40rem;
    grid-template-columns: 30% 32% 5% 33%;
  }
`

export const RecipeImage = styled.img`
  grid-area: image;
  width: 100%;
  height: auto;
`

export const RecipeAvatar = styled.img`
  grid-area: avatar;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  margin-top: 0.5rem;
  ${media.desktop} {
    height: 6rem;
    width: 6rem;
  }
`

const linkHoverStyles = css`
  ${media.tablet} {
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
    }
  }
`

export const AuthorLink = styled.a`
  grid-area: author;
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: underline;
  color: ${theme.Pink};
  align-self: self-end;
  justify-self: self-start;
  ${pinkFocusStyles}
  ${linkHoverStyles} 
  ${media.desktop} {
    font-size: 1.7rem;
  }
`

export const Date = styled.p`
  font-weight: 500;
  font-size: 1rem;
  color: ${theme.Pink};
  grid-area: date;
  justify-self: self-start;
  align-self: self-start;
  ${media.desktop} {
    font-size: 1.4rem;
  }
`

export const RecipeTitle = styled.h2`
  align-self: self-end;
  grid-area: title;
  justify-self: self-start;
  padding-left: 2.2rem;
  ${linkHoverStyles}
  ${media.desktop} {
    align-self: self-start;
  }
`

export const RecipeTitleLink = styled.a`
  font-weight: bold;
  font-size: 2rem;
  color: ${theme.Yellow};
  text-decoration: underline;
  ${yellowFocusStyles}
  ${media.desktop} {
    font-size: 2.6rem;
  }
`

const textStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 0.4rem;
  font-size: 1.3rem;
  color: ${theme.Pink};
  svg {
    height: 2rem;
    width: 2rem;
    ${media.desktop} {
      height: 3rem;
      width: 3rem;
    }
  }
  ${media.desktop} {
    font-size: 1.8rem;
    align-self: self-start;
  }
`

export const ClapText = styled.p`
  ${textStyles}
  grid-area: clap;
`

export const CommentText = styled.p`
  ${textStyles}
  grid-area: comment;
`

export const ReadingTime = styled.p`
  grid-area: time;
  color: ${theme.Yellow};
  font-size: 1.2rem;
  margin-right: 1rem;
  ${media.desktop} {
    font-size: 1.8rem;
    align-self: self-start;
    margin-right: 1.5rem;
    margin-top: 0.5rem;
  }
`
