import { useState } from 'react'
import { PRODUCTS } from '../data/products'

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tab = PRODUCTS[activeIndex]

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

        {/* Tab bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          borderRadius: '8px 8px 0 0',
          border: '0.5px solid #D1D9E0',
          background: '#FFF',
          overflow: 'hidden',
        }}>
          {PRODUCTS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '24px 20px',
                borderRight: i < PRODUCTS.length - 1 ? '0.5px solid #D1D9E0' : 'none',
                background: i === activeIndex ? '#F4F7F9' : 'transparent',
                boxShadow: i === activeIndex ? 'inset 0 -3px 0 0 #1A7A6E' : 'none',
                cursor: 'pointer', textAlign: 'left', gap: 10,
                transition: 'background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, width: '100%' }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  lineHeight: 1.35,
                  color: i === activeIndex ? '#0D1B2A' : '#4A5568',
                  flex: 1,
                }}>
                  {t.name}
                </span>
                <span style={{ flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
              </div>
              <span style={{
                display: 'inline-flex', padding: '3px 8px', borderRadius: 2,
                background: i === activeIndex ? '#E1F5EE' : '#EEF2F5',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 500,
                color: i === activeIndex ? '#1A7A6E' : '#4A5568',
                lineHeight: '17px', whiteSpace: 'nowrap',
              }}>
                {t.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content panel */}
        <div style={{
          padding: 'clamp(36px, 5vw, 56px) clamp(32px, 5vw, 56px)',
          borderRadius: '0 0 8px 8px',
          border: '0.5px solid #D1D9E0',
          borderTop: 'none',
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
              {tab.category}
            </span>
          </div>

          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontStyle: 'italic', fontWeight: 400,
            lineHeight: 1.2, color: '#0D1B2A',
            maxWidth: 640, marginBottom: 20,
          }}>
            {tab.heading}
          </h3>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 400,
            lineHeight: 1.7, color: '#4A5568',
            maxWidth: 620, marginBottom: 28,
          }}>
            {tab.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tab.bullets.map(b => (
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

      </div>

      <style>{`
        @media (max-width: 900px) {
          #produtos-section [style*="repeat(5"] { grid-template-columns: 1fr 1fr !important; border-radius: 8px !important; }
          #produtos-section [style*="border-radius: 0 0 8px"] { border-top: 0.5px solid #D1D9E0 !important; border-radius: 8px !important; margin-top: 16px; }
        }
        @media (max-width: 480px) {
          #produtos-section [style*="repeat(5"], #produtos-section [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
