# RETRO//STACK — Catálogo Técnico de Hardware

Site estático (sem servidor, sem banco de dados) para publicar o catálogo da coleção.
Os dados vêm da planilha `catalogo.xlsx` e são convertidos para `assets/data.js` pelo
script `build.py`.

## Estrutura

```
hardware-catalog/
├── index.html                     página única do site
├── assets/
│   ├── style.css                   visual retro-moderno
│   ├── app.js                       lógica (busca, filtros, modal de detalhes)
│   └── data.js                      gerado automaticamente por build.py — não editar à mão
├── build.py                         planilha → data.js
├── catalogo.xlsx                     sua planilha
├── images/                           fotos dos itens (opcional, veja abaixo)
├── manuals/                           manuais em PDF (opcional, veja abaixo)
└── .github/workflows/
    └── build-catalog.yml               roda build.py sozinho a cada push (veja "Como atualizar")
```

## Ver o site no seu computador

Não dá para abrir `index.html` direto no navegador com duplo clique (o navegador
bloqueia o carregamento de `data.js` por segurança). Rode um servidor local simples:

```
cd hardware-catalog
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `hardware-catalog`) ou use um já existente
   do tipo `seu-usuario.github.io`.
2. Copie todo o conteúdo desta pasta para dentro do repositório.
3. Faça commit e push:
   ```
   git add .
   git commit -m "Publica catálogo de hardware"
   git push
   ```
4. Em **Settings → Pages** do repositório, selecione a branch (geralmente `main`)
   e a pasta raiz (`/`). O GitHub gera a URL pública em alguns minutos.
   - Se o repositório já for `seu-usuario.github.io`, o site fica em
     `https://seu-usuario.github.io/` direto.
   - Se for outro nome, fica em `https://seu-usuario.github.io/nome-do-repo/`.

Não precisa de Jekyll, build step no GitHub, nem configuração extra — é HTML/CSS/JS puro.

## Como atualizar o catálogo no futuro

### Opção automática (recomendada) — o GitHub gera o site sozinho

A pasta já vem com um workflow (`.github/workflows/build-catalog.yml`) que
roda `build.py` para você direto no GitHub, toda vez que `catalogo.xlsx` é
atualizado. Depois de publicar o repositório uma vez (veja acima), atualizar
o catálogo vira só:

```
git add catalogo.xlsx
git commit -m "Atualiza catálogo"
git push
```

O GitHub roda o build sozinho (leva uns 20-30s), commita o `assets/data.js`
gerado de volta no repositório, e o GitHub Pages republica o site automático
em seguida. Você não precisa ter Python instalado na sua máquina nem rodar
nada localmente — só editar a planilha e mandar o `git push`.

Para acompanhar: aba **Actions** do repositório no GitHub mostra o progresso
de cada atualização.

> Isso funciona porque o repositório já tem permissão de escrita concedida
> ao workflow (`permissions: contents: write` no arquivo do workflow). Não
> precisa configurar nada extra — só garantir que a pasta `.github` também
> foi enviada junto no primeiro push.

### Opção manual (sem depender do GitHub Actions)

Se preferir gerar o `data.js` você mesmo antes de subir:

1. Edite `catalogo.xlsx` normalmente (adicione linhas, novas colunas, novos itens).
2. Rode `python3 build.py` — regenera `assets/data.js` com os dados novos.
3. Confira localmente (`python3 -m http.server 8000`).
4. `git add . && git commit -m "Atualiza catálogo" && git push`.

As duas opções convivem sem problema — use a automática no dia a dia e a
manual quando quiser conferir o resultado antes de publicar.

O site sempre recalcula os contadores e status automaticamente — não é preciso
mexer no HTML/CSS/JS para adicionar itens, só na planilha.

### Adicionar fotos e manuais (sem mexer na planilha)

O site já sabe onde procurar. Cada item pode ter **várias fotos** — a foto
número N do item é sempre `<código>-N.JPG` dentro de `images/`, e o manual é
sempre `<código>.PDF` dentro de `manuals/`. Por exemplo, para a placa
**MB-001** com três fotos:

- `images/MB-001-1.JPG`
- `images/MB-001-2.JPG`
- `images/MB-001-3.JPG`
- `manuals/MB-001.PDF`

Pode ter só 1 foto, 5 fotos, ou nenhuma — o site procura de `-1` até `-8` e só
mostra as que existirem de fato. Não precisa criar coluna na planilha nem
rodar `build.py` de novo (fotos/manuais não fazem parte do `data.js`, o
navegador procura o arquivo na hora). Basta colocar os arquivos com o nome
certo na pasta certa e recarregar a página.

Na ficha do item, as fotos aparecem como miniaturas lado a lado — **clique em
qualquer uma para abrir em tela cheia (zoom)**, com setas para navegar entre
as fotos daquele item, contador de posição, e fecha com `Esc`, clicando fora
ou no `✕`.

Se precisar de mais de 8 fotos por item, ou os arquivos vierem com outra
extensão/caixa (ex.: `.jpg` minúsculo, ou `.png`), abra `assets/app.js` e
ajuste as constantes no topo da seção "Convenção de nomes":

```js
const IMAGE_EXT = "JPG";
const MANUAL_EXT = "PDF";
const MAX_PHOTOS = 8;
```

Itens sem foto ou manual ainda cadastrado aparecem com um aviso discreto no
lugar, sem quebrar o layout — e o site detecta sozinho quando você adiciona
o arquivo depois.

**Caso especial:** se quiser incluir uma foto extra com nome fora do padrão
(ou hospedada em outro site), ou um manual com nome diferente do código,
ainda dá pra forçar isso pela planilha: adicione uma coluna **`Imagem`** (ela
entra como uma foto a mais, além das numeradas) ou **`Manual (URL)`** na aba
do item, preencha com o nome do arquivo ou uma URL completa, e rode
`python3 build.py`.

## Sobre o design

Tema "Pixel Modern": paleta escura vibrante com uma cor de destaque por
categoria (amarelo/placas-mãe, rosa/GPUs, ciano/CPUs, verde/memórias),
ícones em pixel-art, cantos "cortados" estilo caixa de diálogo de jogo e
uma tela de abertura com barra de loading — tudo dentro de um grid moderno,
responsivo, com busca/filtros instantâneos. CSS puro, sem dependências
externas além de duas fontes do Google Fonts.
