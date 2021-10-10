import { media } from '@styles/media'
import { sectionStyles, whiteFocusStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const FeedSection = styled.div`
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

export const ToolBar = styled.div`
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

export const ToolBarButton = styled.button`
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  ${whiteFocusStyles}
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

export const RecipesList = styled.ul<{ recipesLength: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 3rem;
  margin-top: 2rem;
  ${media.tablet} {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  ${media.desktop} {
    margin-top: 3rem;
    column-gap: 2rem;
    ${(props) =>
      props.recipesLength < 4 &&
      css`
        justify-content: flex-start;
        column-gap: 4rem;
      `};
  }
`

export const NoFoundText = styled.p`
  font-size: 2rem;
  color: ${theme.Pink};
  font-weight: 500;
  margin-top: 12rem;
  ${media.tablet} {
    margin-top: 20rem;
    font-size: 3rem;
  }
  ${media.desktop} {
    font-size: 4rem;
  }
`
