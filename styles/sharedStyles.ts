import { css } from 'styled-components'

export const baseSectionStyles = css`
  width: 100%;
  min-height: 100%;
`

export const sectionStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${baseSectionStyles}
`

export const AssistiveTechnologyOnly = css`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`
