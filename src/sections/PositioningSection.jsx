import { POSITIONING } from '../data/content'

const HASSAN_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/505760c7436e51894b22ecc5f5665f883830b103?width=2976'

export default function PositioningSection() {
  const { paragraph1, paragraph2 } = POSITIONING
  return (
    <section style={{
      background: 'white',
      padding: 'clamp(72px, 10vw, 120px) var(--section-px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <img
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140%', minWidth: 900,
          objectFit: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          pointerEvents: 'none', userSelect: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 500,
          lineHeight: 1.15,
          color: '#000',
          marginBottom: 24,
        }}>
          {paragraph1}
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px, 3vw, 34px)',
          fontWeight: 400,
          lineHeight: 1.55,
          color: '#0D1B2A',
          maxWidth: 820,
        }}>
          {paragraph2.text}
          <span style={{ fontWeight: 600, textDecoration: 'underline' }}>{paragraph2.emphasis}</span>
        </p>
      </div>
    </section>
  )
}
