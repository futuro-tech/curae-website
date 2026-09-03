import { useEffect, useState, type FormEvent } from "react";
import JsonEditor, { type JsonValue } from "./JsonEditor";
import DraftPreview from "./DraftPreview";
import CareersPreview from "./CareersPreview";
import { getFile, putFile, whoAmI } from "./github";
import { describeChanges } from "./diff";
import {
  AdminGlobalStyle,
  Badge,
  Button,
  ContentCard,
  ChangeDot,
  ChangeItem,
  ChangesBox,
  ChangesTitle,
  ErrorBanner,
  InfoBanner,
  InfoBannerDismiss,
  FieldGroup,
  FieldLabel,
  Header,
  HeaderAction,
  HeaderBrand,
  HeaderDivider,
  HeaderLink,
  HeaderNav,
  HeaderWordmark,
  HelperBox,
  HelperTitle,
  LoginCard,
  LoginContent,
  LoginFootnote,
  LoginHeadline,
  LoginLead,
  LoginPanel,
  LoginShell,
  LoginSubtext,
  LoginTitle,
  Main,
  ModalBody,
  ModalButtonsRow,
  ModalCard,
  ModalIcon,
  ModalOverlay,
  ModalTitle,
  ModeToggle,
  ModeToggleButton,
  PageSubtitle,
  PageTitle,
  PreviewBar,
  SectionLabel,
  StatusDot,
  StatusText,
  SaveBar,
  SaveBarInner,
  TabItem,
  Tabs,
  TextInput,
  Wordmark,
} from "./styled";

const TOKEN_KEY = "curae-admin-token";

interface FileMeta {
  key: string;
  label: string;
  path: string;
}

const FILES: FileMeta[] = [
  { key: "content", label: "Geral (PT)", path: "src/data/content.json" },
  { key: "en", label: "English", path: "src/i18n/en.json" },
  {
    key: "productGroups",
    label: "Produtos",
    path: "src/data/productGroups.json",
  },
  { key: "team", label: "Time", path: "src/data/team.json" },
  { key: "partners", label: "Parceiros", path: "src/data/partners.json" },
];

const CAREERS_TAB = { key: "careers", label: "Carreiras" };

const UPLOAD_FOLDERS: Record<string, string> = {
  content: "uploads",
  en: "uploads",
  productGroups: "products",
  team: "team",
  partners: "partners",
};

const DRAFT_KEY_PREFIX = "curae-admin-draft-";

function draftKey(fileKey: string) {
  return `${DRAFT_KEY_PREFIX}${fileKey}`;
}

