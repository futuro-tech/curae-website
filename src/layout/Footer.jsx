import CuraeLogo from '../components/CuraeLogo'
import PartnersLogos from '../components/PartnersLogos'
import PARTNERS from '../data/partners.json'
import { useLang } from '../context/LangContext'

const col = (opacity) => `rgba(255,255,255,${opacity})`

export default function Footer() {
  const { t } = useLang()
  const { tagline, description, socials, sections, productLinks, legalLinks, address, copyright } = t.FOOTER_CONTENT
  return (
    <footer style={{
      background: '#0A1520',
      borderTop: '0.5px solid rgba(255,255,255,0.08)',
      padding: 'clamp(40px, 5vw, 48px) var(--section-px)',
    }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto' }}>

        {/* Top row: logo | products | address */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: 48,
          marginBottom: 24,
          paddingBottom: 24,
          alignItems: 'start',
        }}>
          {/* Col 1: brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CuraeLogo variant="light" width={80} height={20} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 400, color: col(0.4), lineHeight: '18px' }}>
              {tagline}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, lineHeight: '20.8px', color: col(0.5), maxWidth: 300 }}>
              {description}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: col(0.4), fontSize: 13, fontFamily: "'DM Sans', sans-serif", transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = col(0.8)}
                  onMouseLeave={e => e.currentTarget.style.color = col(0.4)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: products */}
          <div style={{ minWidth: 220 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: col(0.3), letterSpacing: '0.88px', textTransform: 'uppercase', marginBottom: 16 }}>
              {sections.products}
            </p>
            {productLinks.map(p => (
              <a
                key={p.id}
                href="#produtos-section"
                onClick={e => {
                  e.preventDefault()
                  window.history.pushState(null, '', `#produto-${p.id}`)
                  window.dispatchEvent(new HashChangeEvent('hashchange'))
                  document.getElementById('produtos-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: col(0.5), lineHeight: '19.5px', paddingTop: 10, transition: 'color 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = col(0.85)}
                onMouseLeave={e => e.currentTarget.style.color = col(0.5)}
              >
                {p.name}
              </a>
            ))}
          </div>

          {/* Col 3: address */}
          <div style={{ minWidth: 180 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: col(0.3), letterSpacing: '0.88px', textTransform: 'uppercase', marginBottom: 16 }}>
              {sections.address}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: col(0.5), lineHeight: '20.8px' }}>
              {address[0]}<br />{address[1]}
            </p>
          </div>
        </div>

        {/* Partners row */}
        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 26, marginBottom: 24, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: col(0.25), letterSpacing: '0.7px', textTransform: 'uppercase' }}>
            {sections.partners}
          </span>
          <PartnersLogos partners={PARTNERS.footer} gap={14} />
        </div>

        {/* Bottom: copyright + legal */}
        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: col(0.25), lineHeight: '18px' }}>
            {copyright}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {legalLinks.map(link => (
              <a key={link} href="#"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: col(0.25), lineHeight: '18px', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = col(0.6)}
                onMouseLeave={e => e.currentTarget.style.color = col(0.25)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
