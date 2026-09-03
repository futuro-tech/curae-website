import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CuraeLogo from '../components/CuraeLogo'
import { useLang } from '../context/LangContext'

function LangToggle({ lang, setLang, dark }) {
  const base = { background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: '2px 5px', transition: 'color 0.15s' }
  const active = dark ? '#FAFAFA' : '#0D1B2A'
  const inactive = dark ? 'rgba(255,255,255,0.35)' : '#9AA5B1'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {['pt', 'en'].map((l, i) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && <span style={{ color: dark ? 'rgba(255,255,255,0.2)' : '#D1D9E0', fontSize: 11, margin: '0 2px' }}>|</span>}
          <button
            onClick={() => setLang(l)}
            style={{ ...base, fontWeight: lang === l ? 600 : 400, color: lang === l ? active : inactive }}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}

function resolveTo(href, isHome) {
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
    <nav style={{
      position: 'fixed',
      top: 0,
      zIndex: 100,
      width: '100%',
      height: 64,
      background: 'rgba(250, 250, 250, 0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '0.5px solid #D1D9E0',
      boxShadow: scrolled ? '0 1px 12px rgba(13,27,42,0.06)' : 'none',
      transition: 'box-shadow 0.2s',
    }}>
      <div style={{
        maxWidth: 1244,
        margin: '0 auto',
        padding: '0 var(--section-px)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" aria-label="Curae">
          <CuraeLogo variant="dark" />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop">
          {NAV.links.map(link => {
            const to = resolveTo(link.href, isHome)
            const style = { fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400, color: '#4A5568', lineHeight: '21px' }
            return to.startsWith('#') ? (
              <a key={link.label} href={to} className="nav-link" style={style}>{link.label}</a>
            ) : (
              <Link key={link.label} to={to} className="nav-link" style={style}>{link.label}</Link>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle lang={lang} setLang={setLang} dark={false} />

          <a
            href="https://wa.me/5581995299746?text=Oi%2C+vim+pelo+site+da+Curae+e+gostaria+de+saber+mais!"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-desktop"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '10px 20px', borderRadius: 4, background: '#0D1B2A',
              color: '#FAFAFA', fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 500, lineHeight: '22.5px',
              whiteSpace: 'nowrap', transition: 'background 0.15s, transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1a2f45'
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(13,27,42,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0D1B2A'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {NAV.cta}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="nav-hamburger"
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2,
                background: '#0D1B2A', borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: menuOpen
                  ? i === 1 ? 'scaleX(0)' : i === 0 ? 'translateY(7px) rotate(45deg)' : 'translateY(-7px) rotate(-45deg)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'rgba(250,250,250,0.98)', backdropFilter: 'blur(8px)',
          borderBottom: '0.5px solid #D1D9E0',
          padding: '24px var(--section-px)',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {NAV.links.map(link => {
            const to = resolveTo(link.href, isHome)
            const style = { fontSize: 16, color: '#4A5568', fontWeight: 400 }
            return to.startsWith('#') ? (
              <a key={link.label} href={to} onClick={() => setMenuOpen(false)} style={style}>{link.label}</a>
            ) : (
              <Link key={link.label} to={to} onClick={() => setMenuOpen(false)} style={style}>{link.label}</Link>
            )
          })}
          <a
            href="https://wa.me/5581995299746?text=Oi%2C+vim+pelo+site+da+Curae+e+gostaria+de+saber+mais!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 20px', borderRadius: 4, background: '#0D1B2A',
              color: '#FAFAFA', fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 500, textAlign: 'center',
            }}
          >
            {NAV.cta}
          </a>
          <LangToggle lang={lang} setLang={setLang} dark={false} />
        </div>
      )}

      <style>{`
        .nav-link {
          position: relative;
          transition: color 0.15s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 1px;
          background: #0D1B2A;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link:hover {
          color: #0D1B2A;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
