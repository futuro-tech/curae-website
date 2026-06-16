import { useState } from 'react'
import { BENEFITS } from '../data/content'

const BENEFITS_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9f892727f73a1543d44c80bc224d6cb56f373fed?width=256'

export default function BenefitsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
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

        {/* 3 cards */}
        <div className="benefits-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
          maxWidth: 780,
        }}>
          {BENEFITS.boxes.map((text, i) => (
            <div
              key={text}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                padding: '20px 20px',
                borderRadius: 8,
                background: hoveredIndex === i ? '#E2EAF0' : '#EEF2F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 80,
                transform: hoveredIndex === i ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hoveredIndex === i ? '0 8px 24px rgba(13,27,42,0.10)' : 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                cursor: 'default',
              }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: hoveredIndex === i ? 500 : 400,
                lineHeight: 1.55,
                color: hoveredIndex === i ? '#0D1B2A' : '#4A5568',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                transition: 'color 0.2s ease, font-weight 0.2s ease',
              }}>
                {text}
              </p>
            </div>
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
