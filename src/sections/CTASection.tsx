import PartnersLogos from '../components/PartnersLogos'
import PARTNERS from '../data/partners.json'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'

export default function CTASection() {
  const { t } = useLang()
  const { heading, description, button, partnersLabel } = t.CTA_CONTENT
  const reveal = useReveal()
  return (
    <section id="contato" style={{ background: '#EEF2F5', padding: 'clamp(48px, 6vw, 80px) var(--section-px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div ref={reveal.ref} style={{
          background: '#FFF', border: '0.5px solid #D1D9E0', borderRadius: 8,
          padding: 'clamp(40px, 5vw, 72px) clamp(32px, 5vw, 80px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          ...reveal.style,
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300,
            color: '#0D1B2A', textAlign: 'center', lineHeight: 1.1, marginBottom: 24,
          }}>
            {heading.before}<span style={{ fontWeight: 600 }}>{heading.emphasis}</span>
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 400,
            lineHeight: '28px', color: '#4A5568', textAlign: 'center', maxWidth: 560, marginBottom: 40,
          }}>
            {description}
          </p>

          <a
            href={button.href}
            className="cta-btn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 32px', borderRadius: 4, background: '#0D1B2A',
              color: '#FAFAFA', fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 500, lineHeight: '22.5px',
              marginBottom: 48, transition: 'background 0.15s, transform 0.15s, box-shadow 0.15s',
              whiteSpace: 'nowrap', textAlign: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1a2f45'
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(13,27,42,0.20)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0D1B2A'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {button.label}
          </a>

          <style>{`
            @media (max-width: 560px) {
              .cta-btn {
                width: 100% !important;
                white-space: normal !important;
                font-size: 14px !important;
                padding: 14px 20px !important;
              }
            }
          `}</style>

          <div style={{ width: '100%', borderTop: '0.5px solid #D1D9E0', paddingTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 400, color: '#9AA5B1', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
              {partnersLabel}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <PartnersLogos partners={PARTNERS.cta} gap={34} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
