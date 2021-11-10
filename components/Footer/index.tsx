import { ExternalIcon } from '@icons/External'
import Link from 'next/link'
import { FooterContainer, FooterLink, FooterText } from './styles'

export const Footer = () => (
  <FooterContainer>
    <FooterText>
      Built and designed by{' '}
      <Link passHref href="https://github.com/tigerabrodi">
        <FooterLink target="_blank" rel="noopener noreferrer">
          Tiger Abrodi <ExternalIcon aria-hidden="true" />{' '}
        </FooterLink>
      </Link>
    </FooterText>
  </FooterContainer>
)
