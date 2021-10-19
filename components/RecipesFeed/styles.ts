import { media } from '@styles/media'
import styled from 'styled-components'

export const RecipesList = styled.ul`
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
  }
`
