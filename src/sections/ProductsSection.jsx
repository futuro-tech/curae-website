import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext'

function ContentPanel({ t, borderTop }) {
  return (
    <div style={{
      padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 56px)',
      borderRadius: borderTop ? '0 0 8px 8px' : 8,
      border: '0.5px solid #D1D9E0',
      borderTop: borderTop ? 'none' : '0.5px solid #D1D9E0',
      background: '#FFF',
    }}>
      <div style={{ marginBottom: 24 }}>
        <span style={{
          display: 'inline-flex', padding: '5px 12px', borderRadius: 2,
          background: '#E1F5EE',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 500,
          color: '#1A7A6E', letterSpacing: '0.8px', textTransform: 'uppercase',
        }}>
          {t.category}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(26px, 3.5vw, 40px)',
        fontStyle: 'italic', fontWeight: 400,
        lineHeight: 1.2, color: '#0D1B2A',
        maxWidth: 640, marginBottom: 20,
      }}>
        {t.heading}
      </h3>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15, fontWeight: 400,
        lineHeight: 1.7, color: '#4A5568',
        maxWidth: 620, marginBottom: 28,
      }}>
        {t.description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {t.bullets.map(b => (
          <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#1A7A6E', flexShrink: 0, marginTop: 8,
            }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, color: '#4A5568', lineHeight: 1.6,
            }}>
              {b}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductsSection() {
  const { t } = useLang()
  const PRODUCTS = t.PRODUCTS
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900)
  const itemRefs = useRef([])

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      const match = hash.replace('#produto-', '')
      const idx = PRODUCTS.findIndex(p => p.id === match)
      if (idx !== -1) setActiveIndex(idx)
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  function handleMobileClick(i) {
    const next = i === activeIndex ? -1 : i
    setActiveIndex(next)
    if (next !== -1) {
      setTimeout(() => {
        itemRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 50)
    }
  }

  const tab = PRODUCTS[activeIndex] ?? PRODUCTS[0]

  return (
    <section id="produtos-section" style={{
      background: '#EEF2F5',
      padding: 'clamp(72px, 10vw, 120px) var(--section-px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(34px, 5vw, 54px)',
          fontWeight: 300,
          color: '#0D1B2A',
          textAlign: 'center',
          marginBottom: 56,
          lineHeight: 1.15,
        }}>
          Seja fronteira da{' '}
          <span style={{ fontWeight: 600, textDecoration: 'underline' }}>IA na saúde</span>.
        </h2>

        {isMobile ? (
          /* ── Mobile: accordion ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PRODUCTS.map((t, i) => {
              const isActive = i === activeIndex
              return (
                <div key={t.id} ref={el => itemRefs.current[i] = el}>
                  <button
                    onClick={() => handleMobileClick(i)}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '18px 20px',
                      borderRadius: isActive ? '8px 8px 0 0' : 8,
                      border: '0.5px solid #D1D9E0',
                      background: isActive ? '#F4F7F9' : '#FFF',
                      boxShadow: isActive ? 'inset 0 -3px 0 0 #1A7A6E' : 'none',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.18s, box-shadow 0.18s',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14, fontWeight: 600,
                          color: isActive ? '#0D1B2A' : '#4A5568',
                          flex: 1, textAlign: 'left',
                        }}>
                          {t.name}
                        </span>
                        <span style={{ flexShrink: 0 }}>{t.icon}</span>
                      </div>
                      <span style={{
                        display: 'inline-flex', padding: '3px 8px', borderRadius: 2,
                        background: isActive ? '#E1F5EE' : '#EEF2F5',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11, fontWeight: 500,
                        color: isActive ? '#1A7A6E' : '#4A5568',
                        lineHeight: '17px',
                        transition: 'background 0.18s, color 0.18s',
                      }}>
                        {t.badge}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 14, color: '#9AA5B1', flexShrink: 0,
                      transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.22s ease',
                    }}>▾</span>
                  </button>
                  {isActive && <ContentPanel t={t} borderTop={false} />}
                </div>
              )
            })}
          </div>
        ) : (
          /* ── Desktop: tab bar + content panel ── */
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              borderRadius: '8px 8px 0 0',
              border: '0.5px solid #D1D9E0',
              background: '#FFF',
              overflow: 'hidden',
            }}>
              {PRODUCTS.map((t, i) => {
                const isActive = i === activeIndex
                const isHovered = hoveredIndex === i && !isActive
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                      padding: '24px 20px',
                      borderRight: i < PRODUCTS.length - 1 ? '0.5px solid #D1D9E0' : 'none',
                      background: isActive ? '#F4F7F9' : isHovered ? '#F9FAFB' : 'transparent',
                      boxShadow: isActive
                        ? 'inset 0 -3px 0 0 #1A7A6E'
                        : isHovered
                        ? 'inset 0 -3px 0 0 rgba(26,122,110,0.25)'
                        : 'none',
                      cursor: 'pointer', textAlign: 'left', gap: 10,
                      transition: 'background 0.18s, box-shadow 0.18s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, width: '100%' }}>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14, fontWeight: 600,
                        lineHeight: 1.35,
                        color: isActive ? '#0D1B2A' : isHovered ? '#1A7A6E' : '#4A5568',
                        flex: 1,
                        transition: 'color 0.18s',
                      }}>
                        {t.name}
                      </span>
                      <span style={{ flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
                    </div>
                    <span style={{
                      display: 'inline-flex', padding: '3px 8px', borderRadius: 2,
                      background: isActive ? '#E1F5EE' : isHovered ? '#E8F7F4' : '#EEF2F5',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11, fontWeight: 500,
                      color: isActive ? '#1A7A6E' : isHovered ? '#1A7A6E' : '#4A5568',
                      lineHeight: '17px', whiteSpace: 'nowrap',
                      transition: 'background 0.18s, color 0.18s',
                    }}>
                      {t.badge}
                    </span>
                  </button>
                )
              })}
            </div>

            <ContentPanel t={tab} borderTop />
          </>
        )}

      </div>
    </section>
  )
}
