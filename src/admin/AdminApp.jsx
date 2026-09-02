import { useEffect, useState } from 'react'
import JsonEditor from './JsonEditor.jsx'
import { getFile, putFile, whoAmI, OWNER, REPO } from './github.js'

const TOKEN_KEY = 'curae-admin-token'

const FILES = [
  { key: 'content', label: 'Geral (PT)', path: 'src/data/content.json' },
  { key: 'en', label: 'English', path: 'src/i18n/en.json' },
  { key: 'productGroups', label: 'Produtos', path: 'src/data/productGroups.json' },
  { key: 'team', label: 'Time', path: 'src/data/team.json' },
  { key: 'partners', label: 'Parceiros', path: 'src/data/partners.json' },
]

function TokenGate({ onSubmit }) {
  const [value, setValue] = useState('')
  return (
    <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 20px', fontFamily: 'DM Sans, sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Admin de conteúdo — Curae</h1>
      <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.6 }}>
        Cole aqui um <strong>Personal Access Token do GitHub</strong> com acesso ao
        repositório <code>{OWNER}/{REPO}</code>. Recomendado: um token{' '}
        <strong>fine-grained</strong>, restrito só a este repositório, com permissão{' '}
        <strong>Contents: Read and write</strong> (nada além disso) e uma data de
        expiração curta. O token fica salvo apenas neste navegador.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (value.trim()) onSubmit(value.trim())
        }}
        style={{ display: 'flex', gap: 8, marginTop: 16 }}
      >
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ghp_... ou github_pat_..."
          style={{ flex: 1, fontSize: 14, padding: '10px 12px', borderRadius: 6, border: '1px solid #CBD5E0' }}
        />
        <button
          type="submit"
          style={{ fontSize: 14, padding: '10px 16px', borderRadius: 6, border: 'none', background: '#1A5F7A', color: '#fff', cursor: 'pointer' }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

function FileTab({ token, file }) {
  const [state, setState] = useState({ loading: false, error: null, json: null, original: null, sha: null, saved: null })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null, saved: null }))
    getFile(token, file.path)
      .then(({ json, sha }) => {
        if (cancelled) return
        setState({ loading: false, error: null, json, original: json, sha, saved: null })
      })
      .catch((err) => {
        if (cancelled) return
        setState((s) => ({ ...s, loading: false, error: err.message }))
      })
    return () => {
      cancelled = true
    }
  }, [token, file.path])

  const dirty = state.json !== null && JSON.stringify(state.json) !== JSON.stringify(state.original)

  async function save() {
    if (!window.confirm('Salvar vai publicar direto no site ao vivo (o deploy automático leva ~1-2 min). Confirmar?')) return
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const { sha } = await putFile(token, file.path, state.json, state.sha, `content: atualiza ${file.label} via admin`)
      setState((s) => ({ ...s, loading: false, sha, original: s.json, saved: new Date() }))
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err.message }))
    }
  }

  if (state.loading && state.json === null) return <p>Carregando…</p>
  if (state.error) return <p style={{ color: '#C53030' }}>Erro: {state.error}</p>
  if (state.json === null) return null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#718096' }}>
          {dirty ? 'Alterações não salvas' : state.saved ? `Salvo às ${state.saved.toLocaleTimeString('pt-BR')}` : 'Sem alterações'}
        </div>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || state.loading}
          style={{
            fontSize: 14,
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            color: '#fff',
            background: dirty ? '#1A7A6E' : '#A0AEC0',
            cursor: dirty ? 'pointer' : 'default',
          }}
        >
          {state.loading ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
      <JsonEditor
        value={state.json}
        original={state.original}
        onChange={(next) => setState((s) => ({ ...s, json: next }))}
      />
    </div>
  )
}

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [authError, setAuthError] = useState(null)
  const [active, setActive] = useState(FILES[0].key)

  useEffect(() => {
    if (!token) return
    whoAmI(token).catch((err) => setAuthError(err.message))
  }, [token])

  function handleToken(value) {
    localStorage.setItem(TOKEN_KEY, value)
    setAuthError(null)
    setToken(value)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  if (!token) return <TokenGate onSubmit={handleToken} />

  const file = FILES.find((f) => f.key === active)

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', maxWidth: 860, margin: '0 auto', padding: '32px 20px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <h1 style={{ fontSize: 22, margin: 0 }}>Admin de conteúdo — Curae</h1>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
          <a href="https://curaeai.tech" target="_blank" rel="noreferrer">
            Ver site ao vivo →
          </a>
          <button type="button" onClick={logout} style={{ background: 'none', border: 'none', color: '#C53030', cursor: 'pointer', font: 'inherit' }}>
            Sair
          </button>
        </div>
      </div>

      {authError && (
        <p style={{ color: '#C53030', fontSize: 13 }}>
          Token inválido ou sem acesso ao repositório ({authError}). <button type="button" onClick={logout} style={{ border: 'none', background: 'none', color: '#C53030', textDecoration: 'underline', cursor: 'pointer' }}>Trocar token</button>
        </p>
      )}

      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #E2E8F0', margin: '20px 0 24px', flexWrap: 'wrap' }}>
        {FILES.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            style={{
              fontSize: 14,
              padding: '10px 14px',
              border: 'none',
              borderBottom: active === f.key ? '2px solid #1A5F7A' : '2px solid transparent',
              background: 'none',
              color: active === f.key ? '#1A5F7A' : '#4A5568',
              fontWeight: active === f.key ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <FileTab key={file.key} token={token} file={file} />
    </div>
  )
}
