import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import { labelFor } from './labels'
import { createFile } from './github'
import {
  AddItemButton,
  ArrayItemCard,
  ArrayList,
  ChevronButton,
  DragHandle,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSpanFull,
  FieldStack,
  GroupHeader,
  GroupMeta,
  IconButton,
  IconButtonGroup,
  ImageFieldRow,
  ItemBody,
  ItemHeaderRow,
  ItemSummary,
  ItemSummaryText,
  Spinner,
  TextArea,
  TextInput,
  ThumbBox,
  Toggle,
} from './styled'

const IMAGE_KEYS = new Set(['img', 'icon', 'src'])
const MAX_SOURCE_BYTES = 20 * 1024 * 1024
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
const MAX_DIMENSION = 1600

export interface UploadConfig {
  token: string
  folder: string
}

const UploadContext = createContext<UploadConfig | null>(null)

function resolveImageSrc(src: string): string {
  if (src.startsWith('/')) return (import.meta.env.BASE_URL || '/') + src.slice(1)
  return src
}

function slugifyFilename(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function readBlobAsBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = () => reject(reader.error ?? new Error('Falha ao ler o arquivo'))
    reader.readAsDataURL(blob)
  })
}

// Vector art doesn't benefit from raster resizing, and canvas would rasterize it.
const SKIP_COMPRESSION_TYPES = new Set(['image/svg+xml', 'image/gif'])

async function compressImage(file: File): Promise<{ blob: Blob; ext: string }> {
  const originalExt = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png'
  if (SKIP_COMPRESSION_TYPES.has(file.type) || typeof createImageBitmap !== 'function') {
    return { blob: file, ext: originalExt }
  }

  try {
    const bitmap = await createImageBitmap(file)
    let { width, height } = bitmap
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const scale = MAX_DIMENSION / Math.max(width, height)
      width = Math.round(width * scale)
      height = Math.round(height * scale)
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return { blob: file, ext: originalExt }
    ctx.drawImage(bitmap, 0, 0, width, height)

    // Keep PNG lossless (icons/logos often rely on transparency); re-encode
    // everything else as JPEG, which shrinks photos dramatically.
    const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
    const quality = outType === 'image/jpeg' ? 0.82 : undefined
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outType, quality))
    if (!blob) return { blob: file, ext: originalExt }
    return { blob, ext: outType === 'image/png' ? 'png' : 'jpg' }
  } catch {
    // Decoding failed (corrupt file, unsupported format) — fall back to the original.
    return { blob: file, ext: originalExt }
  }
}

