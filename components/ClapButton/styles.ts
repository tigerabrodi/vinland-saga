import { media } from '@styles/media'
import { darkFocusStyles, recipeDetailButtonStyles } from '@styles/sharedStyles'
import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const Button = styled.button<{ isDark?: boolean }>`
  ${recipeDetailButtonStyles}
  grid-area: clap;
  ${(props) =>
    props.isDark &&
    css`
      ${darkFocusStyles}
      color: ${theme.Brown};
      path {
        fill: ${theme.Brown};
      }
    `};
  ${media.desktop} {
    justify-self: flex-end;
  }
`
