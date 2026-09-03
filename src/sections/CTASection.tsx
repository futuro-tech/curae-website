import styled from 'styled-components'
import PartnersLogos from '../components/PartnersLogos'
import PARTNERS from '../data/partners.json'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import { Section, Container, tokens } from '../components/styled'

const CTACard = styled.div`
  background: #fff;
  border: 0.5px solid ${tokens.border};
  border-radius: 8px;
  padding: clamp(40px, 5vw, 72px) clamp(32px, 5vw, 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CTAHeading = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 300;
  color: ${tokens.navy};
  text-align: center;
  line-height: 1.1;
  margin-bottom: 24px;
`

const CTAEmphasis = styled.span`
  font-weight: 600;
`

const CTADescription = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  color: ${tokens.text};
  text-align: center;
  max-width: 560px;
  margin-bottom: 40px;
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 4px;
  background: ${tokens.navy};
  color: ${tokens.offWhite};
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 22.5px;
  margin-bottom: 48px;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
  white-space: nowrap;
  text-align: center;

  &:hover {
    background: ${tokens.hoverNavy};
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 10px 24px rgba(13,27,42,0.20);
  }

  @media (max-width: 560px) {
    width: 100%;
    white-space: normal;
    font-size: 14px;
    padding: 14px 20px;
  }
`

const PartnersFooter = styled.div`
  width: 100%;
  border-top: 0.5px solid ${tokens.border};
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const PartnersLabel = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${tokens.muted};
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

const PartnersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default function CTASection({ partners }: { partners?: typeof PARTNERS } = {}) {
  const { t } = useLang()
  const { heading, description, button, partnersLabel } = t.CTA_CONTENT
  const reveal = useReveal()

  return (
    <Section id="contato" bg="lightGrey" spacing="sm">
      <Container maxWidth="cta">
        <CTACard ref={reveal.ref} style={reveal.style}>
          <CTAHeading>
            {heading.before}
            <CTAEmphasis>{heading.emphasis}</CTAEmphasis>
          </CTAHeading>

          <CTADescription>{description}</CTADescription>

          <CTAButton href={button.href} target="_blank" rel="noopener noreferrer">
            {button.label}
          </CTAButton>

          <PartnersFooter>
            <PartnersLabel>{partnersLabel}</PartnersLabel>
            <PartnersRow>
              <PartnersLogos partners={(partners ?? PARTNERS).cta} gap={34} />
            </PartnersRow>
          </PartnersFooter>
        </CTACard>
      </Container>
    </Section>
  )
}
