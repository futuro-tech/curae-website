export default function PartnersLogos({ partners, gap = 24 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' }}>
      {partners.map(p => (
        <img
          key={p.name}
          src={p.src}
          alt={p.name}
          height={p.h}
          className="partner-logo"
          style={{
            height: p.h,
            width: 'auto',
            objectFit: 'contain',
            mixBlendMode: p.blend === 'screen' ? 'screen' : p.blend ? 'multiply' : 'normal',
            filter: p.filter ?? 'none',
            flexShrink: 0,
          }}
        />
      ))}

      <style>{`
        .partner-logo {
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .partner-logo:hover {
          transform: scale(1.06);
          opacity: 0.85;
        }
      `}</style>
    </div>
  )
}
