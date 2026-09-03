import { useState } from 'react'
import styled from 'styled-components'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import { Section, Container, Heading, Text, tokens } from '../components/styled'

const BENEFITS_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9f892727f73a1543d44c80bc224d6cb56f373fed?width=256'

const BenefitsWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const IconImg = styled.img`
  width: 64px;
  height: auto;
  margin-bottom: 28px;
`

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BenefitsHeading = styled(Heading)`
  font-weight: 400;
  max-width: 520px;
  margin-bottom: 16px;
`

const BenefitsDescription = styled(Text)`
  max-width: 460px;
  margin-bottom: 44px;
`

const BenefitBox = styled.div<{ $hovered: boolean }>`
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.$hovered ? '#E2EAF0' : tokens.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  transform: ${props => props.$hovered ? 'translateY(-3px)' : 'translateY(0)'};
  box-shadow: ${props => props.$hovered ? '0 8px 24px rgba(13,27,42,0.10)' : 'none'};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  cursor: default;
`

const BenefitText = styled.p<{ $hovered: boolean }>`
  font-size: 15px;
  font-weight: ${props => props.$hovered ? 500 : 400};
  line-height: 1.55;
  color: ${props => props.$hovered ? tokens.navy : tokens.text};
  text-align: center;
  white-space: pre-line;
  transition: color 0.2s ease, font-weight 0.2s ease;
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 780px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

function BenefitBoxComponent({ text, index }: { text: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  const reveal = useReveal({ delay: index * 0.08 })
  return (
    <BenefitBox
      ref={reveal.ref}
      $hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={reveal.style}
    >
      <BenefitText $hovered={hovered}>{text}</BenefitText>
    </BenefitBox>
  )
}

export default function BenefitsSection() {
  const { t } = useLang()
  const BENEFITS = t.BENEFITS
  const headingReveal = useReveal()

  return (
    <Section id="tecnologia" bg="offWhite" spacing="lg">
      <BenefitsWrapper maxWidth="content">
        <IconImg src={BENEFITS_IMG} alt="" />

        <HeadingWrapper ref={headingReveal.ref} style={headingReveal.style}>
          <BenefitsHeading as="h2" size="md" font="serif">
            {BENEFITS.heading}
          </BenefitsHeading>
          <BenefitsDescription size="md">{BENEFITS.description}</BenefitsDescription>
        </HeadingWrapper>

        <BenefitsGrid>
          {BENEFITS.boxes.map((text: string, i: number) => (
            <BenefitBoxComponent key={text} text={text} index={i} />
          ))}
        </BenefitsGrid>
      </BenefitsWrapper>
    </Section>
  )
}
