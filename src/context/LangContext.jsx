import { createContext, useContext, useState } from 'react'
import TEAM_BASE from '../data/team.json'
import * as PT from '../i18n/pt'
import EN from '../i18n/en.json'

function build(data, teamBase) {
  const team = data.TEAM
    ? teamBase.map(base => {
        const overrides = data.TEAM.find(o => o.name === base.name)
        return overrides ? { ...base, ...overrides } : base
      })
    : teamBase
  return { ...data, TEAM: team }
}

const CONTENT = {
  pt: build(PT, TEAM_BASE),
  en: build(EN, TEAM_BASE),
}

export const LangContext = createContext(null)

function detectLang() {
  const saved = localStorage.getItem('curae-lang')
  if (saved === 'en' || saved === 'pt') return saved
  const browserLang = navigator.language || navigator.userLanguage || ''
  return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  function handleSetLang(l) {
    localStorage.setItem('curae-lang', l)
    setLang(l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: CONTENT[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
