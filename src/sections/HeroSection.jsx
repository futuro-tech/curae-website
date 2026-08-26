import { useState, useEffect, useRef } from 'react'
import PartnersLogos from '../components/PartnersLogos'
import { PARTNERS_HERO } from '../data/partners'
import { useLang } from '../context/LangContext'

const HERO_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/505760c7436e51894b22ecc5f5665f883830b103?width=2976'

function ChevronIcon({ direction }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroSection() {
  const { t } = useLang()
  const { headline: h, articles } = t.HERO
  const [articleHovered, setArticleHovered] = useState(false)
  const [hoveredArrow, setHoveredArrow] = useState(null)
  const [articleIndex, setArticleIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragInfo = useRef({ startX: 0, width: 0, moved: false, currentX: 0 })
  const canDrag = articles.length > 1

  useEffect(() => {
    setArticleIndex(0)
  }, [articles])

  useEffect(() => {
    if (!canDrag || articleHovered || dragging) return
    const id = setInterval(() => {
      setArticleIndex(i => (i + 1) % articles.length)
    }, 3000)
    return () => clearInterval(id)
  }, [articles, articleHovered, dragging, canDrag])

  function handlePointerDown(e) {
    // Use window-level listeners instead of setPointerCapture so a plain
    // click (no movement) still lets the browser fire a native click on
    // the anchor underneath — capture would retarget mouseup and swallow it.
    dragInfo.current.startX = e.clientX
    dragInfo.current.width = e.currentTarget.offsetWidth || 1
    dragInfo.current.moved = false
    dragInfo.current.currentX = 0
    setDragging(true)

    function onMove(ev) {
      const delta = ev.clientX - dragInfo.current.startX
      if (Math.abs(delta) > 6) dragInfo.current.moved = true
      dragInfo.current.currentX = delta
      setDragX(delta)
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      setDragging(false)
      const width = dragInfo.current.width || 1
      const threshold = width * 0.12
      const finalX = dragInfo.current.currentX
      if (finalX > threshold) {
        setArticleIndex(i => (i - 1 + articles.length) % articles.length)
      } else if (finalX < -threshold) {
        setArticleIndex(i => (i + 1) % articles.length)
      }
      setDragX(0)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  function handleArticleLinkClick(e) {
    if (dragInfo.current.moved) e.preventDefault()
  }

  return (
    <section id="produtos" style={{
      background: '#FAFAFA',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Wave — full background */}
      <img
        src={HERO_IMG}
        alt=""
        aria-hidden
        style={{
          fontStyle: 'italic',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140%',
          minWidth: 900,
          mixBlendMode: 'multiply',
          opacity: 0.75,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* H1 + paragraph grid */}
      <div style={{
        position: 'relative',
        maxWidth: 1244,
        margin: '0 auto',
        padding: 'clamp(72px, 9vw, 120px) var(--section-px) clamp(52px, 7vw, 90px)',
        display: 'grid',
        gridTemplateColumns: '5fr 3fr',
        gap: 40,
        alignItems: 'center',
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(46px, 7.4vw, 80px)',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          color: '#0D1B2A',
          fontWeight: 300,
          fontStyle: 'italic',
        }}>
          {h.line1}<br />
          {h.line2}<br />
          <span style={{ fontWeight: 600, fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: 4 }}>{h.emphasis1}</span>{h.middle}<span style={{ fontWeight: 600, fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: 4 }}>{h.emphasis2}</span>{h.end}
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18,
          fontWeight: 380,
          lineHeight: 1.62,
          color: '#4A5568',
          maxWidth: 380,
        }}>
          {t.HERO.paragraph}
        </p>
      </div>

      {/* Partners strip */}
      <div style={{
        maxWidth: 1244,
        margin: '0 auto',
        padding: '0 var(--section-px)',
        borderTop: '0.5px solid #D1D9E0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '18px 0',
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: '#9AA5B1',
            letterSpacing: '0.77px',
            textTransform: 'uppercase',
            flexShrink: 0
          }}>
            {t.HERO.partnersLabel}
          </span>
          <PartnersLogos partners={PARTNERS_HERO} gap={24} />
        </div>
      </div>

      {/* Article bar (draggable carousel) */}
      <div
        onMouseEnter={() => setArticleHovered(true)}
        onMouseLeave={() => setArticleHovered(false)}
        onPointerDown={canDrag ? handlePointerDown : undefined}
        className="article-bar"
        style={{
          position: 'relative',
          background: articleHovered ? '#162435' : '#0D1B2A',
          padding: '14px 0',
          transition: 'background 0.2s ease',
          borderTop: articleHovered ? '0.5px solid rgba(94,204,195,0.25)' : '0.5px solid transparent',
          overflow: 'hidden',
          touchAction: 'pan-y',
          cursor: canDrag ? (dragging ? 'grabbing' : 'grab') : 'default',
          userSelect: dragging ? 'none' : 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${articles.length * 100}%`,
            transform: `translateX(calc(${-articleIndex * (100 / articles.length)}% + ${dragX}px))`,
            transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {articles.map(a => (
            <div key={a.href} style={{ flex: `0 0 ${100 / articles.length}%`, minWidth: 0 }}>
              {/* Desktop layout */}
              <div className="article-bar__desktop" style={{
                maxWidth: 1244,
                margin: '0 auto',
                padding: '0 var(--section-px)',
              }}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={handleArticleLinkClick}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    textDecoration: 'none',
                  }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '4px 8px', borderRadius: 2,
                    background: '#E1F5EE',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10, fontWeight: 500, color: '#1A7A6E',
                    letterSpacing: '0.8px', textTransform: 'uppercase', flexShrink: 0,
                  }}>
                    {a.badge}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                    color: 'rgba(255,255,255,0.35)', flexShrink: 0,
                  }}>
                    {a.source}
                  </span>
                  <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: 'rgba(255,255,255,0.60)', lineHeight: '19.5px', flex: 1, minWidth: 0,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {a.title}
                  </p>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                    color: articleHovered ? '#5ECCC3' : '#FAFAFA',
                    opacity: articleHovered ? 1 : 0.85, whiteSpace: 'nowrap', flexShrink: 0,
                    transition: 'color 0.2s ease, opacity 0.2s ease',
                  }}>
                    {a.cta}
                  </span>
                </a>
              </div>

              {/* Mobile layout */}
              <div className="article-bar__mobile" style={{ maxWidth: 1244, margin: '0 auto', padding: '0 var(--section-px)' }}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={handleArticleLinkClick}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '3px 7px', borderRadius: 2, background: '#E1F5EE',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9, fontWeight: 500, color: '#1A7A6E',
                      letterSpacing: '0.7px', textTransform: 'uppercase', flexShrink: 0,
                    }}>
                      {a.badge}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                      color: 'rgba(255,255,255,0.35)',
                    }}>
                      {a.source}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 10,
                  }}>
                    {a.title}
                  </p>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                    color: '#5ECCC3',
                  }}>
                    {a.cta}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {canDrag && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ maxWidth: 1244, height: '100%', margin: '0 auto', padding: '0 var(--section-px)', position: 'relative' }}>
              <button
                aria-label="Artigo anterior"
                onPointerDown={e => e.stopPropagation()}
                onClick={() => setArticleIndex(i => (i - 1 + articles.length) % articles.length)}
                onMouseEnter={() => setHoveredArrow('left')}
                onMouseLeave={() => setHoveredArrow(null)}
                style={{
                  position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'auto', background: 'none', border: 'none', cursor: 'pointer',
                  padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: hoveredArrow === 'left' ? 1 : (articleHovered ? 0.55 : 0.3),
                  transition: 'opacity 0.2s ease',
                }}
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                aria-label="Próximo artigo"
                onPointerDown={e => e.stopPropagation()}
                onClick={() => setArticleIndex(i => (i + 1) % articles.length)}
                onMouseEnter={() => setHoveredArrow('right')}
                onMouseLeave={() => setHoveredArrow(null)}
                style={{
                  position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'auto', background: 'none', border: 'none', cursor: 'pointer',
                  padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: hoveredArrow === 'right' ? 1 : (articleHovered ? 0.55 : 0.3),
                  transition: 'opacity 0.2s ease',
                }}
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .article-bar__mobile { display: none; }
        .article-bar__desktop { display: block; }

        @media (max-width: 768px) {
          #produtos > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            padding-bottom: 40px !important;
          }
          #produtos > div[style*="grid"] p {
            margin-left: 0 !important;
          }
          .article-bar__desktop { display: none !important; }
          .article-bar__mobile  { display: block !important; }
          .article-bar { padding: 16px 0 !important; }
        }
      `}</style>
    </section>
  )
}
