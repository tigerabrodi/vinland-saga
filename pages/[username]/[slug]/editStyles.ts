import {
  AssistiveTechnologyOnly,
  heightSectionStyles,
} from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import ImagesSVG from '../../../assets/images.svg'
import styled, { css } from 'styled-components'
import { media } from '@styles/media'
import { darkFocusStyles, yellowFocusStyles } from '@styles/focusStyles'

const formGroupStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`

export const RecipeEditWrapper = styled.div`
  ${heightSectionStyles}
  display: grid;
  grid-template-areas: 'heading' 'title' 'image' 'upload' 'body' 'text' 'buttons';
  align-items: center;
  justify-items: center;
  width: 23.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  ${media.tablet} {
    width: 45rem;
  }
  ${media.desktop} {
    width: 65rem;
    margin-top: 3rem;
    margin-bottom: 4rem;
  }
`

export const Heading = styled.h1`
  grid-area: heading;
  font-weight: bold;
  color: ${theme.Pink};
  text-decoration: underline;
  font-size: 2.6rem;
  ${media.tablet} {
    font-size: 5rem;
  }
  ${media.desktop} {
    font-size: 6rem;
  }
`

export const TitleFormGroup = styled.div`
  ${formGroupStyles}
  grid-area: title;
  margin-top: 2rem;
  ${media.tablet} {
    margin-top: 4rem;
  }
`

export const Label = styled.label`
  font-weight: 600;
  font-size: 1.8rem;
  color: ${theme.Pink};
  ${media.tablet} {
    font-size: 3rem;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 3.4rem;
  border-radius: 0.2rem;
  background-color: ${theme.Pink};
  font-weight: 500;
  font-size: 1.8rem;
  color: ${theme.Brown};
  padding-left: 0.7rem;
  transition: 0.2s all ease;
  margin-top: 1.5rem;
  ${media.tablet} {
    height: 5rem;
    font-size: 2.3rem;
    padding-left: 1rem;
    margin-top: 2rem;
  }
  ${media.desktop} {
    font-size: 2.5rem;
    height: 5.2rem;
  }
`

export const Image = styled.img`
  grid-area: image;
  width: 100%;
  height: auto;
  margin-top: 4rem;
  border-radius: 0.2rem;
`

export const FileInput = styled.input`
  ${AssistiveTechnologyOnly}
  &:focus + label {
    outline: 0.2rem ridge #ffbeba;
    outline-offset: 0.3rem;
  }
`

export const UploadLabel = styled.label`
  grid-area: upload;
  width: 4.5rem;
  height: 4rem;
  background-color: ${theme.Pink};
  border-radius: 0.2rem;
  justify-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  ${media.tablet} {
    cursor: pointer;
    width: 6.5rem;
    height: 5rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.2rem 0.2rem black;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 0.1rem 0.1rem black;
    }
  }
  ${media.desktop} {
    width: 8rem;
    height: 6rem;
  }
`

export const ImageIcon = styled(ImagesSVG)`
  height: 2.4rem;
  width: 2.4rem;
  ${media.tablet} {
    height: 3rem;
    width: 3rem;
  }
  ${media.desktop} {
    width: 3.5rem;
    height: 3.5rem;
  }
`

export const BodyFormGroup = styled.div`
  ${formGroupStyles}
  grid-area: body;
  margin-top: 6rem;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 10rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${theme.Brown};
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  transition: 0.2s all ease;
  margin-top: 1.5rem;
  border: 0;
  background-color: ${theme.Pink};
  ${media.tablet} {
    height: 15rem;
    font-size: 2rem;
    padding-top: 1.5rem;
    padding-left: 1.5rem;
    margin-top: 2rem;
  }
  ${media.desktop} {
    height: 30rem;
    font-size: 2.5rem;
    margin-top: 3rem;
  }
`

export const Text = styled.p`
  text-align: center;
  grid-area: text;
  font-weight: 400;
  font-size: 1rem;
  color: ${theme.Yellow};
  justify-self: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
  width: 31ch;
  ${media.tablet} {
    font-size: 1.5rem;
    width: 44ch;
    margin-top: 2rem;
    margin-bottom: 6rem;
  }
  ${media.desktop} {
    font-size: 2rem;
    line-height: 1.5;
  }
`

export const TextLink = styled.a`
  color: ${theme.LightYellow};
  text-decoration: underline;
  ${yellowFocusStyles}
`

export const ButtonWrapper = styled.div`
  grid-area: buttons;
  width: 100%;
  height: 5.5rem;
  background-color: ${theme.Pink};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0.2rem;
  width: 23.5rem;
  ${media.tablet} {
    height: 10rem;
    width: 45rem;
  }
  ${media.desktop} {
    height: 12rem;
    width: 65rem;
  }
`

const buttonStyles = css`
  width: 8rem;
  height: 3rem;
  background-color: ${theme.Brown};
  box-shadow: 0 0.2rem 0.4rem black;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${darkFocusStyles}
  svg {
    height: 1.2rem;
    width: 1.2rem;
  }
  ${media.tablet} {
    width: 13rem;
    height: 5rem;
    font-size: 2rem;
    transition: all 0.1s ease-in;
    &:not(:disabled) {
      &:hover {
        transform: translateY(-0.4rem);
        box-shadow: 0 0.5rem 0.4rem black;
      }
      &:active {
        transform: translateY(0);
        box-shadow: 0 0.2rem 0.4rem black;
      }
    }
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
  ${media.desktop} {
    width: 15rem;
    height: 6.5rem;
    font-size: 2.5rem;
    svg {
      height: 2.7rem;
      width: 2.7rem;
    }
  }
`

export const ButtonSave = styled.button`
  ${buttonStyles}
  color: ${theme.Pink};
`

export const ButtonPreview = styled.button`
  ${buttonStyles}
  color: ${theme.Yellow};
`
