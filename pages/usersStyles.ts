import { media } from '@styles/media'
import styled from 'styled-components'

export const List = styled.ol`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  row-gap: 2rem;
  width: 100%;
  ${media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 3rem;
  }
  ${media.desktop} {
    margin-top: 4rem;
    justify-content: flex-start;
  }
`
