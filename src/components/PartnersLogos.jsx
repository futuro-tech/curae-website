export default function PartnersLogos({ partners, gap = 24 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' }}>
      {partners.map(p => (
        <img
          key={p.name}
          src={p.src}
          alt={p.name}
          height={p.h}
          style={{
            height: p.h,
            width: 'auto',
            objectFit: 'contain',
            mixBlendMode: p.blend ? 'multiply' : 'normal',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}
