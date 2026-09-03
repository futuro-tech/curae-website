import { describe, it, expect } from 'vitest'
import fs from 'fs'

describe('i18n', () => {
  it('PT and EN content should have matching top-level keys', () => {
    const pt = JSON.parse(fs.readFileSync('./src/i18n/pt.js', 'utf8').replace('export default ', ''))
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
})
