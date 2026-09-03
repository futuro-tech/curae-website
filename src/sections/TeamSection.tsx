import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import { Section, Container, tokens } from '../components/styled'

const BIO_LIMIT = 180

interface TeamMember {
  name: string
  img?: string
  degree?: string | string[]
  role?: string
  bio?: string
  group: string
}

function resolveImg(src?: string) {
  return src && src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src
}

const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(13,27,42,0.55);
  backdrop-filter: blur(8px);
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease;
`

const ModalCenter = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  pointer-events: none;
`

const ModalCard = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 8px;
  background: #fff;
  pointer-events: auto;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)'};
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 8px 40px rgba(13,27,42,0.14);
  padding: 32px;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${tokens.lightGrey};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.text};
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s;
  z-index: 1;

  &:hover {
    background: ${tokens.border};
  }
`

const ModalBody = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 560px) {
    flex-direction: column;
    gap: 20px;
  }
`

const ModalPhotoCol = styled.div`
  flex-shrink: 0;
  width: 180px;

  @media (max-width: 560px) {
    width: 100%;
    max-width: 160px;
  }
`

const PhotoFrame = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  background: #C0CBD4;
  margin-bottom: 14px;
`

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`

const ModalName = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${tokens.navy};
  line-height: 22px;
  margin-bottom: 2px;
`

const ModalDegree = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: ${tokens.teal};
  line-height: 18px;
  margin-bottom: 2px;
`

const ModalRole = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: ${tokens.text};
  line-height: 19px;
`

const BioCol = styled.div`
  flex: 1;
  padding-top: 2px;
`

const BioText = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${tokens.text};
  line-height: 1.78;
`

const bioVisibility = (variant: 'full' | 'short') => css`
  display: ${variant === 'full' ? 'inline' : 'none'};

  @media (max-width: 560px) {
    display: ${variant === 'full' ? 'none' : 'inline'};
  }
`

const BioFull = styled.span`
  ${bioVisibility('full')}
`

const BioShort = styled.span`
  ${bioVisibility('short')}
`

const BioToggle = styled.button`
  display: none;
  margin-top: 10px;
  background: none;
  border: none;
  padding: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${tokens.teal};
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;

  @media (max-width: 560px) {
    display: inline-block;
  }
`

function TeamModal({ member, onClose, lang }: { member: TeamMember; onClose: () => void; lang: string }) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const isLong = member.bio && member.bio.length > BIO_LIMIT

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  function handleClose(): void {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <>
      <Overlay onClick={handleClose} $visible={visible} />

      <ModalCenter>
        <ModalCard onClick={e => e.stopPropagation()} $visible={visible}>
          <CloseButton onClick={handleClose} aria-label="Fechar">✕</CloseButton>

          <ModalBody>
            <ModalPhotoCol>
              <PhotoFrame>
                {member.img && <PhotoImg src={resolveImg(member.img)} alt={member.name} />}
              </PhotoFrame>
              <ModalName>{member.name}</ModalName>
              {member.degree && ([] as string[]).concat(member.degree).map((d, i) => (
                <ModalDegree key={i}>{d}</ModalDegree>
              ))}
              {member.role && <ModalRole>{member.role}</ModalRole>}
            </ModalPhotoCol>

            <BioCol>
              <BioText>
                <BioFull>{member.bio ?? ''}</BioFull>
                <BioShort>
                  {isLong && !expanded
                    ? (member.bio ?? '').slice(0, BIO_LIMIT).trimEnd() + '…'
                    : member.bio}
                </BioShort>
              </BioText>
              {isLong && (
                <BioToggle onClick={() => setExpanded(e => !e)}>
                  {expanded
                    ? (lang === 'en' ? 'Read less' : 'Ler menos')
                    : (lang === 'en' ? 'Read more' : 'Ler mais')}
                </BioToggle>
              )}
            </BioCol>
          </ModalBody>
        </ModalCard>
      </ModalCenter>
    </>
  )
}

