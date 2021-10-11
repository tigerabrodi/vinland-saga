import { media } from '@styles/media'
import { theme } from '@styles/theme'
import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  row-gap: 2rem;
  margin-bottom: 4rem;
  ${media.tablet} {
    row-gap: 3rem;
    margin-bottom: 8rem;
  }
`

export const Label = styled.label`
  font-weight: 600;
  font-size: 1.8rem;
  color: ${theme.Yellow};
  ${media.tablet} {
    font-size: 2.8rem;
  }
  ${media.desktop} {
    font-size: 3rem;
  }
`

export const Textarea = styled.textarea`
  width: 27rem;
  height: 10.5rem;
  border-radius: 0.2rem;
  background-color: ${theme.Yellow};
  color: ${theme.Brown};
  padding-top: 1rem;
  padding-left: 1rem;
  margin-top: 1rem;
  transition: all 0.2s ease;
  &:focus {
    box-shadow: 0 0.2rem 0.5rem black;
  }
  ${media.tablet} {
    width: 45rem;
    height: 14rem;
    font-size: 1.7rem;
  }
  ${media.desktop} {
    width: 60rem;
    height: 17rem;
    font-size: 2rem;
    margin-top: 0;
  }
`

export const PostButton = styled.button`
  font-weight: 600;
  width: 8rem;
  height: 3.8rem;
  background-color: ${theme.Yellow};
  box-shadow: 0 0.2rem 0.2rem black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0.2rem;
  color: ${theme.Brown};
  svg {
    height: 1.5rem;
    width: 1.5rem;
    ${media.tablet} {
      height: 2rem;
      width: 2rem;
    }
    path {
      fill: ${theme.Brown};
    }
    ${media.desktop} {
      height: 2.4rem;
      width: 2.4rem;
    }
  }
  ${media.tablet} {
    width: 11rem;
    height: 5rem;
    font-size: 1.8rem;
    transition: all 0.2s ease;
    &:not(:disabled) {
      &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 0.4rem 0.4rem black;
      }
      &:active {
        transform: translateY(0);
        box-shadow: 0 0.2rem 0.2rem black;
      }
    }
  }
  ${media.desktop} {
    width: 13rem;
    height: 6rem;
    font-size: 2.2rem;
  }
`
