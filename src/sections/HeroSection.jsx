import PartnersLogos from '../components/PartnersLogos'
import { PARTNERS_HERO } from '../data/partners'
import { HERO } from '../data/content'

const HERO_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/505760c7436e51894b22ecc5f5665f883830b103?width=2976'

export default function HeroSection() {
  const { headline: h, article } = HERO
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
          {h.line3}<span style={{ fontWeight: 600, fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: 4 }}>{h.emphasis1}</span>.<br />
          {h.line4}<span style={{ fontWeight: 600, fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: 4 }}>{h.emphasis2}</span>{h.end}
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18,
          fontWeight: 380,
          lineHeight: 1.62,
          color: '#4A5568',
          maxWidth: 380,
        }}>
          {HERO.paragraph}
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
            {HERO.partnersLabel}
          </span>
          <PartnersLogos partners={PARTNERS_HERO} gap={24} />
        </div>
      </div>

      {/* Article bar */}
      <div style={{ background: '#0D1B2A', padding: '14px var(--section-px)' }}>
        <div style={{
          maxWidth: 1244,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 8px',
            borderRadius: 2,
            background: '#E1F5EE',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            color: '#1A7A6E',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}>
            {article.badge}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            flexShrink: 0,
          }}>
            {article.source}
          </span>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.60)',
            lineHeight: '19.5px',
            flex: 1,
            minWidth: 200,
          }}>
            {article.title}
          </p>
          <a
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#FAFAFA',
              opacity: 0.85,
              whiteSpace: 'nowrap',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.85}
          >
            {article.cta}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #produtos > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            padding-bottom: 40px !important;
          }
          #produtos > div[style*="grid"] p {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
