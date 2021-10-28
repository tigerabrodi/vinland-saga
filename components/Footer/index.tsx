import Link from 'next/link'
import { FooterContainer, FooterLink, FooterText } from './styles'
import ExternalSVG from '../../assets/external.svg'

export const Footer = () => (
  <FooterContainer>
    <FooterText>
      Built and designed by{' '}
      <Link passHref href="https://github.com/tigerabrodi">
        <FooterLink target="_blank" rel="noopener noreferrer">
          Tiger Abrodi <ExternalSVG aria-hidden="true" />{' '}
        </FooterLink>
      </Link>
    </FooterText>
  </FooterContainer>
)
