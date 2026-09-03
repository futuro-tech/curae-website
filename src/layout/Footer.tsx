import styled from 'styled-components'
import CuraeLogo from '../components/CuraeLogo'
import PartnersLogos from '../components/PartnersLogos'
import PARTNERS from '../data/partners.json'
import { useLang } from '../context/LangContext'
import { Container, tokens } from '../components/styled'

const col = (opacity: number) => `rgba(255,255,255,${opacity})`

const FooterEl = styled.footer`
  background: ${tokens.footerBg};
  border-top: 0.5px solid rgba(255,255,255,0.08);
  padding: clamp(40px, 5vw, 48px) var(--section-px);
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 48px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Tagline = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${col(0.4)};
  line-height: 18px;
`

const Description = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20.8px;
  color: ${col(0.5)};
  max-width: 300px;
`

const SocialsRow = styled.div`
  display: flex;
  gap: 12px;
`

const SocialLink = styled.a`
  color: ${col(0.4)};
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  transition: color 0.15s;

  &:hover {
    color: ${col(0.8)};
  }
`

const ProductsCol = styled.div`
  min-width: 220px;
`

const AddressCol = styled.div`
  min-width: 180px;
`

const ColLabel = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: ${col(0.3)};
  letter-spacing: 0.88px;
  text-transform: uppercase;
  margin-bottom: 16px;
`

const ProductLink = styled.a`
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: ${col(0.5)};
  line-height: 19.5px;
  padding-top: 10px;
  transition: color 0.15s;
  cursor: pointer;

  &:hover {
    color: ${col(0.85)};
  }
`

const AddressText = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: ${col(0.5)};
  line-height: 20.8px;
`

const PartnersRow = styled.div`
  border-top: 0.5px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  display: flex;
  align-items: center;
  gap: 26px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`

const PartnersLabel = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: ${col(0.25)};
  letter-spacing: 0.7px;
  text-transform: uppercase;
`

const BottomRow = styled.div`
  border-top: 0.5px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`

const Copyright = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: ${col(0.25)};
  line-height: 18px;
`

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
`

const LegalLink = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: ${col(0.25)};
  line-height: 18px;
  transition: color 0.15s;

  &:hover {
    color: ${col(0.6)};
  }
`

export default function Footer() {
  const { t } = useLang()
  const { tagline, description, socials, sections, productLinks, legalLinks, address, copyright } = t.FOOTER_CONTENT

  return (
    <FooterEl>
      <Container maxWidth="content">
        <TopRow>
          <BrandCol>
            <CuraeLogo variant="light" width={80} height={20} />
            <Tagline>{tagline}</Tagline>
            <Description>{description}</Description>
            <SocialsRow>
              {socials.map(({ label, href }: { label: string; href: string }) => (
                <SocialLink key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </SocialLink>
              ))}
            </SocialsRow>
          </BrandCol>

          <ProductsCol>
            <ColLabel>{sections.products}</ColLabel>
            {productLinks.map((p: { id: string; name: string }) => (
              <ProductLink
                key={p.id}
                href="#produtos-section"
                onClick={e => {
                  e.preventDefault()
                  window.history.pushState(null, '', `#produto-${p.id}`)
                  window.dispatchEvent(new HashChangeEvent('hashchange'))
                  document.getElementById('produtos-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {p.name}
              </ProductLink>
            ))}
          </ProductsCol>

          <AddressCol>
            <ColLabel>{sections.address}</ColLabel>
            <AddressText>
              {address[0]}<br />{address[1]}
            </AddressText>
          </AddressCol>
        </TopRow>

        <PartnersRow>
          <PartnersLabel>{sections.partners}</PartnersLabel>
          <PartnersLogos partners={PARTNERS.footer} gap={14} />
        </PartnersRow>

        <BottomRow>
          <Copyright>{copyright}</Copyright>
          <LegalLinks>
            {legalLinks.map((link: string) => (
              <LegalLink key={link} href="#">{link}</LegalLink>
            ))}
          </LegalLinks>
        </BottomRow>
      </Container>
    </FooterEl>
  )
}
