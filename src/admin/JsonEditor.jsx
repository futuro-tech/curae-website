import { labelFor } from './labels'

function isPrimitive(v) {
  return v === null || typeof v !== 'object'
}

function blankLike(item) {
  if (isPrimitive(item)) return typeof item === 'number' ? 0 : ''
  if (Array.isArray(item)) return []
  const blank = {}
  for (const k of Object.keys(item)) blank[k] = blankLike(item[k])
  return blank
}

const inputStyle = {
  width: '100%',
  fontSize: 14,
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #CBD5E0',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const warnStyle = { ...inputStyle, borderColor: '#DD8A1A', background: '#FFFBF0' }

const btnStyle = {
  fontSize: 12,
  padding: '4px 8px',
  borderRadius: 6,
  border: '1px solid #CBD5E0',
  background: '#fff',
  cursor: 'pointer',
}

function PrimitiveEditor({ value, original, onChange }) {
  const str = value === null || value === undefined ? '' : String(value)
  const isLong = str.length > 120 || str.includes('\n')
  const wasFilled = typeof original === 'string' && original.trim() !== ''
  const nowEmpty = str.trim() === '' && wasFilled

  if (typeof value === 'boolean') {
    return <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
  }

  if (isLong) {
    return (
      <textarea
        value={str}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(10, Math.max(3, Math.ceil(str.length / 60)))}
        style={nowEmpty ? warnStyle : inputStyle}
      />
    )
  }
  return (
    <input
      type="text"
      value={str}
      onChange={(e) => onChange(e.target.value)}
      style={nowEmpty ? warnStyle : inputStyle}
    />
  )
}

function ObjectFields({ value, original, onChange, depth }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        paddingLeft: depth > 0 ? 14 : 0,
        borderLeft: depth > 0 ? '2px solid #EDF2F7' : 'none',
      }}
    >
      {Object.keys(value).map((key) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#4A5568' }}>{labelFor(key)}</label>
          <ValueEditor
            value={value[key]}
            original={original ? original[key] : undefined}
            depth={depth + 1}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        </div>
      ))}
    </div>
  )
}

function ArrayEditor({ value, original, onChange, depth }) {
  const isPrimitiveArray = value.every(isPrimitive)

  function update(i, next) {
    const copy = value.slice()
    copy[i] = next
    onChange(copy)
  }
  function remove(i) {
    if (!window.confirm('Remover este item da lista?')) return
    onChange(value.filter((_, idx) => idx !== i))
  }
  function move(i, dir) {
    const j = i + dir
    if (j < 0 || j >= value.length) return
    const copy = value.slice()
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    onChange(copy)
  }
  function add() {
    const template = value.length > 0 ? blankLike(value[value.length - 1]) : isPrimitiveArray ? '' : {}
    onChange([...value, template])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {value.map((item, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            padding: isPrimitiveArray ? '4px 8px' : 12,
            display: 'flex',
            gap: 10,
            alignItems: isPrimitiveArray ? 'center' : 'flex-start',
            background: isPrimitiveArray ? 'transparent' : '#FAFBFC',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <ValueEditor
              value={item}
              original={Array.isArray(original) ? original[i] : undefined}
              depth={depth + 1}
              onChange={(next) => update(i, next)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
            <button type="button" style={btnStyle} onClick={() => move(i, -1)} disabled={i === 0}>
              ↑
            </button>
            <button type="button" style={btnStyle} onClick={() => move(i, 1)} disabled={i === value.length - 1}>
              ↓
            </button>
            <button type="button" style={{ ...btnStyle, color: '#C53030' }} onClick={() => remove(i)}>
              Remover
            </button>
          </div>
        </div>
      ))}
      <button type="button" style={{ ...btnStyle, alignSelf: 'flex-start' }} onClick={add}>
        + Adicionar item
      </button>
    </div>
  )
}

export function ValueEditor({ value, original, onChange, depth = 0 }) {
  if (Array.isArray(value)) {
    return <ArrayEditor value={value} original={original} onChange={onChange} depth={depth} />
  }
  if (value !== null && typeof value === 'object') {
    return <ObjectFields value={value} original={original} onChange={onChange} depth={depth} />
  }
  return <PrimitiveEditor value={value} original={original} onChange={onChange} />
}

export default function JsonEditor({ value, original, onChange }) {
  return <ValueEditor value={value} original={original} onChange={onChange} depth={0} />
}
