import { theme } from "@styles/theme";
import ExternalSVG from "../../assets/external.svg";
import styled from "styled-components";
import { media } from "@styles/media";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 6rem;
  border-top: solid 0.2rem ${theme.Pink};
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.tablet} {
    height: 9rem;
  }
`;

export const FooterText = styled.p`
  font-weight: 500;
  font-size: 1.3rem;
  color: ${theme.Pink};
  ${media.tablet} {
    font-size: 1.8rem;
  }
`;

export const FooterLink = styled.a`
  position: relative;
  color: ${theme.LightPink};
  text-decoration: underline;
`;

export const External = styled(ExternalSVG)`
  position: absolute;
  top: -1.2rem;
  right: -1rem;
  height: 1.2rem;
  width: 1.2rem;
  ${media.tablet} {
    top: -1.8rem;
    right: -1.4rem;
    height: 1.7rem;
    width: 1.7rem;
  }
`;
