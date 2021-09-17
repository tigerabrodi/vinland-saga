import { theme } from "@styles/theme";
import SpinnerSVG from "../../assets/spinner.svg";
import styled, { keyframes } from "styled-components";
import { useLoadingStore } from "@lib/store";

const spin = keyframes`
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;

export const Spinner = styled(SpinnerSVG)`
  height: 2rem;
  width: 2rem;
  position: absolute;
  animation: ${spin} 0.5s linear infinite;
  top: 0;
  right: 0;
  fill: ${theme.Pink};
  margin-right: 1rem;
  margin-top: 2.7rem;
  g {
    fill: ${theme.Pink};
  }
`;

export const LoadingSpinner = () => {
  const { status } = useLoadingStore();
  return status === "loading" ? (
    <Spinner role="alert" aria-label="loading" />
  ) : null;
};
