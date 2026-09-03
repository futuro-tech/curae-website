export const OWNER = 'futuro-tech'
export const REPO = 'curae-website'
export const BRANCH = 'main'

const API = 'https://api.github.com'

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  }
}

function b64EncodeUtf8(str: string) {
  return btoa(unescape(encodeURIComponent(str)))
}

function b64DecodeUtf8(str: string) {
  return decodeURIComponent(escape(atob(str)))
}

export async function whoAmI(token: string) {
  const res = await fetch(`${API}/user`, { headers: authHeaders(token) })
  if (!res.ok) throw new Error(`Token inválido (${res.status})`)
  return res.json()
}

export async function getFile(token: string, path: string) {
  const res = await fetch(
    `${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: authHeaders(token) },
  )
  if (!res.ok) throw new Error(`Falha ao carregar ${path} (${res.status})`)
  const data = await res.json()
  const text = b64DecodeUtf8(data.content.replace(/\n/g, ''))
  return { json: JSON.parse(text), sha: data.sha }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function putFile(token: string, path: string, json: any, sha: string, message: string) {
  const content = b64EncodeUtf8(JSON.stringify(json, null, 2) + '\n')
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content, sha, branch: BRANCH }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (res.status === 409) {
      throw new Error(
        'Alguém mudou esse arquivo desde que você abriu a aba. Recarregue e tente de novo.',
      )
    }
    throw new Error(body.message || `Falha ao salvar ${path} (${res.status})`)
  }
  const data = await res.json()
  return { sha: data.content.sha }
}

export async function createFile(token: string, path: string, base64Content: string, message: string) {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: base64Content, branch: BRANCH }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Falha ao enviar arquivo (${res.status})`)
  }
  const data = await res.json()
  return { sha: data.content.sha as string, path: data.content.path as string }
}