async function uploadImage(file: File, config: UploadConfig): Promise<string> {
  const { blob, ext } = await compressImage(file)
  if (blob.size > MAX_UPLOAD_BYTES) {
    throw new Error('Imagem muito grande mesmo após compressão (máx. 5MB). Tente um arquivo menor.')
  }
  const base64 = await readBlobAsBase64(blob)
  const base = slugifyFilename(file.name.replace(/\.[^.]+$/, '')) || 'imagem'
  const filename = `${base}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const path = `public/${config.folder}/${filename}`
  await createFile(config.token, path, base64, `content: adiciona ${filename} via admin`)
  return `/${config.folder}/${filename}`
}

function ImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
    </svg>
  )
}

function ImageThumb({ src }: { src: string }) {
  const [broken, setBroken] = useState(false)
  useEffect(() => setBroken(false), [src])
  const hasSrc = src.trim() !== ''

  if (!hasSrc || broken) {
    return (
      <ThumbBox $empty>
        <ImageIcon />
      </ThumbBox>
    )
  }

  return (
    <ThumbBox>
      <img
        src={resolveImageSrc(src)}
        alt=""
        onError={() => setBroken(true)}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
    </ThumbBox>
  )
}

function ImageField({
  value,
  onChange,
  warn,
  id,
}: {
  value: string
  onChange: (v: string) => void
  warn?: boolean
  id?: string
}) {
  const upload = useContext(UploadContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    if (!upload) return
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem.')
      return
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setError('Imagem muito grande (máx. 20MB).')
      return
    }
    setUploading(true)
    try {
      const path = await uploadImage(file, upload)
      onChange(path)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao enviar imagem.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <ImageFieldRow>
        <ImageThumb src={value} />
        <TextInput
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          $warn={warn}
        />
        {upload && (
          <>
            <IconButton
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              title="Enviar imagem"
              aria-label="Enviar imagem"
            >
              {uploading ? <Spinner /> : <UploadIcon />}
            </IconButton>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
                e.target.value = ''
              }}
            />
          </>
        )}
      </ImageFieldRow>
      {error && <FieldError>{error}</FieldError>}
    </div>
  )
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

function isPrimitive(v: JsonValue): boolean {
  return v === null || typeof v !== 'object'
}

function blankLike(item: JsonValue): JsonValue {
  if (isPrimitive(item)) return typeof item === 'number' ? 0 : ''
  if (Array.isArray(item)) return []
  const obj = item as { [key: string]: JsonValue }
  const blank: { [key: string]: JsonValue } = {}
  for (const k of Object.keys(obj)) blank[k] = blankLike(obj[k])
  return blank
}

export function summaryFor(item: JsonValue, index: number): string {
  if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
    const obj = item as { [key: string]: JsonValue }
    const preferredKeys = ['name', 'title', 'label', 'headline', 'heading', 'text', 'q', 'role']
    for (const key of preferredKeys) {
      const v = obj[key]
      if (typeof v === 'string' && v.trim()) return v
    }
    const firstString = Object.values(obj).find((v) => typeof v === 'string' && v.trim())
    if (typeof firstString === 'string') return firstString
  }
  return `Item ${index + 1}`
}

function DragIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="6" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="6" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="18" r="1" />
    </svg>
  )
}

function UpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

function DownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

interface EditorProps {
  value: JsonValue
  original?: JsonValue
  onChange: (next: JsonValue) => void
  depth?: number
  fieldKey?: string
  fieldId?: string
}

function PrimitiveEditor({ value, original, onChange, fieldKey, fieldId }: EditorProps) {
  const str = value === null || value === undefined ? '' : String(value)
  const isImage = typeof value === 'string' && !!fieldKey && IMAGE_KEYS.has(fieldKey)
  const isLong = !isImage && (str.length > 120 || str.includes('\n'))
  const wasFilled = typeof original === 'string' && original.trim() !== ''
  const nowEmpty = str.trim() === '' && wasFilled

  if (typeof value === 'boolean') {
    return <Toggle id={fieldId} type="button" $on={value} onClick={() => onChange(!value)} />
  }

  if (isImage) {
    return <ImageField id={fieldId} value={str} onChange={onChange} warn={nowEmpty} />
  }

  if (isLong) {
    return (
      <TextArea
        id={fieldId}
        value={str}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(10, Math.max(3, Math.ceil(str.length / 60)))}
        $warn={nowEmpty}
      />
    )
  }
  return (
    <TextInput
      id={fieldId}
      type="text"
      value={str}
      onChange={(e) => onChange(e.target.value)}
      $warn={nowEmpty}
    />
  )
}

function spansFullWidth(v: JsonValue): boolean {
  if (Array.isArray(v)) return true
  if (v !== null && typeof v === 'object') return true
  if (typeof v === 'string') return v.length > 120 || v.includes('\n')
  return false
}

function groupMetaFor(v: JsonValue): string {
  if (Array.isArray(v)) return `${v.length} ${v.length === 1 ? 'item' : 'itens'}`
  if (v !== null && typeof v === 'object') {
    const count = Object.keys(v).length
    return `${count} ${count === 1 ? 'campo' : 'campos'}`
  }
  return ''
}

function ObjectFields({ value, original, onChange, depth = 0 }: EditorProps) {
  const obj = value as { [key: string]: JsonValue }
  const originalObj = original as { [key: string]: JsonValue } | undefined
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const baseId = useId()

  function toggle(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <FieldStack $nested={depth > 0}>
      {Object.keys(obj).map((key) => {
        const v = obj[key]
        const isGroup = v !== null && typeof v === 'object'

        if (isGroup) {
          const open = !collapsed.has(key)
          return (
            <FieldSpanFull key={key}>
              <GroupHeader type="button" onClick={() => toggle(key)}>
                <ChevronButton $open={open}>
                  <ChevronIcon />
                </ChevronButton>
                <FieldLabel style={{ cursor: 'pointer' }}>{labelFor(key)}</FieldLabel>
                <GroupMeta>{groupMetaFor(v)}</GroupMeta>
              </GroupHeader>
              {open && (
                <div style={{ marginTop: 12 }}>
                  <ValueEditor
                    value={v}
                    original={originalObj ? originalObj[key] : undefined}
                    depth={depth + 1}
                    fieldKey={key}
                    onChange={(next) => onChange({ ...obj, [key]: next })}
                  />
                </div>
              )}
            </FieldSpanFull>
          )
        }

        const Group = spansFullWidth(v) ? FieldSpanFull : FieldGroup
        const fieldId = `${baseId}-${key}`
        return (
          <Group key={key}>
            <FieldLabel htmlFor={fieldId}>{labelFor(key)}</FieldLabel>
            <ValueEditor
              value={v}
              original={originalObj ? originalObj[key] : undefined}
              depth={depth + 1}
              fieldKey={key}
              fieldId={fieldId}
              onChange={(next) => onChange({ ...obj, [key]: next })}
            />
          </Group>
        )
      })}
    </FieldStack>
  )
}

function ArrayEditor({ value, original, onChange, depth = 0 }: EditorProps) {
  const arr = value as JsonValue[]
  const originalArr = original as JsonValue[] | undefined
  const isPrimitiveArray = arr.every(isPrimitive)
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }
  function update(i: number, next: JsonValue) {
    const copy = arr.slice()
    copy[i] = next
    onChange(copy)
  }
  function remove(i: number) {
    if (!window.confirm('Remover este item da lista?')) return
    onChange(arr.filter((_, idx) => idx !== i))
  }
  function move(i: number, dir: number) {
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    const copy = arr.slice()
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    onChange(copy)
  }
  function add() {
    const template = arr.length > 0 ? blankLike(arr[arr.length - 1]) : isPrimitiveArray ? '' : {}
    onChange([...arr, template])
  }

  return (
    <ArrayList>
      {arr.map((item, i) => {
        const original = Array.isArray(originalArr) ? originalArr[i] : undefined
        const onItemChange = (next: JsonValue) => update(i, next)

        if (isPrimitiveArray) {
          return (
            <ArrayItemCard key={i} $compact>
              <div style={{ flex: 1, minWidth: 0 }}>
                <ValueEditor value={item} original={original} depth={depth + 1} onChange={onItemChange} />
              </div>
              <IconButtonGroup>
                <IconButton type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Mover para cima" aria-label="Mover para cima">
                  <UpIcon />
                </IconButton>
                <IconButton type="button" onClick={() => move(i, 1)} disabled={i === arr.length - 1} title="Mover para baixo" aria-label="Mover para baixo">
                  <DownIcon />
                </IconButton>
                <IconButton type="button" $danger onClick={() => remove(i)} title="Remover" aria-label="Remover">
                  <TrashIcon />
                </IconButton>
              </IconButtonGroup>
            </ArrayItemCard>
          )
        }

        const open = !collapsed.has(i)
        return (
          <ArrayItemCard key={i}>
            <ItemBody>
              <ItemHeaderRow>
                <DragHandle aria-hidden="true">
                  <DragIcon />
                </DragHandle>
                <ItemSummary type="button" onClick={() => toggle(i)}>
                  <ChevronButton $open={open}>
                    <ChevronIcon />
                  </ChevronButton>
                  <ItemSummaryText>{summaryFor(item, i)}</ItemSummaryText>
                </ItemSummary>
                <IconButtonGroup>
                  <IconButton type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Mover para cima" aria-label="Mover para cima">
                    <UpIcon />
                  </IconButton>
                  <IconButton type="button" onClick={() => move(i, 1)} disabled={i === arr.length - 1} title="Mover para baixo" aria-label="Mover para baixo">
                    <DownIcon />
                  </IconButton>
                  <IconButton type="button" $danger onClick={() => remove(i)} title="Remover" aria-label="Remover">
                    <TrashIcon />
                  </IconButton>
                </IconButtonGroup>
              </ItemHeaderRow>
              {open && (
                <div style={{ marginTop: 14 }}>
                  <ValueEditor value={item} original={original} depth={depth + 1} onChange={onItemChange} />
                </div>
              )}
            </ItemBody>
          </ArrayItemCard>
        )
      })}
      <AddItemButton type="button" onClick={add}>
        + Adicionar item
      </AddItemButton>
    </ArrayList>
  )
}

export function ValueEditor({ value, original, onChange, depth = 0, fieldKey, fieldId }: EditorProps) {
  if (Array.isArray(value)) {
    return <ArrayEditor value={value} original={original} onChange={onChange} depth={depth} />
  }
  if (value !== null && typeof value === 'object') {
    return <ObjectFields value={value} original={original} onChange={onChange} depth={depth} />
  }
  return <PrimitiveEditor value={value} original={original} onChange={onChange} fieldKey={fieldKey} fieldId={fieldId} />
}

interface JsonEditorProps extends EditorProps {
  upload?: UploadConfig
}

export default function JsonEditor({ value, original, onChange, upload }: JsonEditorProps) {
  return (
    <UploadContext.Provider value={upload ?? null}>
      <ValueEditor value={value} original={original} onChange={onChange} depth={0} />
    </UploadContext.Provider>
  )
}
