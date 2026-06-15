import { useState, useEffect } from 'react'
import { TEAM } from '../data/team'
import { TEAM_CONTENT } from '../data/content'

function TeamModal({ member, onClose }) {
  const [visible, setVisible] = useState(false)

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
        padding: '24px', pointerEvents: 'none',
      }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 640,
            borderRadius: 8,
            background: '#fff',
            pointerEvents: 'auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
            transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 8px 40px rgba(13,27,42,0.14)',
            padding: '32px',
            display: 'flex',
            gap: 32,
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          {/* close */}
          <button
            onClick={handleClose}
            aria-label="Fechar"
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 26, height: 26, borderRadius: '50%',
              background: '#EEF2F5', border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9AA5B1', fontSize: 11,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#D1D9E0'}
            onMouseLeave={e => e.currentTarget.style.background = '#EEF2F5'}
          >
            ✕
          </button>

          {/* LEFT — photo + identity */}
          <div style={{ flexShrink: 0, width: 200 }}>
            <div style={{
              width: 200, height: 200,
              borderRadius: 4, overflow: 'hidden', background: '#EEF2F5',
              marginBottom: 14,
            }}>
              <img
                src={member.img}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 600,
              color: '#0D1B2A', lineHeight: '22px',
              marginBottom: 2,
            }}>
              {member.name}
            </p>
            {member.degree && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, color: '#1A7A6E', lineHeight: '18px',
                marginBottom: 2,
              }}>
                {member.degree}
              </p>
            )}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, color: '#4A5568', lineHeight: '19px',
            }}>
              {member.role}
            </p>
          </div>

          {/* RIGHT — bio */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 400,
            color: '#4A5568', lineHeight: 1.78,
            flex: 1, paddingTop: 2,
          }}>
            {member.bio}
          </p>
        </div>
      </div>
    </>
  )
}

function TeamCard({ member, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onClick(member)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      <div style={{
        width: '100%', aspectRatio: '1 / 1',
        borderRadius: 4, overflow: 'hidden', background: '#C0CBD4',
        transition: 'opacity 0.2s',
        opacity: hovered ? 0.85 : 1,
      }}>
        <img
          src={member.img}
          alt={member.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
      <div style={{ paddingTop: 14 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, fontWeight: 600,
          color: '#0D1B2A', lineHeight: '22.5px',
        }}>
          {member.name}
        </p>
        {member.degree && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 400,
            color: '#1A7A6E', lineHeight: '18px', marginTop: 2,
          }}>
            {member.degree}
          </p>
        )}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, fontWeight: 400,
          color: '#4A5568', lineHeight: '19.5px', marginTop: 2,
        }}>
          {member.role}
        </p>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const { tagline, heading } = TEAM_CONTENT
  const [selected, setSelected] = useState(null)

  return (
    <section id="sobre" style={{
      background: '#EEF2F5',
      padding: 'clamp(64px, 8vw, 100px) var(--section-px)',
    }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          marginBottom: 56,
          alignItems: 'start',
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px 24px',
        }}>
          {TEAM.map(m => (
            <TeamCard key={m.name} member={m} onClick={setSelected} />
          ))}
        </div>

      </div>

      {selected && <TeamModal member={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @media (max-width: 768px) {
          #sobre [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
          #sobre h2 { text-align: left !important; }
          #sobre [style*="repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          #sobre [style*="repeat(3"], #sobre [style*="repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
