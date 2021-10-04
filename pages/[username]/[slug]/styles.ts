import { media } from '@styles/media'
import { sectionStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  ${sectionStyles}
  margin-bottom: 2rem;
`

export const CommentsHeading = styled.h2`
  font-weight: bold;
  font-size: 3.6rem;
  color: ${theme.LightPink};
  text-decoration: underline;
  margin: -2rem;
  ${media.tablet} {
    font-size: 6rem;
  }
`

export const NoCommentsText = styled.p`
  font-size: 1.7rem;
  text-align: center;
  color: ${theme.LightPink};
  font-weight: 500;
  margin-top: 4rem;
  ${media.tablet} {
    font-size: 2.5rem;
    margin-top: 5rem;
  }
`
