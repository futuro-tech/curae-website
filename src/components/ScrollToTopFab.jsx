import { useEffect, useState } from 'react'

export default function ScrollToTopFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 90,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: 'none',
        background: '#0D1B2A',
        color: '#FAFAFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 16px rgba(13,27,42,0.25)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(8px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.2s, transform 0.2s, background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1a2f45' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#0D1B2A' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
