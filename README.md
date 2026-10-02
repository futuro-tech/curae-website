# Site da Curae: instruções de publicação

Site estático em HTML puro, com 5 páginas. Não tem build, banco de dados nem dependências para instalar: basta subir os arquivos como estão.

**Tudo o que vai para o ar está na pasta `dist/`.** O site é publicado automaticamente no GitHub Pages a cada push no `main` (veja "Como publicar").

## Estrutura (dentro de `dist/`)

```
CNAME                   → domínio do GitHub Pages (curaeai.tech)
404.html                → página de "não encontrada", volta para a home
index.html              → https://curaeai.tech/
allocare/index.html     → https://curaeai.tech/allocare/
fluxor/index.html       → https://curaeai.tech/fluxor/
contato/index.html      → https://curaeai.tech/contato/
carreiras/index.html    → https://curaeai.tech/carreiras/
og/curae-og.jpg         → imagem de preview de links
favicon.ico, favicon.svg,
favicon-96.png          → ícone da aba do navegador e do resultado no Google
apple-touch-icon.png,
icon-192.png, icon-512.png,
site.webmanifest        → ícone ao salvar o site na tela inicial do celular
```

Cada página é um arquivo único e autossuficiente. Imagens, ícones, CSS, JavaScript e animações estão todos embutidos dentro do próprio HTML. A única exceção é `og/curae-og.jpg`, a imagem de preview de links (veja "SEO e preview de links"). Os arquivos ficam entre 90 KB e 1,9 MB por causa das imagens embutidas, e isso é esperado.

## URLs e links

Todos os links internos usam caminho a partir da raiz e abrem na mesma aba: `/`, `/allocare/`, `/fluxor/`, `/contato/`, `/carreiras/`. Links externos (Tally, WhatsApp, LinkedIn, Futuro Tech) abrem em nova aba.

As URLs sem a barra final (`/allocare`) também funcionam: servidores comuns redirecionam automaticamente para `/allocare/`.

### Contato com assunto pré-selecionado

A página de contato aceita um parâmetro na URL que já deixa marcado o assunto do formulário:

| URL | Assunto marcado |
|---|---|
| `/contato/#assunto=fluxor` | Sala de cirurgia mais otimizada (FluxOR) |
| `/contato/#assunto=allocare` | Priorização de pacientes (Allocare) |
| `/contato/#assunto=parcerias` | Parcerias e eventos |
| `/contato/#assunto=pesquisa` | Pesquisa |
| `/contato/#assunto=carreiras` | Carreiras |
| `/contato/#assunto=outros` | Outros |
| `/contato/` | Nenhum (visitante escolhe) |

Os botões "Agende uma conversa" e "Agende uma demonstração" da Fluxor e da Allocare já usam as duas primeiras. As demais servem para links de campanha, e-mail ou eventos.

O parâmetro vem depois do `#` (não é `?assunto=`). Por isso **não depende de configuração no servidor** e não deve ser removido por regras de reescrita de URL.

## Como publicar

O deploy é automático: cada push (ou merge) no `main` roda o workflow `.github/workflows/deploy.yml`, que publica a pasta `dist/` como está no GitHub Pages, sem build. O andamento aparece na aba **Actions** do repositório.

Para alterar o site, edite os arquivos dentro de `dist/` e faça merge no `main`.

Configuração no GitHub (feita uma vez, em **Settings → Pages**):

1. **Source:** GitHub Actions.
2. **Custom domain:** `curaeai.tech`.
3. **Enforce HTTPS:** ativado.

O GitHub Pages já entrega `index.html` como página padrão de cada pasta, completa a barra final (`/allocare` vira `/allocare/`), redireciona `www` para o domínio principal e comprime os arquivos.

**Não renomeie arquivos nem pastas.** Os links internos usam caminhos a partir da raiz (`/allocare/`, `/contato/` etc.) e dependem dessa estrutura. Por isso o site só funciona em `curaeai.tech`, não no endereço de teste `futuro-tech.github.io/curae-website/`.

