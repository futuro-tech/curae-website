import styled from 'styled-components'
import { Section, Card, Grid, tokens } from './primitives'

// Seção com hero layout
export const HeroSection = styled(Section).attrs({ bg: 'offWhite', spacing: 'lg' })`
  display: flex;
  align-items: center;
  justify-content: center;
`

// Seção com conteúdo centralizado
export const CenteredSection = styled(Section).attrs({ spacing: 'lg' })`
  text-align: center;
`

// Grid de cards
export const CardGrid = styled(Grid).attrs({ cols: 3, gap: 'lg' })`
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

// Highlight em heading
export const HighlightSpan = styled.span`
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: ${tokens.teal};
  text-underline-offset: 8px;
`

// Footer
export const Footer = styled.footer`
  background: ${tokens.footerBg};
  color: white;
  padding: clamp(48px, 6vw, 80px) var(--section-px);
  margin-top: auto;

  p {
    font-size: 14px;
    opacity: 0.6;
  }
`

// Navbar
export const NavBar = styled.nav`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: ${tokens.navHeight};
  background: rgba(250, 250, 250, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 0.5px solid ${tokens.border};
  transition: box-shadow 0.2s;

  &.scrolled {
    box-shadow: 0 1px 12px rgba(13, 27, 42, 0.06);
  }
`

// Modal/Overlay
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  @supports (backdrop-filter: blur(4px)) {
    background: rgba(13, 27, 42, 0.4);
    backdrop-filter: blur(4px);
  }
`

// Badge
export const Badge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: ${tokens.tealbg};
  color: ${tokens.teal};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

// Hover lift card (for benefits, products, etc)
export const HoverLiftCard = styled(Card)`
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(13, 27, 42, 0.1);
  }
`
