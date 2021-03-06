import {
  editDeleteStyles,
  recipeDetailButtonStyles,
} from '@styles/buttonStyles'
import { pinkFocusStyles } from '@styles/focusStyles'
import { media } from '@styles/media'
import { sectionStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  ${sectionStyles}
  margin-top: 2rem;
  min-height: auto;
  ${media.tablet} {
    min-height: auto;
    margin-top: 4rem;
  }
`

export const TopContainer = styled.div`
  display: grid;
  width: 28rem;
  grid-template-areas: 'title title' 'author author' 'image image' 'clap comment' 'date date' 'edit delete';
  align-items: center;
  justify-items: center;
  ${media.tablet} {
    width: 50rem;
  }
  ${media.desktop} {
    column-gap: 27rem;
    width: 80rem;
  }
`

export const Title = styled.h1`
  grid-area: title;
  text-align: center;
  font-weight: bold;
  font-size: 2.4rem;
  color: ${theme.Yellow};
  ${media.tablet} {
    font-size: 4rem;
  }
  ${media.desktop} {
    font-size: 6rem;
  }
`

export const AuthorText = styled.p`
  grid-area: author;
  font-size: 1.1rem;
  color: ${theme.Pink};
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 0.75rem;
  ${media.tablet} {
    font-size: 1.5rem;
  }
  ${media.desktop} {
    margin-top: 2rem;
    font-size: 2.5rem;
  }
`

export const AuthorLink = styled.a`
  text-decoration: underline;
  ${pinkFocusStyles}
`

export const AuthorAvatar = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  ${media.tablet} {
    height: 3rem;
    width: 3rem;
  }
  ${media.desktop} {
    margin-left: 0.5rem;
    height: 5rem;
    width: 5rem;
  }
`

export const RecipeImage = styled.img`
  grid-area: image;
  width: 26rem;
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.4rem black;
  margin-top: 3rem;
  ${media.tablet} {
    width: 45rem;
  }
  ${media.desktop} {
    margin-top: 5rem;
    width: 70rem;
  }
`

export const CommentLink = styled.a`
  ${recipeDetailButtonStyles}
  grid-area: comment;
  ${media.desktop} {
    justify-self: flex-start;
  }
`

export const DateText = styled.p`
  color: ${theme.Yellow};
  font-size: 1rem;
  font-weight: 500;
  grid-area: date;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 0.5rem;
  svg {
    height: 1.4rem;
    width: 1.4rem;
    ${media.tablet} {
      height: 2rem;
      width: 2rem;
    }
    ${media.desktop} {
      height: 3rem;
      width: 3rem;
    }
  }
  ${media.tablet} {
    font-size: 1.5rem;
  }
  ${media.desktop} {
    column-gap: 1rem;
    font-size: 2rem;
    margin-top: 4rem;
  }
`

export const EditLink = styled.a`
  ${editDeleteStyles}
  grid-area: edit;
  ${media.desktop} {
    justify-self: flex-end;
  }
`

export const DeleteButton = styled.button`
  ${editDeleteStyles}
  grid-area: delete;
  ${media.desktop} {
    justify-self: flex-start;
  }
`

export const MarkDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.Pink};
  text-align: center;
  width: 28rem;
  row-gap: 1rem;
  margin-top: 2rem;
  border-bottom: 0.2rem solid;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  ${media.tablet} {
    width: 50rem;
    margin: 5rem 0;
    font-size: 2rem;
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.7rem;
    }
  }
  ${media.desktop} {
    line-height: 1.5;
    margin-bottom: 7rem;
    width: 75rem;
    border-bottom: 0.4rem solid;
    h1 {
      font-size: 4rem;
    }
    p {
      font-size: 1.8rem;
    }
  }
`
