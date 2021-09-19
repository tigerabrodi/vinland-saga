import {
  AssistiveTechnologyOnly,
  darkFocusStyles,
  sectionHeightStyles,
} from "@styles/sharedStyles";
import CancelSVG from "../../../assets/close.svg";
import FileUploadSVG from "../../../assets/file-upload.svg";
import { theme } from "@styles/theme";
import styled from "styled-components";

export const UserEditForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${sectionHeightStyles}
`;

export const UserEditWrapper = styled.div`
  width: 25rem;
  height: 29rem;
  background-color: ${theme.LightPink};
  border-radius: 0.2rem;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-areas: "avatar avatar" "inputUpload inputUpload" "editTitle cancelButton" "uploadText uploadText";
`;

// Heading should come first due to accessibility, hence this hidden heading exists
export const UserEditTitle = styled.h1`
  ${AssistiveTechnologyOnly}
`;

export const Avatar = styled.img`
  grid-area: avatar;
  height: 13.5rem;
  width: 13.5rem;
  border-radius: 50%;
  background-color: ${theme.Brown};
  padding: 0.5rem;
`;

export const UploadLabel = styled.label`
  grid-area: inputUpload;
  border-radius: 0.2rem;
  border: none;
  box-shadow: 0 0.2rem 0.2rem black;
  cursor: pointer;
  color: ${theme.LightPink};
  background-color: ${theme.Brown};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.4rem;
  font-size: 1.3rem;
  transition: all 0.2s ease;
`;

export const FileUpload = styled(FileUploadSVG)`
  height: 1.8rem;
  width: 1.8rem;
  fill: ${theme.LightPink};
  margin-left: 1rem;
`;

export const UploadInput = styled.input`
  ${AssistiveTechnologyOnly}
  &:focus + label {
    box-shadow: 0 0.3rem 1rem black;
  }
`;

export const UserEditVisibleTitle = styled.h1`
  grid-area: editTitle;
  font-weight: bold;
  font-size: 1.6rem;
  color: ${theme.Brown};
  justify-self: flex-end;
  margin-right: 1rem;
`;

export const CancelButton = styled.button`
  grid-area: cancelButton;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.2rem;
  border: 0;
  background-color: ${theme.Brown};
  box-shadow: 0 0.2rem 0.4rem black;
  justify-self: flex-start;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${darkFocusStyles}
`;

export const Cancel = styled(CancelSVG)`
  height: 1.8rem;
  width: 1.8rem;
`;
