import { createContext, useContext, useState } from 'react'
import { PRODUCTS } from '../data/products'
import { TEAM as TEAM_BASE } from '../data/team'
import * as PT from '../i18n/pt'
import * as EN from '../i18n/en'

function build(data, icons, teamBase) {
  const products = data.PRODUCTS_TEXT
    ? data.PRODUCTS_TEXT.map((p, i) => ({ ...p, icon: icons[i].icon }))
    : icons
  const team = data.TEAM
    ? data.TEAM.map((overrides, i) => ({ ...teamBase[i], ...overrides }))
    : teamBase
  return { ...data, PRODUCTS: products, TEAM: team }
}

const CONTENT = {
  pt: build(PT, PRODUCTS, TEAM_BASE),
  en: build(EN, PRODUCTS, TEAM_BASE),
}

export const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('curae-lang')
    return saved === 'en' ? 'en' : 'pt'
  })

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
