import { css } from "styled-components";
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

export const sectionStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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

export const heightSectionStyles = css`
  width: 100%;
  min-height: calc(100vh - 13rem);
  ${media.tablet} {
    min-height: calc(100vh - 17rem);
  }
  ${media.desktop} {
    min-height: calc(100vh - 18rem);
  }
`;
