import styled from 'styled-components'

interface Partner {
  name: string
  src: string
  h: number
  blend?: string | boolean
  filter?: string
}

const Row = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$gap}px;
  flex-wrap: wrap;
`

const Logo = styled.img<{ $h: number; $blend?: Partner['blend']; $filter?: string }>`
  height: ${props => props.$h}px;
  width: auto;
  object-fit: contain;
  mix-blend-mode: ${props => (props.$blend === 'screen' ? 'screen' : props.$blend ? 'multiply' : 'normal')};
  filter: ${props => props.$filter ?? 'none'};
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: scale(1.06);
    opacity: 0.85;
  }
`

export default function PartnersLogos({ partners, gap = 24 }: { partners: Partner[]; gap?: number }) {
  return (
    <Row $gap={gap}>
      {partners.map(p => (
        <Logo
          key={p.name}
          src={p.src}
          alt={p.name}
          height={p.h}
          $h={p.h}
          $blend={p.blend}
          $filter={p.filter}
        />
      ))}
    </Row>
  )
}
