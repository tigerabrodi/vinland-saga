import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const Text = styled.p`
  color: ${theme.Brown};
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 5rem;
`

const buttonStyles = css`
  background-color: ${theme.Brown};
  border-radius: 0.2rem;
  font-weight: 600;
  height: 4rem;
  width: 8.5rem;
  font-size: 2rem;
  box-shadow: 0 0.2rem 0.2rem black;
`

export const ConfirmButton = styled.button`
  ${buttonStyles}
  color: ${theme.Green};
`

export const CancelButton = styled.button`
  ${buttonStyles}
  color: ${theme.Pink};
`
