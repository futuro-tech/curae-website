import { describe, it, expect } from 'vitest'
import { labelFor } from '../labels'
import { summaryFor } from '../JsonEditor'

describe('labelFor', () => {
  it('uses the curated Portuguese label when one is known', () => {
    expect(labelFor('cta')).toBe('Texto do botão')
    expect(labelFor('href')).toBe('Link (URL)')
  })

  it('falls back to a humanized, capitalized version of unknown keys', () => {
    expect(labelFor('NAV')).toBe('Nav')
    expect(labelFor('someCamelCaseKey')).toBe('Some camel case key')
    expect(labelFor('snake_case_key')).toBe('Snake case key')
  })
})

describe('summaryFor', () => {
  it('picks the first preferred identity field present', () => {
    expect(summaryFor({ name: 'Ana', role: 'CEO' }, 0)).toBe('Ana')
    expect(summaryFor({ title: 'Something', role: 'CEO' }, 0)).toBe('Something')
  })

  it('falls back to any string field when no preferred key matches', () => {
    expect(summaryFor({ href: '/carreiras', other: 1 }, 0)).toBe('/carreiras')
  })

  it('falls back to a positional label when nothing usable is found', () => {
    expect(summaryFor({ count: 3 }, 2)).toBe('Item 3')
    expect(summaryFor('just a string', 0)).toBe('Item 1')
  })
})
