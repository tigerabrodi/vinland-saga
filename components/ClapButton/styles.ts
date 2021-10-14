import { darkFocusStyles } from '@styles/focusStyles'
import { media } from '@styles/media'
import { recipeDetailButtonStyles } from '@styles/buttonStyles'
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
