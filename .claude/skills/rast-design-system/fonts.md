# rast fonti (v3)

Avots: `rast/index.html` + `rast/css/styles.css`. **Tikai divas saimes** — Bricolage Grotesque + Inter. Space Mono un visi dekoratīvie morph-fonti izņemti (v3). Monospace etiķešu vairs nav; etiķetes ir Inter versāli.

## Saimes un lietojums

```css
--font-display: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; /* virsraksti, wordmark, lielie apgalvojumi */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif; /* pamatteksts, pogas, UI, etiķetes */
```

| Fonts | Svari | Loma |
|---|---|---|
| Bricolage Grotesque | 500 / 600 / 700 | display: hero, sekciju virsraksti, kartes ievads, wordmark "rast" |
| Inter | 400 / 500 / 600 | pamatteksts, pogas, UI, formas, **etiķetes/eyebrow** |

- **Bricolage svari: 500–700.** Nelietot 800 (v2 kļūda — deklarēts, bet skalā nelietots).
- **Nav trešās saimes.** Ja parādās Space Mono, Playfair, Pacifico, Bebas Neue, Archivo Black, Caveat, DM Serif vai jebkurš monospace — tā ir kļūda.

## Optiskais izmērs

Bricolage nāk trīs optiskajos griezumos: `12pt`, noklusējuma un `96pt`.

- **Hero un sekciju virsrakstiem lieto 96pt griezumu** — ciešāks un asāks lielā izmērā.
- Kartes ievadam — noklusējuma griezums.
- `12pt` nelieto nemaz: mazo tekstu nes Inter.

## Latviešu diakritika — pārbaudīts, fonts der

Bricolage Grotesque pārbaudīts uz visiem 22 latviešu burtiem:

- **Pārklājums pilns:** visi `ĀāČčĒēĢģĪīĶķĻļŅņŠšŪūŽž` ir fontā.
- **Zīmes pareizas:** Ģ Ķ Ļ Ņ lieto īstu komatu apakšā (U+0326), nevis sediļu; mazais `ģ` lieto apgriezto komatu virs burta (U+0312). Abi ir korekta latviešu prakse.
- **Secinājums:** fonts paliek, tipogrāfija nav jāmaina.

## Rindstarpa latviešu tekstam — obligāti

Latviešu tekstam ir gan garumzīmes virs (Ā Ē Ī Ū), gan komati apakšā (Ģ Ķ Ļ Ņ). Vertikālais apjoms lielāks nekā angļu tekstam — pie ciešas rindstarpas komats no vienas rindas atduras pret nākamās garumzīmi.

- **Display line-height minimums: 1,05.** Divrindu hero: 1,10.
- **Nekad 0,9** latviešu tekstam (v1 kļūda; pārbaudīts renderējot).

## Etiķetes / eyebrow (v3)

- **Inter versāli**, plats tracking (0,18em), 11–13px, krāsa `--ink-dim`.
- Pirms eyebrow — īss **22px vermiliona svītriņš** (`— PAKALPOJUMI`), NE ikona, NE numurs kā dekors.
- **Nekad monospace. Nekad ar pulsējošu punktu.** (v3 izņēma gan Space Mono, gan pulsējošo eyebrow punktu.)

## Wordmark

`rast` mazajiem burtiem, Bricolage 700, ciešs tracking (−0,02em), ar **cietu vermiliona punktu augšējā labajā stūrī**. Punkts vienmēr ciets — nekad gails, nekad ar ēnu, nekad ar apli apkārt.

```html
<a class="brand">rast<span class="accent">.</span></a>
```

Tas pats punkts atkārtojas favikonā, kājenē un preloaderī. Sīkāk par punktu kā zīmola atomu un tā ceļojumu: [tokens.md](tokens.md).

## Ielāde — v3 mērķa stratēģija

- **Pašhostēts `.woff2`**, `font-display: swap`, `<link rel="preload">` tikai hero svaram (Bricolage 700).
- **`latin-ext` apakškopa obligāta** — bez tās nav ne Ā, ne Ģ, ne Š.
- Fontu budžets (izmērīts): Bricolage 96pt Bold, subsetēts uz `latin` + `latin-ext`, woff2 ≈ **26 KB uz svaru**. 3 Bricolage + 3 Inter ≈ **~170 KB kopā**. Iekļaujas.
- Virsrakstu atklāšanas animācijas gaida `document.fonts.ready` (ar ~800 ms fallback), lai tekstu nesadala pirms fonta nomaiņas.

**Pašreizējais stāvoklis (2026-07):** live lapa vēl servē Bricolage + Inter no Google Fonts (ne pašhostētu woff2). Space Mono un dekoratīvie fonti jau izņemti. Pāreja uz pašhostētu woff2 ar `latin-ext` preload ir atvērtais v3 solis — līdz tam Google Fonts URL satur tikai `Bricolage+Grotesque` + `Inter`.
