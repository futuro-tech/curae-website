import { createContext, useContext, useState, type ReactNode } from 'react'
import TEAM_BASE from '../data/team.json'
import * as PT from '../i18n/pt'
import EN from '../i18n/en.json'

type Lang = 'pt' | 'en'

interface TeamMember {
  name: string
  [key: string]: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function build(data: any, teamBase: TeamMember[]) {
  const team: TeamMember[] = data.TEAM
    ? teamBase.map(base => {
        const overrides = data.TEAM.find((o: TeamMember) => o.name === base.name)
        return overrides ? { ...base, ...overrides } : base
      })
    : teamBase
  return { ...data, TEAM: team }
}

const CONTENT = {
  pt: build(PT, TEAM_BASE as TeamMember[]),
  en: build(EN, TEAM_BASE as TeamMember[]),
}

export interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  // Content shape is driven by JSON translation files without a formal schema.
  t: typeof CONTENT.pt
}

export const LangContext = createContext<LangContextValue | null>(null)

function detectLang(): Lang {
  const saved = localStorage.getItem('curae-lang')
  if (saved === 'en' || saved === 'pt') return saved
  const browserLang = navigator.language || ''
  return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang)

  function handleSetLang(l: Lang) {
    localStorage.setItem('curae-lang', l)
    setLang(l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: CONTENT[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LangProvider')
  return ctx
}
