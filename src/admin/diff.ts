import { labelFor } from './labels'
import { summaryFor, type JsonValue } from './JsonEditor'

function sameValue(a: JsonValue, b: JsonValue): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

const IDENTITY_KEYS = ['id', 'name', 'title', 'label', 'q', 'heading']

// Used to match array items across before/after by identity rather than
// position, so a reorder (or an add/remove elsewhere in the list) doesn't
// get misread as every item after it having changed.
function identityKey(item: JsonValue): string | null {
  if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
    const obj = item as { [key: string]: JsonValue }
    for (const key of IDENTITY_KEYS) {
      const v = obj[key]
      if (typeof v === 'string' && v.trim()) return `${key}:${v}`
    }
  }
  return null
}

function crumbFor(root: JsonValue, path: (string | number)[]): string {
  let node = root
  const labels: string[] = []
  for (const seg of path) {
    if (Array.isArray(node)) {
      const idx = Number(seg)
      labels.push(summaryFor(node[idx], idx))
      node = node[idx]
    } else if (node !== null && typeof node === 'object') {
      const obj = node as { [key: string]: JsonValue }
      labels.push(labelFor(String(seg)))
      node = obj[String(seg)]
    } else {
      break
    }
  }
  return labels.join(' › ')
}

export function describeChanges(before: JsonValue, after: JsonValue): string[] {
  const lines: string[] = []

  function walk(b: JsonValue, a: JsonValue, path: (string | number)[]) {
    if (sameValue(b, a)) return

    if (Array.isArray(b) && Array.isArray(a)) {
      const bKeys = b.map(identityKey)
      const aKeys = a.map(identityKey)
      const keyed =
        bKeys.every((k) => k !== null) &&
        aKeys.every((k) => k !== null) &&
        new Set(bKeys).size === bKeys.length &&
        new Set(aKeys).size === aKeys.length

      if (keyed) {
        const bIndexByKey = new Map<string, number>()
        bKeys.forEach((k, i) => bIndexByKey.set(k as string, i))
        const aIndexByKey = new Map<string, number>()
        aKeys.forEach((k, i) => aIndexByKey.set(k as string, i))
        const crumb = crumbFor(before, path)
        const prefix = crumb ? `${crumb} — ` : ''

        for (const [key, bi] of bIndexByKey) {
          if (!aIndexByKey.has(key)) {
            lines.push(`${prefix}${summaryFor(b[bi], bi)} removido`)
          }
        }
        for (const [key, ai] of aIndexByKey) {
          const bi = bIndexByKey.get(key)
          if (bi === undefined) {
            lines.push(`${prefix}${summaryFor(a[ai], ai)} adicionado`)
          } else {
            walk(b[bi], a[ai], [...path, bi])
          }
        }
        return
      }

      // No reliable identity to match on (primitives, or duplicate/missing
      // keys) — fall back to comparing items by position.
      const max = Math.max(b.length, a.length)
      for (let i = 0; i < max; i++) {
        if (i >= b.length) {
          const crumb = crumbFor(before, path)
          lines.push(`${crumb ? `${crumb} — ` : ''}${summaryFor(a[i], i)} adicionado`)
        } else if (i >= a.length) {
          const crumb = crumbFor(before, path)
          lines.push(`${crumb ? `${crumb} — ` : ''}${summaryFor(b[i], i)} removido`)
        } else {
          walk(b[i], a[i], [...path, i])
        }
      }
      return
    }

    if (
      b !== null &&
      a !== null &&
      typeof b === 'object' &&
      typeof a === 'object' &&
      !Array.isArray(b) &&
      !Array.isArray(a)
    ) {
      const bObj = b as { [key: string]: JsonValue }
      const aObj = a as { [key: string]: JsonValue }
      const keys = new Set([...Object.keys(bObj), ...Object.keys(aObj)])
      for (const key of keys) {
        if (!(key in bObj)) {
          lines.push(`${crumbFor(before, [...path, key])} adicionado`)
        } else if (!(key in aObj)) {
          lines.push(`${crumbFor(before, [...path, key])} removido`)
        } else {
          walk(bObj[key], aObj[key], [...path, key])
        }
      }
      return
    }

    const crumb = crumbFor(before, path)
    lines.push(`${crumb || 'Conteúdo'} atualizado`)
  }

  try {
    walk(before, after, [])
  } catch {
    return ['Conteúdo atualizado']
  }
  return lines
}
