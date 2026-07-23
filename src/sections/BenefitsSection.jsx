import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'

const BENEFITS_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9f892727f73a1543d44c80bc224d6cb56f373fed?width=256'

function BenefitBox({ text, index }) {
  const [hovered, setHovered] = useState(false)
  const reveal = useReveal({ delay: index * 0.08 })
  return (
    <div
      ref={reveal.ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '20px 20px',
        borderRadius: 8,
        background: hovered ? '#E2EAF0' : '#EEF2F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(13,27,42,0.10)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        cursor: 'default',
        ...reveal.style,
      }}
    >
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        fontWeight: hovered ? 500 : 400,
        lineHeight: 1.55,
        color: hovered ? '#0D1B2A' : '#4A5568',
        textAlign: 'center',
        whiteSpace: 'pre-line',
        transition: 'color 0.2s ease, font-weight 0.2s ease',
      }}>
        {text}
      </p>
    </div>
  )
}

export default function BenefitsSection() {
  const { t } = useLang()
  const BENEFITS = t.BENEFITS
  const headingReveal = useReveal()
  return (
    <section id="tecnologia" style={{
      background: '#FAFAFA',
      padding: 'clamp(72px, 9vw, 110px) var(--section-px)',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: 'var(--max-content)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Icon */}
        <img
          src={BENEFITS_IMG}
          alt=""
          style={{ width: 64, height: 'auto', marginBottom: 28 }}
        />

        <div ref={headingReveal.ref} style={headingReveal.style}>
          {/* Heading */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 3.8vw, 42px)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: '#0D1B2A',
            textAlign: 'center',
            maxWidth: 520,
            marginBottom: 16,
          }}>
            {BENEFITS.heading}
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.65,
            color: '#4A5568',
            textAlign: 'center',
            maxWidth: 460,
            marginBottom: 44,
          }}>
            {BENEFITS.description}
          </p>
        </div>

        {/* 3 cards */}
        <div className="benefits-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
          maxWidth: 780,
        }}>
          {BENEFITS.boxes.map((text, i) => (
            <BenefitBox key={text} text={text} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