function loadDraft(fileKey: string): { sha: string; json: JsonValue } | null {
  try {
    const raw = localStorage.getItem(draftKey(fileKey));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDraft(fileKey: string, sha: string, json: JsonValue) {
  try {
    localStorage.setItem(draftKey(fileKey), JSON.stringify({ sha, json }));
  } catch {
    // storage full or unavailable — draft recovery is best-effort, safe to skip
  }
}

function clearDraft(fileKey: string) {
  localStorage.removeItem(draftKey(fileKey));
}

function WarningIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C53030"
      strokeWidth="2"
    >
      <path d="M12 9v4M12 17h.01M10.3 3.9 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4A5568"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7885"
      strokeWidth="1.8"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function PublishIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A7A6E"
      strokeWidth="2"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function ArrowIcon({ color = "#FAFAFA" }: { color?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TokenGate({
  onSubmit,
  error,
}: {
  onSubmit: (token: string) => void;
  error: string | null;
}) {
  const [value, setValue] = useState("");
  return (
    <LoginShell>
      <LoginPanel>
        <Wordmark>Curae</Wordmark>
        <div>
          <LoginHeadline>Painel de&nbsp;conteúdo</LoginHeadline>
          <LoginSubtext>
            Gerencie os textos, produtos e a equipe exibidos no site
            institucional, com publicação direta para o ar.
          </LoginSubtext>
        </div>
        <LoginFootnote
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <LockIcon />
          Conexão segura via GitHub
        </LoginFootnote>
      </LoginPanel>

      <LoginContent>
        <LoginCard>
          <LoginTitle>Entrar</LoginTitle>
          <LoginLead>
            Use um token pessoal do GitHub com acesso ao repositório.
          </LoginLead>

          {error && (
            <ErrorBanner>
              <WarningIcon />
              <div>Token inválido ou sem acesso ao repositório ({error}).</div>
            </ErrorBanner>
          )}

          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (value.trim()) onSubmit(value.trim());
            }}
          >
            <FieldGroup style={{ marginBottom: 16 }}>
              <FieldLabel>Personal access token</FieldLabel>
              <TextInput
                type="password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="ghp_... ou github_pat_..."
              />
            </FieldGroup>

            <Button type="submit" $variant="navy">
              Entrar
              <ArrowIcon />
            </Button>
          </form>
        </LoginCard>
      </LoginContent>
    </LoginShell>
  );
}

interface FileTabState {
  loading: boolean;
  error: string | null;
  json: JsonValue | null;
  original: JsonValue | null;
  sha: string | null;
  saved: Date | null;
  restoredDraft: boolean;
}

function FileTab({ token, file }: { token: string; file: FileMeta }) {
  const [state, setState] = useState<FileTabState>({
    loading: false,
    error: null,
    json: null,
    original: null,
    sha: null,
    saved: null,
    restoredDraft: false,
  });
  const [confirming, setConfirming] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [previewLang, setPreviewLang] = useState<"pt" | "en">(
    file.key === "en" ? "en" : "pt",
  );
  const [previewFiles, setPreviewFiles] = useState<
    Partial<Record<string, JsonValue>>
  >({});
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!confirming && !discarding) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setConfirming(false);
        setDiscarding(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirming, discarding]);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null, saved: null }));
    getFile(token, file.path)
      .then(({ json, sha }) => {
        if (cancelled) return;
        const draft = loadDraft(file.key);
        if (draft && draft.sha !== sha) clearDraft(file.key);
        const restored = draft && draft.sha === sha ? draft.json : null;
        setState({
          loading: false,
          error: null,
          json: restored ?? json,
          original: json,
          sha,
          saved: null,
          restoredDraft: restored !== null,
        });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error: err.message }));
      });
    return () => {
      cancelled = true;
    };
  }, [token, file.path, file.key]);

  useEffect(() => {
    if (state.json === null || state.sha === null) return;
    const dirty = JSON.stringify(state.json) !== JSON.stringify(state.original);
    if (dirty) {
      saveDraft(file.key, state.sha, state.json);
    } else {
      clearDraft(file.key);
    }
  }, [state.json, state.original, state.sha, file.key]);

  useEffect(() => {
    if (mode !== "preview") return;
    let cancelled = false;
    const missing = FILES.filter(
      (f) => f.key !== file.key && previewFiles[f.key] === undefined,
    );
    if (missing.length === 0) return;
    Promise.all(missing.map((f) => getFile(token, f.path)))
      .then((results) => {
        if (cancelled) return;
        setPreviewFiles((prev) => {
          const next = { ...prev };
          results.forEach(({ json }, i) => {
            next[missing[i].key] = json;
          });
          return next;
        });
      })
      .catch((err: Error) => {
        if (!cancelled) setPreviewError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [mode, token, file.key, previewFiles]);

  const dirty =
    state.json !== null &&
    JSON.stringify(state.json) !== JSON.stringify(state.original);

  const changes =
    state.original !== null && state.json !== null
      ? describeChanges(state.original, state.json)
      : [];
  const visibleChanges = changes.slice(0, 8);
  const extraChangeCount = changes.length - visibleChanges.length;

  async function save() {
    setConfirming(false);
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      if (!state.sha) throw new Error("Arquivo ainda não carregado");
      const { sha } = await putFile(
        token,
        file.path,
        state.json,
        state.sha,
        `content: atualiza ${file.label} via admin`,
      );
      setState((s) => ({
        ...s,
        loading: false,
        sha,
        original: s.json,
        saved: new Date(),
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }

  function discard() {
    setDiscarding(false);
    setState((s) => ({ ...s, json: s.original }));
  }

  if (state.loading && state.json === null) return <p>Carregando…</p>;
  if (state.error)
    return <p style={{ color: "#C53030" }}>Erro: {state.error}</p>;
  if (state.json === null) return null;

  function dataFor(key: string): JsonValue | null {
    if (key === file.key) return state.json;
    return previewFiles[key] ?? null;
  }

  return (
    <div>
      <PreviewBar>
        <SectionLabel style={{ marginBottom: 0 }}>
          Seção — {file.label}
        </SectionLabel>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {mode === "preview" && (
            <ModeToggle>
              <ModeToggleButton
                type="button"
                $active={previewLang === "pt"}
                onClick={() => setPreviewLang("pt")}
              >
                PT
              </ModeToggleButton>
              <ModeToggleButton
                type="button"
                $active={previewLang === "en"}
                onClick={() => setPreviewLang("en")}
              >
                EN
              </ModeToggleButton>
            </ModeToggle>
          )}
          <ModeToggle>
            <ModeToggleButton
              type="button"
              $active={mode === "edit"}
              onClick={() => setMode("edit")}
            >
              Editar
            </ModeToggleButton>
            <ModeToggleButton
              type="button"
              $active={mode === "preview"}
              onClick={() => setMode("preview")}
            >
              Pré-visualizar
            </ModeToggleButton>
          </ModeToggle>
        </div>
      </PreviewBar>

      {state.restoredDraft && (
        <InfoBanner>
          <span>Recuperamos um rascunho não salvo desta aba.</span>
          <InfoBannerDismiss
            type="button"
            onClick={() => setState((s) => ({ ...s, restoredDraft: false }))}
          >
            Ok
          </InfoBannerDismiss>
        </InfoBanner>
      )}

      {mode === "edit" ? (
        <ContentCard>
          <JsonEditor
            value={state.json}
            original={state.original ?? undefined}
            onChange={(next) => setState((s) => ({ ...s, json: next }))}
            upload={{ token, folder: UPLOAD_FOLDERS[file.key] ?? "uploads" }}
          />
        </ContentCard>
      ) : previewError ? (
        <p style={{ color: "#C53030" }}>
          Erro ao carregar pré-visualização: {previewError}
        </p>
      ) : (
        <DraftPreview
          content={dataFor("content")}
          en={dataFor("en")}
          team={dataFor("team")}
          productGroups={dataFor("productGroups")}
          partners={dataFor("partners")}
          lang={previewLang}
        />
      )}

      <SaveBar>
        <SaveBarInner>
          <StatusText>
            <StatusDot $dirty={dirty} />
            {dirty
              ? "Alterações não salvas"
              : state.saved
                ? `Salvo às ${state.saved.toLocaleTimeString("pt-BR")}`
                : "Sem alterações"}
          </StatusText>
          <ModalButtonsRow>
            <Button
              type="button"
              $variant="secondary"
              onClick={() => setDiscarding(true)}
              disabled={!dirty || state.loading}
            >
              Descartar
            </Button>
            <Button
              type="button"
              onClick={() => setConfirming(true)}
              disabled={!dirty || state.loading}
            >
              {state.loading ? "Salvando…" : "Salvar alterações"}
            </Button>
          </ModalButtonsRow>
        </SaveBarInner>
      </SaveBar>

      {confirming && (
        <ModalOverlay onClick={() => setConfirming(false)}>
          <ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="publish-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalIcon>
              <PublishIcon />
            </ModalIcon>
            <ModalTitle id="publish-modal-title">
              Publicar alterações?
            </ModalTitle>
            <ModalBody>
              Isso vai publicar direto no site ao vivo{" "}
              <strong>curaeai.tech</strong>. O deploy automático leva cerca de
              1–2 minutos.
            </ModalBody>
            {visibleChanges.length > 0 && (
              <ChangesBox>
                <ChangesTitle>
                  {changes.length}{" "}
                  {changes.length === 1 ? "alteração" : "alterações"} em{" "}
                  {file.label}
                </ChangesTitle>
                {visibleChanges.map((line, i) => (
                  <ChangeItem key={i}>
                    <ChangeDot />
                    {line}
                  </ChangeItem>
                ))}
                {extraChangeCount > 0 && (
                  <ChangeItem>
                    <ChangeDot />e mais {extraChangeCount}{" "}
                    {extraChangeCount === 1 ? "alteração" : "alterações"}
                  </ChangeItem>
                )}
              </ChangesBox>
            )}
            <ModalButtonsRow>
              <Button
                type="button"
                $variant="secondary"
                onClick={() => setConfirming(false)}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={save}>
                Publicar agora
                <ArrowIcon color="#fff" />
              </Button>
            </ModalButtonsRow>
          </ModalCard>
        </ModalOverlay>
      )}

      {discarding && (
        <ModalOverlay onClick={() => setDiscarding(false)}>
          <ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="discard-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalIcon>
              <WarningIcon />
            </ModalIcon>
            <ModalTitle id="discard-modal-title">
              Descartar alterações?
            </ModalTitle>
            <ModalBody>
              Isso vai desfazer as edições não salvas nesta aba e voltar ao
              conteúdo publicado atualmente. Não tem como recuperar depois.
            </ModalBody>
            {visibleChanges.length > 0 && (
              <ChangesBox>
                <ChangesTitle>
                  {changes.length}{" "}
                  {changes.length === 1
                    ? "alteração será perdida"
                    : "alterações serão perdidas"}
                </ChangesTitle>
                {visibleChanges.map((line, i) => (
                  <ChangeItem key={i}>
                    <ChangeDot />
                    {line}
                  </ChangeItem>
                ))}
                {extraChangeCount > 0 && (
                  <ChangeItem>
                    <ChangeDot />e mais {extraChangeCount}{" "}
                    {extraChangeCount === 1 ? "alteração" : "alterações"}
                  </ChangeItem>
                )}
              </ChangesBox>
            )}
            <ModalButtonsRow>
              <Button
                type="button"
                $variant="secondary"
                onClick={() => setDiscarding(false)}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={discard}>
                Descartar alterações
              </Button>
            </ModalButtonsRow>
          </ModalCard>
        </ModalOverlay>
      )}
    </div>
  );
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [active, setActive] = useState(FILES[0].key);

  useEffect(() => {
    if (!token) return;
    whoAmI(token).catch((err: Error) => setAuthError(err.message));
  }, [token]);

  function handleToken(value: string) {
    localStorage.setItem(TOKEN_KEY, value);
    setAuthError(null);
    setToken(value);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  if (!token) {
    return (
      <>
        <AdminGlobalStyle />
        <TokenGate onSubmit={handleToken} error={authError} />
      </>
    );
  }

  return (
    <>
      <AdminGlobalStyle />
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header>
          <HeaderBrand>
            <HeaderWordmark>Curae</HeaderWordmark>
            <Badge>ADMIN</Badge>
          </HeaderBrand>
          <HeaderNav>
            <HeaderLink
              href="https://curaeai.tech"
              target="_blank"
              rel="noreferrer"
            >
              Ver site ao vivo
              <ExternalLinkIcon />
            </HeaderLink>
            <HeaderDivider />
            <HeaderAction type="button" onClick={logout}>
              Sair
              <LogoutIcon />
            </HeaderAction>
          </HeaderNav>
        </Header>

        <Main>
          <PageTitle>Conteúdo do site</PageTitle>
          <PageSubtitle>
            Edite os textos e imagens exibidos publicamente. As alterações são
            publicadas ao salvar.
          </PageSubtitle>

          {authError && (
            <ErrorBanner style={{ marginTop: 20 }}>
              <WarningIcon />
              <div>
                Token inválido ou sem acesso ao repositório ({authError}).{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  Trocar token
                </a>
              </div>
            </ErrorBanner>
          )}

          <Tabs>
            {FILES.map((f) => (
              <TabItem
                key={f.key}
                type="button"
                $active={active === f.key}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </TabItem>
            ))}
            <TabItem
              type="button"
              $active={active === CAREERS_TAB.key}
              onClick={() => setActive(CAREERS_TAB.key)}
            >
              {CAREERS_TAB.label}
            </TabItem>
          </Tabs>

          {FILES.map((f) => (
            <div
              key={f.key}
              style={{ display: active === f.key ? "block" : "none" }}
            >
              <FileTab token={token} file={f} />
            </div>
          ))}
          <div
            style={{ display: active === CAREERS_TAB.key ? "block" : "none" }}
          >
            <CareersPreview token={token} />
          </div>
        </Main>
      </div>
    </>
  );
}

