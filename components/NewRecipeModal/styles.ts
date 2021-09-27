import { darkFocusStyles } from "@styles/sharedStyles";
import { theme } from "@styles/theme";
import CloseSVG from "../../assets/close.svg";
import styled from "styled-components";

export const Modal = styled.div`
  width: 30rem;
  height: 23rem;
  border-radius: 0.2rem;
  background-color: ${theme.Pink};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  opacity: 0.6;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: ${theme.Brown};
  text-decoration: underline;
`;

export const CloseButton = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1.5rem;
  background-color: transparent;
  margin-right: 1.5rem;
  ${darkFocusStyles}
`;

export const Close = styled(CloseSVG)`
  height: 100%;
  width: 100%;
  path {
    fill: ${theme.Brown};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 1.8rem;
  color: ${theme.Brown};
`;

export const Input = styled.input`
  width: 21rem;
  height: 3rem;
  border-radius: 0.2rem;
  background-color: ${theme.Brown};
  color: ${theme.Pink};
  padding-left: 0.5rem;
  margin-top: 1.3rem;
  transition: all 0.2s ease;
  &::placeholder {
    color: ${theme.Pink};
    opacity: 0.7;
  }
  &:focus {
    box-shadow: 0 0.2rem 0.4rem black;
  }
`;

export const CreateButton = styled.button`
  padding: 1 2rem;
  border-radius: 0.2rem;
  background-color: ${theme.Brown};
  color: ${theme.Pink};
  box-shadow: 0 0.2rem 0.2rem black;
  font-size: 1.6rem;
  font-weight: 500;
  width: 8.2rem;
  height: 3.3rem;
  margin-top: 5rem;
  ${darkFocusStyles}
`;
