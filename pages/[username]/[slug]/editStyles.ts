import {
  darkFocusStyles,
  AssistiveTechnologyOnly,
  heightSectionStyles,
  yellowFocusStyles,
} from "@styles/sharedStyles";
import { theme } from "@styles/theme";
import ImagesSVG from "../../../assets/images.svg";
import EyeSVG from "../../../assets/eye.svg";
import RocketSVG from "../../../assets/rocket.svg";
import styled, { css } from "styled-components";

const formGroupStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const RecipeEditForm = styled.form`
  ${heightSectionStyles}
  display: grid;
  grid-template-areas: "heading" "title" "image" "upload" "body" "text" "buttons";
  align-items: center;
  justify-items: flex-start;
  grid-template-columns: 23.5rem;
`;

export const Heading = styled.h1`
  grid-area: title;
  font-weight: bold;
  color: ${theme.Pink};
  text-decoration: underline;
  font-size: 2.6rem;
`;

export const TitleFormGroup = styled.div`
  ${formGroupStyles}
  grid-area: title;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 1.8rem;
  color: ${theme.Pink};
`;

export const Input = styled.input`
  width: 23rem;
  height: 3.4rem;
  border-radius: 0.2rem;
  background-color: ${theme.LightPink};
  font-weight: 500;
  font-size: 1.8rem;
  color: ${theme.Brown};
  padding-left: 0.7rem;
  transition: 0.2s all ease;
  &::placeholder {
    color: ${theme.Brown};
    opacity: 0.6;
  }

  &:focus {
    box-shadow: 0 0.2rem 0.2rem black;
  }
`;

export const Image = styled.img`
  grid-area: image;
  width: 23rem;
  height: 10.5rem;
  border-radius: 0.2rem;
`;

export const FileInput = styled.input`
  ${AssistiveTechnologyOnly}
  &:focus + label {
    outline: 0.2rem ridge #ffbeba;
    outline-offset: 0.3rem;
  }
`;

export const UploadLabel = styled.label`
  grid-area: upload;
  width: 4.5rem;
  height: 4rem;
  background-color: ${theme.Pink};
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageIcon = styled(ImagesSVG)`
  height: 2.4rem;
  width: 2.4rem;
`;

export const BodyFormGroup = styled.div`
  ${formGroupStyles}
  grid-area: body;
`;

export const Textarea = styled.textarea`
  width: 23rem;
  height: 10rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${theme.Brown};
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  transition: 0.2s all ease;
  &::placeholder {
    opacity: 0.6;
    color: ${theme.Brown};
  }
  &:focus {
    box-shadow: 0 0.2rem 0.2rem black;
  }
`;

export const Text = styled.p`
  text-align: center;
  grid-area: text;
  font-weight: 400;
  font-size: 1rem;
  color: ${theme.Yellow};
  justify-self: center;
`;

export const TextLink = styled.a`
  color: ${theme.LightPink};
  text-decoration: underline;
  ${yellowFocusStyles}
`;

export const ButtonWrapper = styled.div`
  grid-area: buttons;
  width: 23rem;
  height: 5.5rem;
  background-color: ${theme.Pink};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0.2rem;
`;

const buttonStyles = css`
  width: 8rem;
  height: 3rem;
  background-color: ${theme.Brown};
  box-shadow: 0 0.2rem 0.4rem black;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${darkFocusStyles}
`;

export const ButtonSave = styled.button`
  ${buttonStyles}
  color: ${theme.Pink};
`;

export const Rocket = styled(RocketSVG)`
  height: 1.2rem;
  width: 1.2rem;
`;

export const Eye = styled(EyeSVG)`
  height: 1.2rem;
  width: 1.2rem;
`;

export const ButtonPreview = styled.button`
  ${buttonStyles}
  color: ${theme.Yellow};
`;
