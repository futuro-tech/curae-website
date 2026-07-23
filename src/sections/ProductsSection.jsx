import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { PRODUCT_GROUPS_PT, PRODUCT_GROUPS_EN } from '../data/productGroups'
import { useReveal } from '../hooks/useReveal'

function BenefitCapsule({ icon, text, bg }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 16,
        padding: 12, borderRadius: 6, background: bg,
        width: '100%', maxWidth: 300,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 16px rgba(13,27,42,0.08)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <img src={icon} alt="" style={{
        width: 27, height: 27, flexShrink: 0,
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s ease',
      }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15, fontWeight: 300, lineHeight: 1.7,
        color: '#4A5568',
      }}>
        {text}
      </span>
    </div>
  )
}

function ProductRow({ product, group }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px', minWidth: 260, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#000' }}>
          {product.name}
        </h3>
        <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, lineHeight: 1.15, color: '#000' }}>
          {product.heading}
        </h4>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, lineHeight: 1.6, color: '#4A5568', maxWidth: 330 }}>
          {product.description}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end', flex: '0 0 auto', width: '100%', maxWidth: 300 }}>
        {product.benefits.map(b => (
          <BenefitCapsule key={b.text} icon={b.icon} text={b.text} bg={group.bg} />
        ))}
      </div>
    </div>
  )
}

function ProductGroupCard({ group, index }) {
  const reveal = useReveal({ delay: index * 0.08 })
  return (
    <div ref={reveal.ref} style={{
      border: '0.5px solid #D1D9E0', borderRadius: 8, background: '#FFF',
      padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px)',
      ...reveal.style,
    }}>
      <span style={{
        display: 'inline-flex', padding: '4px 10px', borderRadius: 2,
        background: group.bg, color: group.text,
        fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
        letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 24,
      }}>
        {group.badge}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {group.products.map((p, i) => (
          <div key={p.id}>
            {i > 0 && <div style={{ height: 1, background: '#C0CBD4', opacity: 0.4, marginBottom: 32 }} />}
            <ProductRow product={p} group={group} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductsSection() {
  const { t, lang } = useLang()
  const { heading, subheading } = t.PRODUCTS_SECTION
  const groups = lang === 'pt' ? PRODUCT_GROUPS_PT : PRODUCT_GROUPS_EN
  const headingReveal = useReveal()

  return (
    <section id="produtos-section" style={{
      background: '#EEF2F5',
      padding: 'clamp(72px, 10vw, 120px) var(--section-px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={headingReveal.ref} style={{ textAlign: 'center', marginBottom: 56, ...headingReveal.style }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(30px, 4.5vw, 42px)',
            lineHeight: 1.2,
            color: '#0D1B2A',
          }}>
            <span style={{ fontWeight: 300 }}>{heading.before}</span>
            <span style={{ fontWeight: 700 }}>{heading.emphasis}</span>
            {heading.end}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18, fontWeight: 400, color: '#4A5568', marginTop: 16,
          }}>
            {subheading}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {groups.map((group, i) => (
            <ProductGroupCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
