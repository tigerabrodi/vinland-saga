import { ClapButton } from '@components/ClapButton'
import { media } from '@styles/media'
import {
  AssistiveTechnologyOnly,
  darkFocusStyles,
  editDeleteStyles,
} from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled from 'styled-components'

export const CommentListItem = styled.li`
  width: 29rem;
  border-radius: 0.2rem;
  background-color: ${theme.LightPink};
  display: grid;
  grid-template-areas:
    'avatar author author author'
    'text text text text'
    'clap clap edit delete'
    'line line line line';
  align-items: center;
  justify-items: center;
  ${media.tablet} {
    width: 52rem;
    grid-template-columns: min-content 2fr 1fr 1fr;
  }
  ${media.desktop} {
    width: 70rem;
  }
`

export const AuthorAvatar = styled.img`
  grid-area: avatar;
  height: 3.7rem;
  width: 3.7rem;
  border-radius: 50%;
  margin-top: 0.5rem;
  ${media.tablet} {
    height: 6rem;
    width: 6rem;
    margin-top: 1.5rem;
    margin-left: 2rem;
  }
  ${media.desktop} {
    height: 7.5rem;
    width: 7.5rem;
  }
`

export const AuthorText = styled.p`
  grid-area: author;
  font-weight: 500;
  font-size: 1rem;
  color: ${theme.Brown};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  justify-self: flex-start;
  column-gap: 0.3rem;
  svg {
    height: 0.4rem;
    width: 0.4rem;
  }
  ${media.tablet} {
    column-gap: 0;
    font-size: 1.7rem;
    margin-top: 1rem;
    width: 82%;
    margin-left: 0.8rem;
  }
  ${media.desktop} {
    font-size: 2.1rem;
    justify-content: flex-start;
    column-gap: 2rem;
    margin-left: 4rem;
    svg {
      height: 0.7rem;
      width: 0.7rem;
    }
  }
`

export const AuthorLink = styled.a`
  text-decoration: underline;
`

export const Text = styled.p`
  grid-area: text;
  align-self: self-start;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.3;
  color: ${theme.Brown};
  margin-bottom: 1.3rem;
  margin-left: 3rem;
  width: 20rem;
  ${media.tablet} {
    width: 35rem;
    font-size: 1.9rem;
    width: 35rem;
    margin: 1.5rem 0 3rem 3rem;
  }
  ${media.desktop} {
    font-size: 2.4rem;
    width: 46rem;
  }
`

export const CommentClapButton = styled(ClapButton)`
  grid-area: clap;
  align-self: center;
  padding-left: 2.5rem;
  margin-top: 0.2rem;
  ${media.tablet} {
    margin-top: 0;
    align-self: center;
    padding-left: 0;
    justify-self: self-start;
    margin-left: 9.8rem;
    font-size: 2.5rem;
    svg {
      height: 4rem;
      width: 4rem;
    }
  }
  ${media.desktop} {
    margin-top: 0.5rem;
    font-size: 3rem;
    margin-left: 13rem;
    svg {
      height: 5rem;
      width: 5rem;
    }
  }
`

export const EditButton = styled.button`
  ${editDeleteStyles}
  grid-area: edit;
  background-color: ${theme.Brown};
  align-self: self-start;
  margin-top: 0;
  svg path {
    fill: ${theme.LightPink};
  }
  ${darkFocusStyles}
  ${media.tablet} {
    justify-self: self-start;
  }
  ${media.desktop} {
    width: 5rem;
    height: 5rem;
    margin-top: 0;
    justify-self: center;
    margin-right: 5rem;
    svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`

export const DeleteButton = styled.button`
  ${editDeleteStyles}
  grid-area: delete;
  background-color: ${theme.Brown};
  align-self: self-start;
  justify-self: self-start;
  margin-top: 0;
  margin-left: 1.5rem;
  svg path {
    fill: ${theme.LightPink};
  }
  ${darkFocusStyles}
  ${media.tablet} {
    margin-right: 8rem;
    margin-left: 0;
  }
  ${media.desktop} {
    width: 5rem;
    height: 5rem;
    margin-top: 0;
    margin-right: 13rem;
    svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`

export const Line = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  grid-area: line;
  width: 26rem;
  height: 0.2rem;
  background-color: ${theme.Brown};
  height: 0.3rem;
  border-radius: 0.2rem;
  ${media.tablet} {
    height: 0.5rem;
    margin-top: 2rem;
    width: 45rem;
  }
  ${media.desktop} {
    width: 65rem;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
  }
`

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  flex-direction: column;
`

export const HiddenLabel = styled.label`
  ${AssistiveTechnologyOnly}
`

export const Textarea = styled.textarea`
  width: 19rem;
  height: 7.5rem;
  border-radius: 0.2rem;
  color: ${theme.Pink};
  background-color: ${theme.Brown};
  transition: all 0.2s ease;
  &:focus {
    box-shadow: 0 0.2rem 0.3rem black;
  }
`

export const SaveButton = styled.button`
  width: 8rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0.2rem;
  color: ${theme.LightPink};
  box-shadow: 0 0.2rem 0.2rem black;
  svg {
    height: 1.5rem;
    width: 1.5rem;
    path {
      fill: ${theme.LightPink};
    }
  }
`
