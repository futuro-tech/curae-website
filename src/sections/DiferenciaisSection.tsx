import { useState, type ReactNode } from 'react'
import styled from 'styled-components'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import { Section, Container, tokens } from '../components/styled'

const ICONS = [
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M14.25 10.5C15.368 9.405 16.5 8.093 16.5 6.375C16.5 5.281 16.065 4.232 15.292 3.458C14.518 2.685 13.469 2.25 12.375 2.25C11.055 2.25 10.125 2.625 9 3.75C7.875 2.625 6.945 2.25 5.625 2.25C4.531 2.25 3.482 2.685 2.708 3.458C1.935 4.232 1.5 5.281 1.5 6.375C1.5 8.1 2.625 9.413 3.75 10.5L9 15.75L14.25 10.5Z" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.998 3.75L6.778 5.97C6.493 6.254 6.297 6.676 6.297 7.125C6.297 8.025 7.028 8.888 9.028 8.333L10.58 6.908C11.41 6.148 12.595 6.148 13.423 6.908L15.643 8.903" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 11.25L12 9.75M11.25 13.5L9.75 12" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L1.5 6V16.5H6.75V12H11.25V16.5H16.5V6L9 1.5Z" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.75 10.5H11.25M9 7.5V10.5" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3H15V13.5H3V3Z" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 16.5H12M9 13.5V16.5M6 6.75H12M6 9.75H9" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L2.25 4.5V9C2.25 12.623 5.18 15.986 9 16.875C12.82 15.986 15.75 12.623 15.75 9V4.5L9 1.5Z" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.375 9L8.25 10.875L11.625 7.5" stroke={tokens.teal} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
]

const DiferenciaisGrid = styled.div`
  display: grid;
  grid-template-columns: 358px 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const DiferenciaisHeading = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 300;
  font-style: italic;
  line-height: 1.18;
  color: ${tokens.navy};
`

const DiferenciaisEmphasis = styled.span`
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DiferenciaisItemBox = styled.div<{ $hovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  border-radius: 6px;
  border: 0.5px solid ${props => props.$hovered ? tokens.teal : tokens.border};
  background: #fff;
  transform: ${props => props.$hovered ? 'translateY(-2px)' : 'translateY(0)'};
  box-shadow: ${props => props.$hovered ? `0 6px 20px rgba(26,122,110,0.10)` : 'none'};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: default;
`

const IconBox = styled.div<{ $hovered: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: ${props => props.$hovered ? '#C8EDE7' : tokens.tealbg};
  flex-shrink: 0;
  transition: background 0.2s ease, transform 0.2s ease;
  transform: ${props => props.$hovered ? 'scale(1.08)' : 'scale(1)'};
`

const ItemTitle = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${tokens.navy};
  line-height: 1.3;
`

function DiferenciaisItem({ item, index }: { item: { title: string; icon: ReactNode }; index: number }) {
  const [hovered, setHovered] = useState(false)
  const reveal = useReveal({ delay: index * 0.08, y: 12 })
  return (
    <DiferenciaisItemBox
      ref={reveal.ref}
      $hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={reveal.style}
    >
      <IconBox $hovered={hovered}>{item.icon}</IconBox>
      <ItemTitle>{item.title}</ItemTitle>
    </DiferenciaisItemBox>
  )
}

export default function DiferenciaisSection() {
  const { t } = useLang()
  const { heading, items } = t.DIFERENCIAIS
  const ITEMS = items.map((item: { title: string }, i: number) => ({ ...item, icon: ICONS[i] }))
  const headingReveal = useReveal<HTMLHeadingElement>()

  return (
    <Section bg="offWhite" spacing="md">
      <Container maxWidth="content">
        <DiferenciaisGrid>
          <DiferenciaisHeading ref={headingReveal.ref} style={headingReveal.style}>
            {heading.before}
            <DiferenciaisEmphasis>{heading.emphasis}</DiferenciaisEmphasis>
            {heading.end}
          </DiferenciaisHeading>

          <ItemsContainer>
            {ITEMS.map((item: { title: string; icon: ReactNode }, i: number) => (
              <DiferenciaisItem key={item.title} item={item} index={i} />
            ))}
          </ItemsContainer>
        </DiferenciaisGrid>
      </Container>
    </Section>
  )
}
