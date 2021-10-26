import { theme } from '@styles/theme'
import styled, { css } from 'styled-components'

export const UsersList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  row-gap: 2rem;
  width: 100%;
`

export const UserItemWrapper = styled.li`
  display: grid;
  grid-template-areas:
    'avatar fullname recipesCount'
    'avatar username .'
    'avatar location clapsCount';
  align-items: center;
  justify-items: center;
  border: 0.2rem solid ${theme.Yellow};
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.2rem black;
  grid-template-rows: auto 1rem auto;
  width: 100%;
`

export const AvatarImage = styled.img`
  grid-area: avatar;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  margin: 1.3rem 0;
`

export const Fullname = styled.h2`
  grid-area: fullname;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${theme.Pink};
  justify-self: self-start;
  margin-left: 0.7rem;
  text-decoration: underline;
`

export const Username = styled.p`
  grid-area: username;
  font-weight: 500;
  font-size: 1.3rem;
  color: ${theme.Pink};
  justify-self: self-start;
  margin-left: 0.7rem;
`

export const Location = styled.p`
  grid-area: location;
  font-weight: 500;
  font-size: 1rem;
  color: ${theme.Pink};
  justify-self: self-start;
  margin-left: 0.7rem;
`

const countStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: ${theme.Pink};
  font-size: 1.2rem;
  column-gap: 0.5rem;
  svg {
    height: 2rem;
    width: 2rem;
    path {
      fill: ${theme.Pink};
    }
  }
`

export const RecipesCount = styled.p`
  ${countStyles};
  grid-area: recipesCount;
  position: relative;
  bottom: -0.3rem;
`

export const ClapsCount = styled.p`
  ${countStyles};
  grid-area: clapsCount;
`
