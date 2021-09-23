import { theme } from "@styles/theme";
import SpinnerSVG from "../../assets/spinner.svg";
import styled, { keyframes } from "styled-components";
import { useLoadingStore } from "@lib/store";
import { media } from "@styles/media";
import { sectionStyles } from "@styles/sharedStyles";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
  background-color: ${theme.Brown};
  box-shadow: 0 0.2rem 0.2rem black;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  height: 3.5rem;
  width: 3.5rem;
  box-shadow: 0 0.1rem 0.4rem black;
  z-index: 100;
  ${media.tablet} {
    margin-top: 2rem;
    margin-right: 2.5rem;
    height: 5.5rem;
    width: 5.5rem;
  }
`;

const Spinner = styled(SpinnerSVG)`
  width: 70%;
  height: 70%;
  animation: ${spin} 0.5s linear infinite;
  fill: ${theme.Pink};
  g {
    fill: ${theme.Pink};
  }
`;

const BigSpinner = styled(SpinnerSVG)`
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
  ${sectionStyles}
`;

export const LoadingSpinner = () => {
  const { status } = useLoadingStore();
  return status === "loading" ? (
    <SpinnerWrapper role="alert" aria-label="loading">
      <Spinner />
    </SpinnerWrapper>
  ) : null;
};

export const FullPageSpinner = () => (
  <BigSpinnerSection>
    <BigSpinner />
  </BigSpinnerSection>
);