const CardWrapper = styled.div<{ $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
`

const CardPhotoFrame = styled.div<{ $hovered: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  background: #C0CBD4;
  transition: opacity 0.2s, transform 0.2s;
  opacity: ${props => props.$hovered ? 0.85 : 1};
  transform: ${props => props.$hovered ? 'scale(1.02)' : 'scale(1)'};
`

const CardInfo = styled.div`
  padding-top: 14px;
`

const CardName = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${tokens.navy};
  line-height: 22.5px;
`

const CardDegree = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${tokens.teal};
  line-height: 18px;
  margin-top: 2px;
`

const CardRole = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${tokens.text};
  line-height: 19.5px;
  margin-top: 2px;
`

function TeamCard({ member, onClick, index = 0 }: { member: TeamMember; onClick: (member: TeamMember) => void; index?: number }) {
  const [hovered, setHovered] = useState(false)
  const clickable = Boolean(member.bio)
  const reveal = useReveal({ delay: (index % 4) * 0.06, y: 14 })
  return (
    <CardWrapper
      ref={reveal.ref}
      onClick={clickable ? () => onClick(member) : undefined}
      onMouseEnter={() => clickable && setHovered(true)}
      onMouseLeave={() => clickable && setHovered(false)}
      $clickable={clickable}
      style={reveal.style}
    >
      <CardPhotoFrame $hovered={hovered}>
        {member.img && <PhotoImg src={resolveImg(member.img)} alt={member.name} />}
      </CardPhotoFrame>
      <CardInfo>
        <CardName>{member.name}</CardName>
        {member.degree && ([] as string[]).concat(member.degree).map((d, i) => (
          <CardDegree key={i}>{d}</CardDegree>
        ))}
        {member.role && <CardRole>{member.role}</CardRole>}
      </CardInfo>
    </CardWrapper>
  )
}

const FOUNDER_ORDER = ['Adriana Falcão', 'João Garcia']

function degreeRank(degree: string | string[] = '') {
  const text = ([] as string[]).concat(degree).join(' ')
  if (text.includes('PhD')) return 0
  if (text.includes('MSc')) return 1
  return 2
}

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 56px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Tagline = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 26.25px;
  color: ${tokens.text};
`

const SectionHeading = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 300;
  line-height: 1.15;
  color: ${tokens.navy};
  text-align: right;
  font-style: italic;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const HeadingEmphasis = styled.span`
  font-weight: 600;
  text-decoration: underline;
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 48px 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const GroupHeading = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${tokens.navy};
  margin-top: 64px;
  margin-bottom: 28px;
`

export default function TeamSection({ team }: { team?: TeamMember[] } = {}) {
  const { t, lang } = useLang()
  const { tagline, heading, groups } = t.TEAM_CONTENT
  const [selected, setSelected] = useState<TeamMember | null>(null)

  const teamData = team ?? t.TEAM

  const founders = teamData
    .filter((m: TeamMember) => m.group === 'founders')
    .sort((a: TeamMember, b: TeamMember) => FOUNDER_ORDER.indexOf(a.name) - FOUNDER_ORDER.indexOf(b.name))
  const researchers = teamData
    .filter((m: TeamMember) => m.group === 'researchers')
    .sort((a: TeamMember, b: TeamMember) => degreeRank(a.degree) - degreeRank(b.degree) || a.name.localeCompare(b.name, 'pt-BR'))
  const medical = teamData
    .filter((m: TeamMember) => m.group === 'medical')
    .sort((a: TeamMember, b: TeamMember) => a.name.localeCompare(b.name, 'pt-BR'))

  const researchersLabel = groups?.researchers ?? 'Pesquisadores e Especialistas em IA'
  const medicalLabel = groups?.medical ?? 'Conselho Médico'
  const introReveal = useReveal()

  return (
    <Section id="sobre" bg="lightGrey" spacing="md">
      <Container maxWidth="content">
        <IntroGrid ref={introReveal.ref} style={introReveal.style}>
          <Tagline>{tagline}</Tagline>
          <SectionHeading>
            {heading.before}
            <HeadingEmphasis>{heading.emphasis}</HeadingEmphasis>
            {heading.end}
          </SectionHeading>
        </IntroGrid>

        <TeamGrid>
          {founders.map((m: TeamMember, i: number) => (
            <TeamCard key={m.name} member={m} onClick={setSelected} index={i} />
          ))}
        </TeamGrid>

        {researchers.length > 0 && (
          <>
            <GroupHeading>{researchersLabel}</GroupHeading>
            <TeamGrid>
              {researchers.map((m: TeamMember, i: number) => (
                <TeamCard key={m.name} member={m} onClick={setSelected} index={i} />
              ))}
            </TeamGrid>
          </>
        )}

        {medical.length > 0 && (
          <>
            <GroupHeading>{medicalLabel}</GroupHeading>
            <TeamGrid>
              {medical.map((m: TeamMember, i: number) => (
                <TeamCard key={m.name} member={m} onClick={setSelected} index={i} />
              ))}
            </TeamGrid>
          </>
        )}
      </Container>

      {selected && <TeamModal member={selected} onClose={() => setSelected(null)} lang={lang} />}
    </Section>
  )
}
