import { media } from '@styles/media'
import { recipeDetailButtonStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const Button = styled.button<{ isDark?: boolean }>`
  ${recipeDetailButtonStyles}
  grid-area: clap;
  ${(props) =>
    props.isDark &&
    css`
      path {
        fill: ${theme.Brown};
      }
    `};
  ${media.desktop} {
    justify-self: flex-end;
  }
`
