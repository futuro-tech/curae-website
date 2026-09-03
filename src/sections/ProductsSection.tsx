import { useState } from 'react'
import styled from 'styled-components'
import { useLang } from '../context/LangContext'
import PRODUCT_GROUPS from '../data/productGroups.json'
import { useReveal } from '../hooks/useReveal'
import { Section, Container, tokens } from '../components/styled'

const Capsule = styled.div<{ $bg: string; $hovered: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px;
  border-radius: 6px;
  background: ${props => props.$bg};
  width: 100%;
  max-width: 300px;
  transform: ${props => props.$hovered ? 'translateY(-2px)' : 'translateY(0)'};
  box-shadow: ${props => props.$hovered ? '0 6px 16px rgba(13,27,42,0.08)' : 'none'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`

const CapsuleIcon = styled.img<{ $hovered: boolean }>`
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  transform: ${props => props.$hovered ? 'scale(1.1)' : 'scale(1)'};
  transition: transform 0.2s ease;
`

const CapsuleText = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
  color: ${tokens.text};
`

const ProductRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  flex-wrap: wrap;
`

const ProductInfo = styled.div`
  flex: 1 1 300px;
  min-width: 260px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ProductName = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 600;
  color: #000;
`

const ProductHeading = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 400;
  line-height: 1.15;
  color: #000;
`

const ProductDescription = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 15.5px;
  line-height: 1.6;
  color: ${tokens.text};
  max-width: 330px;
`

const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;
  flex: 0 0 auto;
  width: 100%;
  max-width: 300px;
`

const Divider = styled.div`
  height: 1px;
  background: #C0CBD4;
  opacity: 0.4;
  margin-bottom: 32px;
`

const ProductsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const ProductsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const ProductGroupCard = styled.div`
  border: 0.5px solid ${tokens.border};
  border-radius: 8px;
  background: #fff;
  padding: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px);
`

const GroupBadge = styled.span<{ $bg: string; $text: string }>`
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 2px;
  background: ${props => props.$bg};
  color: ${props => props.$text};
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 24px;
`

const HeadingSection = styled.div`
  text-align: center;
  margin-bottom: 56px;
`

const SectionHeading = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 4.5vw, 42px);
  line-height: 1.2;
  color: ${tokens.navy};
`

const HeadingLight = styled.span`
  font-weight: 300;
`

const HeadingBold = styled.span`
  font-weight: 700;
`

const Subheading = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${tokens.text};
  margin-top: 16px;
`

interface Benefit {
  icon: string
  text: string
}

interface ProductGroup {
  id: string
  badge: string
  bg: string
  text: string
  products: Product[]
}

interface Product {
  id: string
  name: string
  heading: string
  description: string
  benefits: Benefit[]
}

function BenefitCapsule({ icon, text, bg }: { icon: string; text: string; bg: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Capsule
      $hovered={hovered}
      $bg={bg}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CapsuleIcon src={icon} alt="" $hovered={hovered} />
      <CapsuleText>{text}</CapsuleText>
    </Capsule>
  )
}

function ProductRow({ product, group }: { product: Product; group: ProductGroup }) {
  return (
    <ProductRowWrapper>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductHeading>{product.heading}</ProductHeading>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductInfo>
      <BenefitsContainer>
        {product.benefits.map((b: Benefit) => (
          <BenefitCapsule key={b.text} icon={b.icon} text={b.text} bg={group.bg} />
        ))}
      </BenefitsContainer>
    </ProductRowWrapper>
  )
}

function ProductGroupCardComponent({ group, index }: { group: ProductGroup; index: number }) {
  const reveal = useReveal({ delay: index * 0.08 })
  return (
    <ProductGroupCard ref={reveal.ref} style={reveal.style}>
      <GroupBadge $bg={group.bg} $text={group.text}>{group.badge}</GroupBadge>
      <ProductsGrid>
        {group.products.map((p: Product, i: number) => (
          <div key={p.id}>
            {i > 0 && <Divider />}
            <ProductRow product={p} group={group} />
          </div>
        ))}
      </ProductsGrid>
    </ProductGroupCard>
  )
}

export default function ProductsSection({ productGroups }: { productGroups?: typeof PRODUCT_GROUPS } = {}) {
  const { t, lang } = useLang()
  const { heading, subheading } = t.PRODUCTS_SECTION
  const groups = lang === 'pt' ? (productGroups ?? PRODUCT_GROUPS).pt : (productGroups ?? PRODUCT_GROUPS).en
  const headingReveal = useReveal()

  return (
    <Section id="produtos-section" bg="lightGrey" spacing="lg">
      <Container maxWidth="wide">
        <HeadingSection ref={headingReveal.ref} style={headingReveal.style}>
          <SectionHeading>
            <HeadingLight>{heading.before}</HeadingLight>
            <HeadingBold>{heading.emphasis}</HeadingBold>
            {heading.end}
          </SectionHeading>
          <Subheading>{subheading}</Subheading>
        </HeadingSection>

        <ProductsListWrapper>
          {groups.map((group: ProductGroup, i: number) => (
            <ProductGroupCardComponent key={group.id} group={group} index={i} />
          ))}
        </ProductsListWrapper>
      </Container>
    </Section>
  )
}
