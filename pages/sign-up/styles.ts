import { media } from "@styles/media";
import { pinkFocusStyles, sectionHeightStyles } from "@styles/sharedStyles";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";

export const SignSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0;
  ${media.tablet} {
    margin: 3rem 0;
  }
  ${sectionHeightStyles}
`;

export const SignTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  color: ${theme.Pink};
  ${media.tablet} {
    font-size: 5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  div:first-of-type {
    label {
      margin-top: 1rem;
      ${media.custom(360)} {
        margin-top: 0;
      }
      ${media.tablet} {
        margin-top: 2rem;
      }
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
  color: ${theme.Pink};
  margin-top: 3rem;
  ${media.custom(360)} {
    margin-top: 4rem;
  }
  ${media.tablet} {
    font-size: 2.5rem;
    margin-top: 10rem;
  }
`;

export const Input = styled.input`
  border-radius: 0.2rem;
  border: 0;
  background-color: ${theme.LightPink};
  padding-left: 1rem;
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

export const SwitchText = styled.p`
  color: ${theme.LightPink};
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1.5rem;
  ${media.custom(360)} {
    margin-top: 2rem;
  }
  ${media.tablet} {
    font-size: 1.5rem;
    margin-top: 4rem;
  }
  ${media.desktop} {
    font-size: 1.8rem;
    margin-top: 4rem;
  }
`;

export const SwitchLink = styled.a`
  color: white;
  font-weight: 600;
  text-decoration: underline;
  font-size: 1.1rem;
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 1.7rem;
  }
`;

export const SubmitButton = styled.button`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${theme.Brown};
  background-color: ${theme.LightPink};
  border-radius: 0.2rem;
  border: 0;
  padding: 1rem 3rem;
  margin-top: 5rem;
  box-shadow: 0 0.1rem 0.4rem black;
  cursor: pointer;
  ${pinkFocusStyles}
  ${media.tablet} {
    font-size: 2.5rem;
    padding: 1.5rem 4rem;
    margin-top: 7rem;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0 0.3rem 0.4rem black;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0.1rem 0.4rem black;
    }
  }
`;

const formValidationStyles = css`
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 500;
  ${media.tablet} {
    margin-bottom: 0;
    margin-top: 1.5rem;
    font-size: 1.7rem;
  }
`;

export const FormError = styled.span`
  ${formValidationStyles}
  color: ${theme.DarkPink};
`;

export const FormValid = styled.span`
  ${formValidationStyles}
  color: ${theme.Green};
`;
