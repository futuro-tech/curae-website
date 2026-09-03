import { describe, it, expect } from 'vitest'
import { describeChanges } from '../diff'
import type { JsonValue } from '../JsonEditor'

describe('describeChanges', () => {
  it('returns no lines when nothing changed', () => {
    const value = { NAV: { cta: 'Agende uma conversa' } }
    expect(describeChanges(value, value)).toEqual([])
    expect(describeChanges(value, JSON.parse(JSON.stringify(value)))).toEqual([])
  })

  it('describes a plain field change with its label breadcrumb', () => {
    const before = { NAV: { cta: 'Agende uma conversa' } }
    const after = { NAV: { cta: 'Fale com a gente' } }
    expect(describeChanges(before, after)).toEqual(['Nav › Texto do botão atualizado'])
  })

  it('matches array items by identity, so a pure reorder produces no lines', () => {
    const before = [
      { name: 'Ana', role: 'CEO' },
      { name: 'Bruno', role: 'CTO' },
    ]
    const after = [
      { name: 'Bruno', role: 'CTO' },
      { name: 'Ana', role: 'CEO' },
    ]
    expect(describeChanges(before, after)).toEqual([])
  })

  it('reports only the real edit when an unrelated reorder happens alongside it', () => {
    const before = [
      { name: 'Ana', role: 'CEO' },
      { name: 'Bruno', role: 'CTO' },
      { name: 'Carla', role: 'CFO' },
    ]
    const after = [
      { name: 'Bruno', role: 'CTO' },
      { name: 'Ana', role: 'CEO' },
      { name: 'Carla', role: 'Chief Financial Officer' },
    ]
    expect(describeChanges(before, after)).toEqual(['Carla › Cargo atualizado'])
  })

  it('reports an added array item once, without diffing its individual fields', () => {
    const before = [{ name: 'Ana', role: 'CEO' }]
    const after = [
      { name: 'Ana', role: 'CEO' },
      { name: 'Bruno', role: 'CTO' },
    ]
    expect(describeChanges(before, after)).toEqual(['Bruno adicionado'])
  })

  it('reports a removed array item once', () => {
    const before = [
      { name: 'Ana', role: 'CEO' },
      { name: 'Bruno', role: 'CTO' },
    ]
    const after = [{ name: 'Ana', role: 'CEO' }]
    expect(describeChanges(before, after)).toEqual(['Bruno removido'])
  })

  it('names the containing section for changes inside a nested array', () => {
    const before = { NAV: { links: [{ label: 'Produtos', href: '#produtos' }] } }
    const after = { NAV: { links: [{ label: 'Produtos', href: '#produtos-section' }] } }
    expect(describeChanges(before, after)).toEqual(['Nav › Links do menu › Produtos › Link (URL) atualizado'])
  })

  it('falls back to positional comparison for arrays with no identity field', () => {
    const before = ['a', 'b', 'c']
    const after = ['a', 'x', 'c']
    expect(describeChanges(before, after)).toEqual(['Item 2 atualizado'])
  })

  it('falls back to positional comparison when identity keys collide', () => {
    const before = [{ name: 'dup' }, { name: 'dup' }]
    const after = [{ name: 'dup' }, { name: 'changed' }]
    // Both entries share name "dup" before the edit, so identity matching is
    // unreliable and it falls back to a positional, field-level diff instead.
    expect(describeChanges(before, after)).toEqual(['dup › Nome atualizado'])
  })

  it('reports an added top-level object key', () => {
    const before: JsonValue = { NAV: {} }
    const after: JsonValue = { NAV: {}, HERO: {} }
    expect(describeChanges(before, after)).toEqual(['Hero adicionado'])
  })

  it('falls back to a generic message instead of throwing on incompatible shapes', () => {
    const before = { NAV: 'a string' }
    const after = { NAV: ['now', 'an', 'array'] }
    expect(() => describeChanges(before, after)).not.toThrow()
    expect(describeChanges(before, after).length).toBeGreaterThan(0)
  })
})
