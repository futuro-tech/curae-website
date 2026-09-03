import styled from 'styled-components'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import { Section, Container, tokens } from '../components/styled'

const HASSAN_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/505760c7436e51894b22ecc5f5665f883830b103?width=2976'

const BackgroundImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  min-width: 900px;
  object-fit: cover;
  mix-blend-mode: multiply;
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
`

const ContentWrapper = styled(Container)`
  position: relative;
`

const Paragraph1 = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 500;
  line-height: 1.15;
  color: #000;
  margin-bottom: 24px;
`

const Paragraph2 = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(22px, 3vw, 34px);
  font-weight: 400;
  line-height: 1.55;
  color: ${tokens.navy};
  max-width: 820px;
`

const Emphasis = styled.span`
  font-weight: 600;
  text-decoration: underline;
`

export default function PositioningSection() {
  const { t } = useLang()
  const { paragraph1, paragraph2 } = t.POSITIONING
  const reveal1 = useReveal<HTMLParagraphElement>()
  const reveal2 = useReveal<HTMLParagraphElement>({ delay: 0.1 })

  return (
    <Section bg="white" spacing="lg">
      <BackgroundImg src={HASSAN_IMG} alt="" aria-hidden />
      <ContentWrapper maxWidth="narrow">
        <Paragraph1 ref={reveal1.ref} style={reveal1.style}>
          {paragraph1}
        </Paragraph1>
        <Paragraph2 ref={reveal2.ref} style={reveal2.style}>
          {paragraph2.text}
          <Emphasis>{paragraph2.emphasis}</Emphasis>
        </Paragraph2>
      </ContentWrapper>
    </Section>
  )
}
