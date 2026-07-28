# rast būves un deploy konvencijas

## Pamatprincips

Tīrs statisks HTML/CSS/vanilla JS, **bez build soļa un bez npm**. Lokālais priekšskatījums:

```bash
python3 -m http.server 5173 # (ES moduļiem obligāti serveris, ne file://)
```

## Bibliotēkas (no CDN, vienmēr ar fallback)

Galvenā lapa lieto: three.js r128 (cdnjs), lenis@1.1.14 un gsap@3.12.5 + ScrollTrigger (jsdelivr). Obligātais drošības paterns:

- Viss animāciju kods aizsargāts: ja CDN nav ielādējies, lapa strādā bez animācijām (no-anim princips).
- `<html class="js">` + head skripts, kas pēc 3 s bez `window.__rastBooted` uzliek `no-anim` klasi — saturs vienmēr redzams.
- Atsevišķām lapām boot watchdog + redzams fallback (precedents: mjslapu 10 s watchdog ar kļūdas paneli un pilnu satura sarakstu kā alternatīvu).
- `prefers-reduced-motion` ievērot.

## Kontaktu forma

Web3Forms bez backend: JS `fetch` POST uz `https://api.web3forms.com/submit` (`rast/js/main.js`), honeypot checkbox `botcheck`, slēptie lauki `subject` un `from_name`. Produkcijas atslēga jau ir `rast/index.html` (publiska pēc dizaina). Statusa teksti: "Sūta…" / "Paldies! Pieteikums nosūtīts, atbildēsim drīz." / kļūda ar hello@raststudio.lv.

## SEO konvencijas (katrai publiskai lapai)

- `<html lang="lv">`, `theme-color #0A0A0C`, canonical uz `https://www.raststudio.lv/...` (ar www).
- JSON-LD: ProfessionalService (sākumlapa), Service + BreadcrumbList (pakalpojumu lapas), Article (raksti), FAQPage (ja lapā ir FAQ).
- OG: `og:locale lv_LV`, `og:image` 1200×630 (`assets/og.png`), twitter summary_large_image.
- `sitemap.xml` atjaunot ar lastmod pie katras jaunas lapas; robots.txt ar Sitemap rindu.
- Lapā attēli WebP; PNG paralēli tikai og:image vajadzībām.

## GitHub Pages deploy (konti: dupitrs + raststudio)

Git identitāte repo līmenī: `Raivis <rraivis2006@gmail.com>` (globālās nav — jauniem repo jāuzliek lokāli).

### GitHub struktūra — konts + organizācija

