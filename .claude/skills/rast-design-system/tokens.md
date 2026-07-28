# rast dizaina tokeni (v3)

Avots: `rast/css/styles.css` (:root). Arhetipu sajaukums: **Creator 70 / Ruler 30** — viens drosmīgs žests, turēts mierīgā, autoritatīvā sistēmā. Creator = ekspresīvā tipogrāfija, vermiliona akcents, punkta ceļojums. Ruler = viens akcents, matiņlīniju kārtība, dāsnas atstarpes, atturība.

## Krāsas

```css
:root {
  --bg: #0A0A0C;        /* lapas pamats (silti tumšs, NE tīri melns) */
  --bg-2: #0E0E11;      /* izvēlne / modālais / paneļi */
  --surface: #131318;   /* kartes */
  --surface-2: #17171D; /* paceltas / hover kartes */

  --ink: #F4F0E9;       /* pamatteksts (silti balta tinte) */
  --ink-dim: #A7A2AE;   /* sekundārs teksts */
  --ink-faint: #6E6A77; /* meta / paraksti (tikai ≥14px) */

  --accent: #FF4A2E;      /* vienīgais vermilions */
  --accent-soft: #FF6A4D; /* tikai hover/active */
  --accent-deep: #C9341C; /* tikai punkta gradientam */

  --bg-rgb: 10,10,12; --ink-rgb: 244,240,233; --accent-rgb: 255,74,46;
  --line: rgba(var(--ink-rgb), 0.10);   /* dalītāji */
  --line-2: rgba(var(--ink-rgb), 0.18); /* apmales */
}
```

`color-scheme: dark` vienmēr. Iezīmēšana (selection): fons `--accent`, teksts `--bg`.

**Krāsu likumi**

- Viens akcents uz skata, ≤10% no virsmas. Nekādu neona spīdumu, halo ēnu, daudzkrāsu gradientu.
- **Vienīgais atļautais gradients ir punkts** (`--accent` → `--accent-deep`). Ja gradients parādās kaut kur citur — kļūda.
- **Kontrasts obligāti:** kad akcents ir aizpildījums (poga, badge, taga fons), teksts uz tā ir **`--bg`, nevis `--ink`**. Balta/krēma tinte uz vermiliona = ~2,9:1 → krīt cauri. `--bg` uz `--accent` = ~5,9:1 → der.
- `--ink-faint` uz `--bg` ~5,3:1 — tikai meta ≥14px; zem tā lieto `--ink-dim`.
- Fokusa gredzens: `--accent`, 2px, ar 2px atstarpi, redzams uz jebkuras virsmas.
- **Nav zaļās/zilās/citu akcentu** rast zīmola lapās. Formas statusi: sūta = `--ink-dim`, OK = `--ink`, kļūda = `--accent`.

## Izkārtojums, režģis, atstarpes

```css
--container: 1320px;
--gutter: clamp(20px, 5vw, 80px);
--ease: cubic-bezier(0.22, 1, 0.36, 1); /* mājas līkne */
--radius: 18px; /* viss taisnstūrainais: kartes, ievadi, modālie */
/* pilēm (pogas): 100px */
```

- **Rādiuss — tikai divas vērtības:** `18px` taisnstūrainajam, `100px` pilēm. Vairāk nav.
- Sekciju vertikālais padding `clamp(70px, ..., 200px)` — gaiss signalizē premium.
- Matiņlīnijas dala sekcijas; līdzinājums stingrs. Numerācija tikai īstai secībai (piem. 4 soļu process), nekad kā dekors.
- Ķermenis: Inter 16px/1,6, svars 400, `-webkit-font-smoothing: antialiased`.

## Tipogrāfijas skala (v3)

| Elements | Izmērs | Saime / svars | Piezīmes |
|---|---|---|---|
| Hero display | `clamp(33px, 9.6vw, 150px)` | Bricolage 700 | **line-height ≥1,05** (divrindu 1,10), ls −0,035em, 96pt griezums |
| CTA virsraksts | `clamp(34px, 11vw, 168px)` | Bricolage 700 | −0,035em, 96pt |
| Sekcijas virsraksts | `clamp(30px, 4.6vw, 62px)` | Bricolage 600 | 1,05–1,10, −0,02em, 96pt |
| Kartes ievads | `clamp(19px, 1.9vw, 27px)` | Bricolage 500 | 1,15–1,22 |
| Pamatteksts | 16px (1,6) | Inter 400 | |
| Mazais teksts | 15px | Inter 400 | |
| Etiķete / eyebrow | 11–13px | Inter 500 | VERSĀLI, tracking 0,18em, 22px vermiliona svītriņš pirms; **nekad monospace, nekad pulsējošs punkts** |

- **Display line-height minimums latviešu tekstam: 1,05** (nekad 0,9 — saduras garumzīmes un komati). Sīkāk: [fonts.md](fonts.md).
- Hero un sekciju virsrakstiem lieto Bricolage **96pt** optisko griezumu.

## Komponenti

