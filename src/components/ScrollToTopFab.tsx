import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { tokens } from './styled'

const Fab = styled.button<{ $visible: boolean }>`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 90;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: ${tokens.navy};
  color: ${tokens.offWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(13,27,42,0.25);
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(8px)'};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  transition: opacity 0.2s, transform 0.2s, background 0.15s;

  &:hover {
    background: ${tokens.hoverNavy};
  }
`

export default function ScrollToTopFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Fab onClick={scrollToTop} aria-label="Voltar ao topo" $visible={visible}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </Fab>
  )
}
