import { AssistiveTechnologyOnly, sectionStyles } from '@styles/sharedStyles'
import { formGroupStyles, formInputStyles } from '@styles/formStyles'
import { theme } from '@styles/theme'
import styled from 'styled-components'
import { media } from '@styles/media'
import { darkFocusStyles, pinkFocusStyles } from '@styles/focusStyles'

export const EditForm = styled.form`
  ${sectionStyles}
  margin: 3rem 0;
  ${media.tablet} {
    margin: 5rem 0;
  }
`

export const EditWrapper = styled.div`
  width: 25rem;
  height: 29rem;
  background-color: ${theme.LightPink};
  border-radius: 0.2rem;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-areas: 'avatar avatar' 'progress progress' 'inputUpload inputUpload' 'editTitle cancelButton' 'uploadText uploadText';
  ${media.tablet} {
    width: 47rem;
    height: 44rem;
  }
  ${media.desktop} {
    width: 55rem;
    height: 50rem;
  }
`

// Heading should come first due to accessibility, hence this hidden heading exists
export const HiddenEditTitle = styled.h1`
  ${AssistiveTechnologyOnly}
`

export const Avatar = styled.img`
  grid-area: avatar;
  height: 13.5rem;
  width: 13.5rem;
  border-radius: 50%;
  background-color: ${theme.Brown};
  padding: 0.5rem;
  ${media.tablet} {
    height: 22rem;
    width: 22rem;
  }
  ${media.desktop} {
    height: 26rem;
    width: 26rem;
  }
`

export const UploadLabel = styled.label`
  grid-area: inputUpload;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.2rem 0.2rem black;
  cursor: pointer;
  color: ${theme.LightPink};
  background-color: ${theme.Brown};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.4rem;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  ${media.tablet} {
    font-size: 2rem;
    padding: 1.2rem 1.6rem;
    margin-bottom: 0;
    &:hover {
      box-shadow: 0 0.4rem 0.3rem black;
      transform: translateY(-0.3rem);
    }
    &:active {
      box-shadow: 0 0.2rem 0.2rem black;
      transform: translateY(0);
    }
  }
  ${media.desktop} {
    padding: 1.4rem 2.2rem;
  }

  svg {
    height: 1.8rem;
    width: 1.8rem;
    fill: ${theme.LightPink};
    margin-left: 1rem;
    ${media.tablet} {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`

export const UploadProgress = styled.span`
  grid-area: progress;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${theme.Brown};
  ${media.tablet} {
    font-size: 1.6rem;
  }
  ${media.desktop} {
    font-size: 1.8rem;
  }
`

export const UploadInput = styled.input`
  ${AssistiveTechnologyOnly}
  &:focus + label {
    box-shadow: 0 0.3rem 1rem black;
  }
`

export const VisibleTitle = styled.h1`
  grid-area: editTitle;
  font-weight: bold;
  font-size: 1.6rem;
  color: ${theme.Brown};
  justify-self: flex-end;
  margin-right: 1rem;
  ${media.tablet} {
    font-size: 2.1rem;
  }
  ${media.desktop} {
    font-size: 2.3rem;
  }
`

export const CancelLink = styled.a`
  grid-area: cancelButton;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.2rem;
  background-color: ${theme.Brown};
  box-shadow: 0 0.2rem 0.4rem black;
  justify-self: flex-start;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  ${darkFocusStyles}
  ${media.tablet} {
    height: 4rem;
    width: 4rem;
    &:hover {
      box-shadow: 0 0.4rem 0.4rem black;
      transform: translateY(-0.1rem);
    }
    &:active {
      box-shadow: 0 0.2rem 0.4rem black;
      transform: translateY(0);
    }
  }
  ${media.desktop} {
    height: 4.5rem;
    width: 4.5rem;
  }
  svg {
    height: 1.8rem;
    width: 1.8rem;
    ${media.tablet} {
      height: 2.2rem;
      width: 2.2rem;
    }
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 5rem;
  column-gap: 4rem;
  ${media.tablet} {
    margin-top: 10rem;
    column-gap: 10rem;
  }
  ${media.desktop} {
    column-gap: 12rem;
  }
`

export const ButtonSave = styled.button`
  color: ${theme.Brown};
  font-weight: 600;
  background-color: ${theme.Pink};
  font-size: 1.2rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 7.3rem;
  height: 3.3rem;
  box-shadow: 0 0.2rem 0.4rem black;
  transition: all ease 0.2s;
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 2rem;
    height: 5rem;
    width: 11rem;
    &:not(:disabled) {
      &:hover {
        box-shadow: 0 0.4rem 0.4rem black;
        transform: translateY(-0.3rem);
      }
    }
  }
  ${media.desktop} {
    height: 5.5rem;
    font-size: 2.2rem;
    width: 12rem;
  }
  svg {
    fill: ${theme.Brown};
    height: 2rem;
    width: 2rem;
    ${media.desktop} {
      height: 3rem;
      width: 3rem;
    }
  }
`

export const LinkCancel = styled.a`
  color: ${theme.Pink};
  font-size: 1.2rem;
  font-weight: 600;
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 2rem;
    transition: all ease 0.2s;
    &:hover {
      filter: brightness(120%);
      transform: translateY(-0.2rem);
    }
  }
  ${media.desktop} {
    font-size: 2.2rem;
  }
`

export const Input = styled.input`
  ${formInputStyles}
  margin-top: 2rem;
  ${media.tablet} {
    width: 47rem;
  }
  ${media.desktop} {
    width: 55rem;
  }
`

export const Textarea = styled.textarea`
  ${formInputStyles}
  padding-top: 0.5rem;
  height: 6.5rem;
  font-size: 1.2rem;
  margin-top: 2rem;
  ${media.tablet} {
    width: 47rem;
    height: 13rem;
  }
  ${media.desktop} {
    width: 55rem;
  }
`

export const AgeInput = styled.input`
  ${formInputStyles}
  width: 5rem;
  text-align: center;
  padding-left: 0;
  ${media.tablet} {
    width: 7rem;
  }
`

export const AgeFormGroup = styled.div`
  ${formGroupStyles}
  margin-right: 18rem;
  ${media.tablet} {
    margin-right: 40rem;
  }
  ${media.desktop} {
    margin-right: 48.2rem;
  }
`
