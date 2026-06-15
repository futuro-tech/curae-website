import { BENEFITS } from '../data/content'

const BENEFITS_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9f892727f73a1543d44c80bc224d6cb56f373fed?width=256'

export default function BenefitsSection() {
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
          maxWidth: 780,
        }}>
          {BENEFITS.boxes.map(text => (
            <div key={text} style={{
              padding: '20px 20px',
              borderRadius: 8,
              background: '#EEF2F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 80,
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 400,
                lineHeight: 1.55,
                color: '#4A5568',
                textAlign: 'center',
                whiteSpace: 'pre-line',
              }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #benefits-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
