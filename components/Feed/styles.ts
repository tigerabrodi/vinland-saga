import { media } from '@styles/media'
import { AssistiveTechnologyOnly, sectionStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled from 'styled-components'

export const FeedContainer = styled.div`
  ${sectionStyles}
  justify-content: flex-start;
  width: 28rem;
  margin-bottom: 2rem;
  ${media.tablet} {
    width: 65rem;
  }
  ${media.desktop} {
    width: 80%;
  }
`

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
`

export const Title = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  color: ${theme.Pink};
  ${media.tablet} {
    font-size: 4rem;
  }
  ${media.desktop} {
    font-size: 5rem;
  }
`

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 2rem;
  ${media.tablet} {
    column-gap: 7rem;
  }
  ${media.desktop} {
    column-gap: 10rem;
  }
`

export const RadioLabel = styled.label`
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  cursor: pointer;
  ${media.tablet} {
    font-size: 2.3rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
    }
  }
  ${media.desktop} {
    font-size: 3rem;
  }
`

export const NoFoundText = styled.p`
  font-size: 2rem;
  color: ${theme.Pink};
  font-weight: 500;
  margin-top: 12rem;
  ${media.tablet} {
    margin-top: 22rem;
    font-size: 3rem;
  }
  ${media.desktop} {
    font-size: 4rem;
  }
`

export const RadioInput = styled.input`
  ${AssistiveTechnologyOnly}

  &:checked + label {
    transform: translateY(-0.2rem);
    text-decoration: underline;
    font-size: 1.5rem;
    ${media.tablet} {
      font-size: 2.7rem;
    }
    ${media.desktop} {
      font-size: 3.4rem;
    }
  }

  &:focus-visible + label {
    outline: 0.2rem ridge white;
    outline-offset: 0.3rem;
  }
`
