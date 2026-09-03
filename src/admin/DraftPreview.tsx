import { GlobalStyle } from '../components/styled'
import { LangContext, build, type LangContextValue } from '../context/LangContext'
import HeroSection from '../sections/HeroSection'
import PositioningSection from '../sections/PositioningSection'
import ProductsSection from '../sections/ProductsSection'
import BenefitsSection from '../sections/BenefitsSection'
import DiferenciaisSection from '../sections/DiferenciaisSection'
import TeamSection from '../sections/TeamSection'
import CTASection from '../sections/CTASection'
import type { JsonValue } from './JsonEditor'
import { PreviewBleed, PreviewNotice } from './styled'

export interface PreviewData {
  content: JsonValue | null
  en: JsonValue | null
  team: JsonValue | null
  productGroups: JsonValue | null
  partners: JsonValue | null
  lang: 'pt' | 'en'
}

export default function DraftPreview({ content, en, team, productGroups, partners, lang }: PreviewData) {
  if (!content || !en || !team || !productGroups || !partners) {
    return <PreviewNotice>Carregando dados para a pré-visualização…</PreviewNotice>
  }

  const teamBase = team as unknown as { name: string; [key: string]: unknown }[]
  const source = lang === 'en' ? en : content
  // The draft data doesn't have a statically known shape (it's JSON edited by hand in the
  // admin), so it can't line up with the site's typed CONTENT import — cast at the boundary.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = build(source as any, teamBase) as LangContextValue['t']

  return (
    <PreviewBleed>
      <GlobalStyle />
      <LangContext.Provider value={{ lang, setLang: () => {}, t }}>
        <HeroSection partners={partners as never} />
        <PositioningSection />
        <ProductsSection productGroups={productGroups as never} />
        <BenefitsSection />
        <DiferenciaisSection />
        <TeamSection team={team as never} />
        <CTASection partners={partners as never} />
      </LangContext.Provider>
    </PreviewBleed>
  )
}
