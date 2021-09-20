import { theme } from "@styles/theme";
import SpinnerSVG from "../../assets/spinner.svg";
import styled, { keyframes } from "styled-components";
import { useLoadingStore } from "@lib/store";
import { media } from "@styles/media";
import { sectionHeightStyles } from "@styles/sharedStyles";

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
  ${media.tablet} {
    margin-right: 2rem;
    margin-top: 5rem;
    height: 4rem;
    width: 4rem;
  }
`;

export const BigSpinner = styled(SpinnerSVG)`
  height: 10rem;
  width: 10rem;
  position: absolute;
  animation: ${spin} 0.6s linear infinite;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: ${theme.Pink};
  g {
    fill: ${theme.Pink};
  }
  ${media.tablet} {
    height: 15rem;
    width: 15rem;
  }
`;

export const BigSpinnerSection = styled.div`
  ${sectionHeightStyles}
`;

export const LoadingSpinner = () => {
  const { status } = useLoadingStore();
  return status === "loading" ? (
    <Spinner role="alert" aria-label="loading" />
  ) : null;
};

export const FullPageSpinner = () => (
  <BigSpinnerSection>
    <BigSpinner />
  </BigSpinnerSection>
);