## Testar antes de subir

Abrindo os arquivos com duplo clique, os links entre páginas não funcionam, porque os caminhos a partir da raiz só funcionam servidos. Isso é normal. Para testar localmente, rode dentro da pasta `dist/`:

```
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Dependências externas (funcionam sozinhas, não precisa configurar)

- **Google Fonts:** carrega as fontes Bricolage Grotesque e Source Serif 4.
- **Tally:** formulários de candidatura na página Carreiras.
- **Links de saída:** WhatsApp (`wa.me`), LinkedIn da Curae e site da Futuro Tech.

## SEO e preview de links

As cinco páginas seguem o mesmo padrão no `<head>`: `<title>`, meta description, canonical, favicon e tags Open Graph (`og:url`, `og:title`, `og:description`, `og:site_name`, `og:locale`).

O canonical e o `og:url` usam sempre o domínio oficial com barra final:

- `https://curaeai.tech/`
- `https://curaeai.tech/allocare/`
- `https://curaeai.tech/fluxor/`
- `https://curaeai.tech/contato/`
- `https://curaeai.tech/carreiras/`

Por isso o site deve ser publicado em `curaeai.tech`.

A imagem de preview (`og:image`) é o arquivo `og/curae-og.jpg`, com 1200×630 px e usada por todas as páginas. Ela precisa ficar acessível em `https://curaeai.tech/og/curae-og.jpg`, então **suba a pasta `og/` junto com as páginas**. É o único arquivo fora dos HTMLs, porque WhatsApp, LinkedIn e afins só leem imagem com endereço próprio.

Para conferir o preview depois de publicar, use o [Post Inspector do LinkedIn](https://www.linkedin.com/post-inspector/). Ele também força a atualização do cache, caso o link já tenha sido compartilhado antes sem imagem.

Se houver um site antigo no domínio, configure redirecionamentos 301 das URLs antigas para as novas equivalentes. Depois de publicar, envie as URLs no Google Search Console.

## Comportamentos que são intencionais

- **Formulário de contato:** envia pelo [FormSubmit](https://formsubmit.co) (gratuito, sem conta) para `contato@curaeai.tech`, com cópia para Vinicius e Adriana. **No primeiro envio depois de publicar, o FormSubmit manda um e-mail de ativação para `contato@curaeai.tech`: é preciso clicar em "Activate Form" uma única vez.** Até isso acontecer, as mensagens não chegam. Os destinatários ficam no início do script da página `contato/index.html` (`EMAIL` e `EMAIL_COPIA`).
- **Botão "Baixar apresentação do produto" (Allocare e Fluxor):** recurso do site, baixa a apresentação embutida na página.
- **Seções de depoimentos:** estão ocultas de propósito, porque ainda são placeholders. Não reativar.

## Pendências conhecidas

- Os links **Política de Privacidade** e **Termos de Uso** (no rodapé de todas as páginas e no texto do formulário de contato) estão como `#`. Vão ser apontados quando essas páginas existirem.

## Checklist depois de publicar

- [ ] As 5 URLs abrem com HTTPS.
- [ ] O menu e o rodapé navegam entre todas as páginas.
- [ ] Os botões "falar com a gente" da Allocare e da Fluxor abrem o contato com o assunto já preenchido.
- [ ] O layout está correto no celular, sem rolagem lateral.
- [ ] As fontes carregaram (os títulos aparecem na Bricolage Grotesque, não numa fonte padrão do sistema).
- [ ] Os links de candidatura em Carreiras abrem o Tally.
- [ ] `https://curaeai.tech/og/curae-og.jpg` abre direto no navegador.
- [ ] Envie um teste pelo formulário de contato, ative o FormSubmit pelo e-mail recebido em `contato@curaeai.tech` e envie outro teste para confirmar que chegou.
- [ ] O preview do link aparece com a imagem ao colar no WhatsApp ou no LinkedIn.
