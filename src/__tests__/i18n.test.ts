import { describe, it, expect } from 'vitest'
import fs from 'fs'

describe('i18n', () => {
  it('PT and EN content should have matching top-level keys', () => {
    const pt = JSON.parse(fs.readFileSync('./src/data/content.json', 'utf8'))
    const en = JSON.parse(fs.readFileSync('./src/i18n/en.json', 'utf8'))

    const ptKeys = Object.keys(pt).sort()
    const enKeys = Object.keys(en).sort()

    // TEAM is optional in PT (uses team.json as base)
    const ptKeysFiltered = ptKeys.filter(k => k !== 'TEAM')
    const enKeysFiltered = enKeys.filter(k => k !== 'TEAM')

    expect(ptKeysFiltered).toEqual(enKeysFiltered)
  })

  it('Content files should be valid JSON', () => {
    expect(() => {
      JSON.parse(fs.readFileSync('./src/i18n/en.json', 'utf8'))
    }).not.toThrow()
  })

  it('pt.ts re-exports every top-level key from content.json', () => {
    // pt.ts destructures a fixed list of keys off content.json (see LangContext,
    // which imports it as `* as PT`) — a key added to content.json but not to
    // that list would silently never reach the PT site.
    const content = JSON.parse(fs.readFileSync('./src/data/content.json', 'utf8'))
    const ptSource = fs.readFileSync('./src/i18n/pt.ts', 'utf8')

    for (const key of Object.keys(content)) {
      expect(ptSource).toContain(key)
    }
  })
})