- **Pogas:** radius 100px (pilnas kapsulas), Inter 500. `--solid` = akcenta fons, **teksts `--bg`**, kluss hover pacēlums. `--ghost` = `--line-2` apmale, hover pildās ar akcentu (teksts kļūst `--bg`). Bez magnētiskā efekta (v3 izņēma).
- **Kartes:** virsma no `--surface`/`--surface-2`, radius 18px, apmale `--line`. Bez apmalēm visur, kur atstarpe un viena matiņlīnija nes struktūru.
- **Formas lauki:** fons `--bg`/`--bg-2`, apmale `--line-2`, radius 18px, fokusā akcenta apmale.
- **Saraksti:** bez bullet; `→` akcentā ar `::before`, rindas `border-top: --line`.
- **FAQ:** `<details>` ar `::details-content` pāreju; +/− no divām svītrām.

## Kustība un efekti (v3)

### Signature — punkta ceļojums (vienīgais Creator moments)

- Signature ir **pats punkts un nekas cits.** Tas atdalās no hero wordmarka, nolaižas pa lapu un **apsēžas kājenes wordmarkā**. Viena forma, viena krāsa, viena kustība.
- **Trīs atpūtas punkti** (pēc hero, pie procesa sekcijas, kājenē). Pārvietojas tikai starp tiem, katrā apstājas pilnīgi.
- **Neseko ritināšanai nepārtraukti** — nav pozīcijas kartēšanas pret scroll offset (citādi tā ir progress bar). Vada `IntersectionObserver`, ne `scroll` notikums.
- **Viens elements**, kas kustas ar `transform: translate3d()`. Nav canvas, nav WebGL, nav animācijas bibliotēkas. Signature JS ≤ **5 KB** gzipped.
- `prefers-reduced-motion` → punkts vienkārši paliek wordmarkā.

### Viss pārējais (Ruler) — mierīgs

Smalki fade-up atklājumi, klusi hover pacēlumi, gluda ritināšana. Easing `--ease`.

**Izņemts v3 (NELIETOT):** partikuļu vilnis, pielāgots kursora punkts, magnētiskas pogas, scroll-progress josla, fontu morphing, cikliskas pulsācijas (t.sk. pulsējošs eyebrow punkts), orbitējošs kājenes punkts. Ja kāds no šiem parādās — kļūda.

### Veiktspējas budžets

LCP elements ir hero virsraksts (teksts renderējas uzreiz). Mērķi: LCP < 2,0s uz 4G, INP < 200ms, CLS < 0,1, Lighthouse mobile ≥ 95.

## Tekstūra un attēli

- **Grauds:** tikko manāma plēves faktūra (~4% caurspīdība) pār tumšo. v3 mērķis — viens atkārtots PNG ≤ 8 KB (pašreiz `styles.css` lieto inline SVG `feTurbulence`; abi der, kamēr bez `mix-blend-mode` ritināšanas veiktspējai).
- **Attēli:** īsti projektu ekrānuzņēmumi kartēs. Akcents nekad nesēž virsū fotogrāfijai. `.avif` + `.webp` fallback, `loading="lazy"` zem fold, skaidri `width`/`height`.
- **Foni:** ne vairāk kā viens mīksts vienkrāsains vermiliona uzplaiksnījums uz sekciju (`--accent-deep`/`--accent-soft` radiāli), nekad gradientu zupa.

## Logo un asset faili

**Wordmark:** mazie burti `rast` (Bricolage 700, ciešs tracking) + **ciets vermiliona punkts augšējā labajā stūrī** — zīmola atoms un vienīgais animētais elements (signature ceļojums). Punkts vienmēr ciets: nekad gails, nekad ar ēnu, nekad ar apli apkārt. Uz tumša — ink baltas burtu formas + vermiliona punkts.

| Fails | Kas tas ir |
|---|---|
| `rast/assets/wordmark.png` | vārdzīmes etalons "rast" + punkts (1280×720) |
| `rast/assets/favicon.svg` | **tikai punkts uz `--bg`** (v3: burti 16px nesalasās) |
| `rast/assets/favicon-192.png`, `apple-touch-icon.png` | 192×192 / 180×180 |
| `rast/assets/og.png` | 1200×630, `--bg` fons, Bricolage 700 virsraksts, punkts apakšējā labajā |
| `rast/assets/work-*.webp` (+ .png) | darbu attēli 1300×975 |

**Pašreizējais stāvoklis:** live wordmark vēl izmanto veco attēla treatment; punkta ceļojums (dzīvs atsevišķs punkta elements) ir atvērtais v3 motion solis.

## E-pastu HTML tēma

Tie paši tokeni (vērtības ieliek tieši, jo CSS mainīgos e-pasti neatbalsta): `--bg` fons, `--surface` karte, `--ink` teksts, `--ink-dim` sekundārais, `--accent` akcents. Poga = akcenta kapsula ar **`--bg` tekstu**. Atslēgas frāzes izceļ ar `<em>`.

## Datu vizualizāciju izņēmums

Analītikas/iekšējām atskaišu lapām pieļaujama atsevišķa datu identitāte (precedents `mjslapu-nepiciesamiba`): fons `#0a0e1a`, Space Grotesk + Inter, tier krāsas `#f87171`/`#fbbf24`/`#34d399`, akcents `#818cf8`. **rast zīmola lapām to nelietot.** Robeža pret klientu darbiem (v3 §12): neviens klienta projekts nemanto vermilionu, Bricolage vai punktu — pārnesas tikai kvalitātes latiņa, ne izskats.
