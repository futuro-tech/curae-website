import { useEffect, useState } from 'react'
import { GlobalStyle } from '../components/styled'
import { LangContext, build, type LangContextValue } from '../context/LangContext'
import CareersPageSite from '../pages/CareersPage'
import { getFile } from './github'
import type { JsonValue } from './JsonEditor'
import { PreviewBar, PreviewBleed, PreviewNotice, SectionLabel } from './styled'
import { tokens } from '../components/styled/primitives'

export default function CareersPreview({ token }: { token: string }) {
  const [content, setContent] = useState<JsonValue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getFile(token, 'src/data/content.json')
      .then(({ json }) => {
        if (!cancelled) setContent(json);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (error) return <p style={{ color: '#C53030' }}>Erro ao carregar pré-visualização: {error}</p>;
  if (!content) return <PreviewNotice>Carregando dados para a pré-visualização…</PreviewNotice>;

  // CareersPage only reads t.CAREERS, so an empty team base is enough here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = build(content as any, []) as LangContextValue['t']

  return (
    <div>
      <PreviewBar>
        <SectionLabel style={{ marginBottom: 0 }}>Seção — Carreiras</SectionLabel>
        <span style={{ fontSize: 12, color: tokens.muted }}>
          Para editar este conteúdo, use a aba &quot;Geral (PT)&quot;
        </span>
      </PreviewBar>
      <PreviewBleed>
        <GlobalStyle />
        <LangContext.Provider value={{ lang: 'pt', setLang: () => {}, t }}>
          <CareersPageSite />
        </LangContext.Provider>
      </PreviewBleed>
    </div>
  )
}
