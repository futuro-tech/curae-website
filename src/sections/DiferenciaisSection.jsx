import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'

const ICONS = [
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M14.25 10.5C15.368 9.405 16.5 8.093 16.5 6.375C16.5 5.281 16.065 4.232 15.292 3.458C14.518 2.685 13.469 2.25 12.375 2.25C11.055 2.25 10.125 2.625 9 3.75C7.875 2.625 6.945 2.25 5.625 2.25C4.531 2.25 3.482 2.685 2.708 3.458C1.935 4.232 1.5 5.281 1.5 6.375C1.5 8.1 2.625 9.413 3.75 10.5L9 15.75L14.25 10.5Z" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.998 3.75L6.778 5.97C6.493 6.254 6.297 6.676 6.297 7.125C6.297 8.025 7.028 8.888 9.028 8.333L10.58 6.908C11.41 6.148 12.595 6.148 13.423 6.908L15.643 8.903" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 11.25L12 9.75M11.25 13.5L9.75 12" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L1.5 6V16.5H6.75V12H11.25V16.5H16.5V6L9 1.5Z" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.75 10.5H11.25M9 7.5V10.5" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3H15V13.5H3V3Z" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 16.5H12M9 13.5V16.5M6 6.75H12M6 9.75H9" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L2.25 4.5V9C2.25 12.623 5.18 15.986 9 16.875C12.82 15.986 15.75 12.623 15.75 9V4.5L9 1.5Z" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.375 9L8.25 10.875L11.625 7.5" stroke="#1A7A6E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
]

function DiferenciaisItem({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const reveal = useReveal({ delay: index * 0.08, y: 12 })
  return (
    <div
      ref={reveal.ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '20px 28px', borderRadius: 6,
        border: hovered ? '0.5px solid #1A7A6E' : '0.5px solid #D1D9E0',
        background: '#FFF',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(26,122,110,0.10)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        cursor: 'default',
        ...reveal.style,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 4,
        background: hovered ? '#C8EDE7' : '#E1F5EE',
        flexShrink: 0, transition: 'background 0.2s ease',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}>
        {item.icon}
      </div>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: '#0D1B2A', lineHeight: '19.5px' }}>
        {item.title}
      </h3>
    </div>
  )
}

export default function DiferenciaisSection() {
  const { t } = useLang()
  const { heading, items } = t.DIFERENCIAIS
  const ITEMS = items.map((item, i) => ({ ...item, icon: ICONS[i] }))
  const headingReveal = useReveal()
  return (
    <section style={{ background: '#FAFAFA', padding: 'clamp(64px, 8vw, 100px) var(--section-px)' }}>
      <div style={{
        maxWidth: 'var(--max-content)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '358px 1fr', gap: 80, alignItems: 'start',
      }}>
        <h2 ref={headingReveal.ref} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 4vw, 44px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.18,
          color: '#0D1B2A',
          ...headingReveal.style,
        }}>
          {heading.before}
          <span style={{ fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4 }}>
            {heading.emphasis}
          </span>
          {heading.end}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ITEMS.map((item, i) => (
            <DiferenciaisItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section [style*="358px 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
