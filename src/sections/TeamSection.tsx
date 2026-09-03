import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'

const BIO_LIMIT = 180

function resolveImg(src) {
  return src && src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src
}

function TeamModal({ member, onClose, lang }) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const isLong = member.bio && member.bio.length > BIO_LIMIT

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <>
      {/* overlay */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(13,27,42,0.55)',
          backdropFilter: 'blur(8px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* centered card */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', pointerEvents: 'none',
      }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 640,
            maxHeight: '88vh',
            overflowY: 'auto',
            borderRadius: 8,
            background: '#fff',
            pointerEvents: 'auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
            transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 8px 40px rgba(13,27,42,0.14)',
            padding: '32px',
            position: 'relative',
          }}
        >
          {/* close */}
          <button
            onClick={handleClose}
            aria-label="Fechar"
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 30, height: 30, borderRadius: '50%',
              background: '#EEF2F5', border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#4A5568', fontSize: 13, fontWeight: 600,
              transition: 'background 0.15s',
              zIndex: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#D1D9E0'}
            onMouseLeave={e => e.currentTarget.style.background = '#EEF2F5'}
          >
            ✕
          </button>

          {/* body — stacks on mobile */}
          <div className="modal-body">
            {/* photo + identity */}
            <div className="modal-photo-col">
              <div style={{
                width: '100%', aspectRatio: '1 / 1',
                borderRadius: 4, overflow: 'hidden', background: '#C0CBD4',
                marginBottom: 14,
              }}>
                {member.img && (
                  <img
                    src={resolveImg(member.img)}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                )}
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 600,
                color: '#0D1B2A', lineHeight: '22px',
                marginBottom: 2,
              }}>
                {member.name}
              </p>
              {member.degree && [].concat(member.degree).map((d, i) => (
                <p key={i} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, color: '#1A7A6E', lineHeight: '18px',
                  marginBottom: 2,
                }}>
                  {d}
                </p>
              ))}
              {member.role && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, color: '#4A5568', lineHeight: '19px',
                }}>
                  {member.role}
                </p>
              )}
            </div>

            {/* bio */}
            <div style={{ flex: 1, paddingTop: 2 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 400,
                color: '#4A5568', lineHeight: 1.78,
              }}>
                <span className="bio-text bio-text--full">{member.bio}</span>
                <span className="bio-text bio-text--short">
                  {isLong && !expanded
                    ? member.bio.slice(0, BIO_LIMIT).trimEnd() + '…'
                    : member.bio}
                </span>
              </p>
              {isLong && (
                <button
                  className="bio-toggle"
                  onClick={() => setExpanded(e => !e)}
                  style={{
                    marginTop: 10,
                    background: 'none', border: 'none', padding: 0,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 500,
                    color: '#1A7A6E', cursor: 'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  }}
                >
                  {expanded
                    ? (lang === 'en' ? 'Read less' : 'Ler menos')
                    : (lang === 'en' ? 'Read more' : 'Ler mais')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-body {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .modal-photo-col {
          flex-shrink: 0;
          width: 180px;
        }
        /* desktop: always show full bio */
        .bio-text--short { display: none; }
        .bio-text--full  { display: inline; }
        .bio-toggle      { display: none; }

        @media (max-width: 560px) {
          .modal-body {
            flex-direction: column;
            gap: 20px;
          }
          .modal-photo-col {
            width: 100%;
            max-width: 160px;
          }
          /* mobile: show short bio + toggle */
          .bio-text--full  { display: none; }
          .bio-text--short { display: inline; }
          .bio-toggle      { display: inline-block; }
        }
      `}</style>
    </>
  )
}

function TeamCard({ member, onClick, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const clickable = Boolean(member.bio)
  const reveal = useReveal({ delay: (index % 4) * 0.06, y: 14 })
  return (
    <div
      ref={reveal.ref}
      onClick={clickable ? () => onClick(member) : undefined}
      onMouseEnter={() => clickable && setHovered(true)}
      onMouseLeave={() => clickable && setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', cursor: clickable ? 'pointer' : 'default', ...reveal.style }}
    >
      <div style={{
        width: '100%', aspectRatio: '1 / 1',
        borderRadius: 4, overflow: 'hidden', background: '#C0CBD4',
        transition: 'opacity 0.2s, transform 0.2s',
        opacity: hovered ? 0.85 : 1,
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}>
        {member.img && (
          <img
            src={resolveImg(member.img)}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        )}
      </div>
      <div style={{ paddingTop: 14 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, fontWeight: 600,
          color: '#0D1B2A', lineHeight: '22.5px',
        }}>
          {member.name}
        </p>
        {member.degree && [].concat(member.degree).map((d, i) => (
          <p key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 400,
            color: '#1A7A6E', lineHeight: '18px', marginTop: 2,
          }}>
            {d}
          </p>
        ))}
        {member.role && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 400,
            color: '#4A5568', lineHeight: '19.5px', marginTop: 2,
          }}>
            {member.role}
          </p>
        )}
      </div>
    </div>
  )
}

const FOUNDER_ORDER = ['Adriana Falcão', 'João Garcia']

function degreeRank(degree = '') {
  const text = [].concat(degree).join(' ')
  if (text.includes('PhD')) return 0
  if (text.includes('MSc')) return 1
  return 2
}

export default function TeamSection() {
  const { t, lang } = useLang()
  const { tagline, heading, groups } = t.TEAM_CONTENT
  const [selected, setSelected] = useState(null)

  const founders = t.TEAM
    .filter(m => m.group === 'founders')
    .sort((a, b) => FOUNDER_ORDER.indexOf(a.name) - FOUNDER_ORDER.indexOf(b.name))
  const researchers = t.TEAM
    .filter(m => m.group === 'researchers')
    .sort((a, b) => degreeRank(a.degree) - degreeRank(b.degree) || a.name.localeCompare(b.name, 'pt-BR'))
  const medical = t.TEAM
    .filter(m => m.group === 'medical')
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

  const researchersLabel = groups?.researchers ?? 'Pesquisadores e Especialistas em IA'
  const medicalLabel = groups?.medical ?? 'Conselho Médico'
  const introReveal = useReveal()

  return (
    <section id="sobre" style={{
      background: '#EEF2F5',
      padding: 'clamp(64px, 8vw, 100px) var(--section-px)',
    }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto' }}>

        <div ref={introReveal.ref} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          marginBottom: 56,
          alignItems: 'start',
          ...introReveal.style,
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 400,
            lineHeight: '26.25px', color: '#4A5568',
          }}>
            {tagline}
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 300, lineHeight: 1.15,
            color: '#0D1B2A', textAlign: 'right', fontStyle: 'italic',
          }}>
            {heading.before}
            <span style={{ fontWeight: 600, textDecoration: 'underline' }}>{heading.emphasis}</span>
            {heading.end}
          </h2>
        </div>

        <div className="team-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '48px 24px',
        }}>
          {founders.map((m, i) => (
            <TeamCard key={m.name} member={m} onClick={setSelected} index={i} />
          ))}
        </div>

        {researchers.length > 0 && (
          <>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 600,
              color: '#0D1B2A',
              marginTop: 64, marginBottom: 28,
            }}>
              {researchersLabel}
            </h3>
            <div className="team-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '48px 24px',
            }}>
              {researchers.map((m, i) => (
                <TeamCard key={m.name} member={m} onClick={setSelected} index={i} />
              ))}
            </div>
          </>
        )}

        {medical.length > 0 && (
          <>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 600,
              color: '#0D1B2A',
              marginTop: 64, marginBottom: 28,
            }}>
              {medicalLabel}
            </h3>
            <div className="team-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '48px 24px',
            }}>
              {medical.map((m, i) => (
                <TeamCard key={m.name} member={m} onClick={setSelected} index={i} />
              ))}
            </div>
          </>
        )}

      </div>

      {selected && <TeamModal member={selected} onClose={() => setSelected(null)} lang={lang} />}

      <style>{`
        @media (max-width: 768px) {
          #sobre [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
          #sobre h2 { text-align: left !important; }
          #sobre .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
