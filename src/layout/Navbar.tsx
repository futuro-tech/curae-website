import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import CuraeLogo from '../components/CuraeLogo'
import { useLang } from '../context/LangContext'
import { tokens } from '../components/styled'

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: var(--nav-h);
  background: rgba(250, 250, 250, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 0.5px solid ${tokens.border};
  box-shadow: ${props => props.$scrolled ? '0 1px 12px rgba(13,27,42,0.06)' : 'none'};
  transition: box-shadow 0.2s;
`

const NavInner = styled.div`
  max-width: 1244px;
  margin: 0 auto;
  padding: 0 var(--section-px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavDesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  position: relative;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${tokens.text};
  line-height: 21px;
  transition: color 0.15s;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 1px;
    background: ${tokens.navy};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: ${tokens.navy};
  }

  &:hover::after {
    transform: scaleX(1);
  }
`

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 4px;
  background: ${tokens.navy};
  color: ${tokens.offWhite};
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 22.5px;
  white-space: nowrap;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;

  &:hover {
    background: ${tokens.hoverNavy};
    transform: scale(1.04);
    box-shadow: 0 6px 16px rgba(13,27,42,0.18);
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;

  @media (max-width: 768px) {
    display: flex;
  }
`

const HamburgerBar = styled.span<{ $menuOpen: boolean; $index: number }>`
  display: block;
  width: 22px;
  height: 2px;
  background: ${tokens.navy};
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
  transform: ${props => {
    if (!props.$menuOpen) return 'none'
    if (props.$index === 1) return 'scaleX(0)'
    return props.$index === 0 ? 'translateY(7px) rotate(45deg)' : 'translateY(-7px) rotate(-45deg)'
  }};
  opacity: ${props => (props.$menuOpen && props.$index === 1) ? 0 : 1};
`

const MobileMenu = styled.div`
  position: absolute;
  top: var(--nav-h);
  left: 0;
  right: 0;
  background: rgba(250,250,250,0.98);
  backdrop-filter: blur(8px);
  border-bottom: 0.5px solid ${tokens.border};
  padding: 24px var(--section-px);
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MobileLink = styled.a`
  font-size: 16px;
  color: ${tokens.text};
  font-weight: 400;
`

const MobileCTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 4px;
  background: ${tokens.navy};
  color: ${tokens.offWhite};
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
`

const LangToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const LangItem = styled.span`
  display: flex;
  align-items: center;
`

const LangSeparator = styled.span<{ $dark: boolean }>`
  color: ${props => props.$dark ? 'rgba(255,255,255,0.2)' : tokens.border};
  font-size: 11px;
  margin: 0 2px;
`

const LangButton = styled.button<{ $active: boolean; $dark: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  padding: 2px 5px;
  transition: color 0.15s;
  font-weight: ${props => props.$active ? 600 : 400};
  color: ${props => {
    if (props.$active) return props.$dark ? tokens.offWhite : tokens.navy
    return props.$dark ? 'rgba(255,255,255,0.35)' : tokens.muted
  }};
`

interface NavLinkItem {
  label: string
  href: string
}

interface LangToggleProps {
  lang: string
  setLang: (l: 'pt' | 'en') => void
  dark: boolean
}

function LangToggle({ lang, setLang, dark }: LangToggleProps) {
  return (
    <LangToggleWrapper>
      {['pt', 'en'].map((l, i) => (
        <LangItem key={l}>
          {i > 0 && <LangSeparator $dark={dark}>|</LangSeparator>}
          <LangButton onClick={() => setLang(l as 'pt' | 'en')} $active={lang === l} $dark={dark}>
            {l.toUpperCase()}
          </LangButton>
        </LangItem>
      ))}
    </LangToggleWrapper>
  )
}

function resolveTo(href: string, isHome: boolean) {
  if (href.startsWith('#')) return isHome ? href : `/${href}`
  return href
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()
  const { NAV } = t
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        <Link to="/" aria-label="Curae">
          <CuraeLogo variant="dark" />
        </Link>

        <NavDesktopLinks>
          {NAV.links.map((link: NavLinkItem) => {
            const to = resolveTo(link.href, isHome)
            return to.startsWith('#') ? (
              <NavLink key={link.label} as="a" href={to}>{link.label}</NavLink>
            ) : (
              <NavLink key={link.label} as={Link} to={to}>{link.label}</NavLink>
            )
          })}
        </NavDesktopLinks>

        <RightGroup>
          <LangToggle lang={lang} setLang={setLang} dark={false} />

          <CTAButton href={t.CTA_CONTENT.button.href} target="_blank" rel="noopener noreferrer">
            {NAV.cta}
          </CTAButton>

          <Hamburger onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {[0, 1, 2].map(i => (
              <HamburgerBar key={i} $menuOpen={menuOpen} $index={i} />
            ))}
          </Hamburger>
        </RightGroup>
      </NavInner>

      {menuOpen && (
        <MobileMenu>
          {NAV.links.map((link: NavLinkItem) => {
            const to = resolveTo(link.href, isHome)
            return to.startsWith('#') ? (
              <MobileLink key={link.label} as="a" href={to} onClick={() => setMenuOpen(false)}>{link.label}</MobileLink>
            ) : (
              <MobileLink key={link.label} as={Link} to={to} onClick={() => setMenuOpen(false)}>{link.label}</MobileLink>
            )
          })}
          <MobileCTAButton
            href={t.CTA_CONTENT.button.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {NAV.cta}
          </MobileCTAButton>
          <LangToggle lang={lang} setLang={setLang} dark={false} />
        </MobileMenu>
      )}
    </Nav>
  )
}