- **dupitrs** — vēsturiskais darba konts. Šeit dzīvo raststudio.lv un iekšējie rīki (rast-koks, rastbotinfo, rast-ieteikumi u.c.). Visa `gh` CLI + git autorizācija jau uzstādīta uz šo kontu.
- **raststudio** (https://github.com/raststudio) — zīmola personīgais konts; tam pieder organizācija.
- **rast-studio** (organizācija, īpašnieks = raststudio konts) — KLIENTU lapu repo dzīvo šeit. Piem. `rast-studio/juris-zuitins-1`.

**Darba princips: klientu repo ir org `rast-studio`; pušo un deployo no `dupitrs`, kas org pievienots ar Owner/Admin. NEPĀRSLĒDZAM kontus.**

- Org vajadzīga tāpēc, ka personīgā konta collaboratoram ir tikai viens līmenis (≈ write) — Read/Triage/Write/Maintain/Admin granularitāte ir TIKAI org repo. Bez Admin nestrādā `gh api .../pages`.
- dupitrs ir org owner → automātiski admin visos org repo (`admin:true` pārbaudīts uz juris-zuitins-1). Pages deploy strādā bez papildu iestatīšanas.
- GitHub MCP serveris pieslēdzas pa vienam kontam (OAuth) — divi vienlaikus nav iespējams. Bet tas nav vajadzīgs: deploy iet caur `gh` CLI + `git`, nevis MCP serveri.
- Emīns / Raineris (apakšuzņēmēji) → org People → Invite member, parasti Write.

**SVARĪGI — Free org neatbalsta PRIVĀTA repo Pages.** `gh api .../pages` atgriež `422 "Your current plan does not support GitHub Pages for this repository"`. Team/Enterprise maksā. Risinājums klientu lapām: **repo jābūt PUBLISKAM** (Pages uz Free tad strādā). Tas ir OK — statiskas mājaslapas kods = tās publiskais rezultāts, ko tik un tā redz dzīvajā URL; svarīgi tikai, lai repo NESATUR noslēpumus (nav API atslēgu — Web3Forms atslēga ir publiska pēc dizaina). Demo laikā `noindex,nofollow` + `robots.txt Disallow: /` tur to ārā no Google; pie go-live (CNAME uz klienta domēnu) noindex noņem. Repo publisku: `gh api repos/<org>/<repo> -X PATCH -F private=false` (gh šai versijai NAV `--accept-visibility-change-consequences` flaga).

### Publisks projekts (paraugs: rast, mjslapu)

Branch Pages: repo saknē `.nojekyll` (tukšs), branch `main`. Galvenajai lapai `CNAME` ar `www.raststudio.lv`.

### Privāta/iekšēja lapa (paraugs: rast-koks)

- Repo vārds ar nejaušu sufiksu (piem., `rast-koks-d496d5`), sufiksu ieraksta `.reponame` failā.
- `robots.txt` ar `Disallow: /` + meta `noindex, nofollow` + kājenē "iekšējā lapa".
- Deploy caur Actions (`.github/workflows/pages.yml`), branch `master` (vēsturiski; jauniem repo izmantot `main` un pielāgot trigeri).
- ZINĀMĀ PROBLĒMA privātā repo Pages: deployment statuss "in progress" mūžīgi un bloķē nākamo deploy. Pārbaudīts risinājums (workaround) jau ir `rast-koks/.github/workflows/pages.yml`: pirms deploy caur API atceļ iepriekšējo deployment, gaida (curl cilpā līdz 35 min), līdz builda marķieris (`meta name="build"` ar SHA) parādās dzīvajā lapā, un tikai TAD atceļ savu deployment. Ja izplatīšanās pavisam apstājas: pilns resets `gh api .../pages -X DELETE`, tad `-X POST -f build_type=workflow`. Jaunām privātām lapām kopēt šo workflow, nevis rakstīt no jauna.

## Klienta demo lapa (melnraksts) — process

Melnraksts ir pārdošanas solis (sk. rast-brand), tāpēc ātrums svarīgāks par pilnību:

1. **Klienta zīmols, ne rast tumšā sistēma**: krāsas un noskaņa no klienta IG profila/foto; ja zīmola nav, neitrāli gaišs pamats. rast identitāti demo NEuzspiest.
2. Viena lapa: hero ar būtību un CTA, pakalpojumi/cenas, darbi/foto, pieteikšanās (poga zvanam/WhatsApp — formu backend demo nevajag).
3. Telefons pirmais, WebP attēli, bez smagām bibliotēkām. Statisks HTML viens fails vai +css.
4. Reālais klienta saturs, cik pieejams (no IG profila); trūkstošo marķēt kā aizvietojamu, NEizdomāt cenas vai atsauksmes.
5. Publicēšanai: privātās lapas paraugs (nejaušs sufikss + noindex), lai demo nav atrodams meklētājos.

## Slaidi / sociālie attēli

Attēlu `aspect-ratio` lamatas: ja `<img>` ir HTML `width`/`height` atribūti UN CSS `aspect-ratio`, tad `height` atribūts darbojas kā prezentācijas norāde (`height: Npx`) un **atceļ `aspect-ratio`** → attēls renderējas ar pilno intrinsic augstumu (izstiepts/milzīgs). Fix: CSS pievieno `height: auto` blakus `aspect-ratio` (tad ratio strādā un `object-fit: cover` kadrē). Piemērs: `juris-zuitins-1` hero foto (1280×1920) renderējās 427×1920, kamēr nebija `height:auto`. Pārbaudi ar Playwright: `getComputedStyle(img).height` jābūt atvasinātam no ratio, ne intrinsic.

Kirilica (LV/RU lapas): Google Fonts **Lato NEATBALSTA kirilicu** (tikai latin/latin-ext) — RU teksts atkristu uz sistēmas fontu. Risinājums: RU lapām pievieno **Open Sans** (tuvākais Lato radinieks ar pilnu kirilicu) un liec CSS font stack `"Lato", "Open Sans", system-ui, sans-serif` — latīņu glifi → Lato, kirilica → Open Sans (pārlūks aizvieto pa glifam). LV lapām Open Sans nelādē. Pārbaudīts: `juris-zuitins-1`. Vispārīgi pirms bilingvālas lapas fonta izvēles: `curl -s "https://fonts.googleapis.com/css2?family=<Fonts>&display=swap" -A "<Chrome UA>" | grep -o '/\* [a-z-]* \*/'` parāda pieejamos subsetus.

Slaidu ģenerēšanas rīku repo pagaidām NAV. Ja vajag IG grafiku vai slaidus: HTML lapa rast tokenos (1080×1350 vai 1080×1080 rāmis) + ekrānuzņēmums. Ja Raivis apstiprina pastāvīgu rīku, dokumentēt to šeit.

## Atkārtoti izmantojamie gabali

- Rakstu/case lapu galviņa un stils: `rast/raksti/*.html` un `rast/darbi/*.html` (inline `<style>`, ~70 rindas — kopēt no jaunākā faila; ilgtermiņā vērts iznest kopīgā css).
- E-pastu HTML kartes paraugs: `epastu bota kods/rast-email-sender/rast-epasti/*.html`.
- Interaktīvas iekšējās lapas karkass (tumšā sistēma + canvas): `rast-koks/index.html`.
