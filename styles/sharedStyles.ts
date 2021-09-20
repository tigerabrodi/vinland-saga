import styled, { css } from "styled-components";
import { media } from "./media";
import { theme } from "./theme";

export const pinkFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge #ffbeba;
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const yellowFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge ${theme.Yellow};
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const darkFocusStyles = css`
  &:focus-visible {
    outline: 0.2rem ridge ${theme.Brown};
    outline-offset: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const sectionHeightStyles = css`
  min-height: calc(100vh - 13rem);
  ${media.tablet} {
    min-height: calc(100vh - 17rem);
  }
  ${media.desktop} {
    min-height: calc(100vh - 18rem);
  }
`;

export const AssistiveTechnologyOnly = css`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const formGroupStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  ${formGroupStyles}
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
  color: ${theme.Pink};
  margin-top: 4rem;
  ${media.tablet} {
    font-size: 2.5rem;
    margin-top: 8rem;
  }
`;

export const formInputStyles = `
  border-radius: 0.2rem;
  border: 0;
  background-color: ${theme.LightPink};
  padding-left: 0.5rem;
  color: ${theme.Brown};
  font-weight: 500;
  transition: all 0.2s ease;
  width: 23rem;
  height: 2.5rem;
  margin-top: 1rem;
  &:focus {
    box-shadow: 0 0.2rem 0.5rem black;
    outline: 0;
  }
  &::placeholder {
    opacity: 0.5;
    color: ${theme.Brown};
  }
  ${media.custom(360)} {
    margin-top: 1.5rem;
  }
  ${media.tablet} {
    width: 39rem;
    height: 3.5rem;
    margin-top: 2rem;
    font-size: 1.8rem;
  }
  ${media.desktop} {
    width: 55rem;
    height: 4rem;
  }
`;

export const Input = styled.input`
  ${formInputStyles}
`;
