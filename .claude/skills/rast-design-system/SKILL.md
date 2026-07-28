---
name: rast-design-system
description: >-
  This skill should be used when BUILDING anything for rast studija — new pages
  or sections for raststudio.lv, client demo sites (melnraksti), landing pages,
  internal HTML pages/dashboards, email HTML, slides or social images, or
  deploying any of these to GitHub Pages. Triggers include "uztaisi melnrakstu /
  demo lapu salonam", "jauna sadaļa lapai", "iekšēja HTML lapa", "publicē uz
  Pages", "build/deploy a site", "izveido prezentāciju". Contains v3 design
  tokens (#0A0A0C bg, #FF4A2E vermilion, full type scale), the two-family type
  system (Bricolage Grotesque + Inter — no monospace), the dot-journey
  signature, build/deploy conventions, and real asset paths. For the words on
  rast-owned pages use rast-brand; client demos speak in the client's voice.
---

# rast dizaina sistēma (v3)

Tumšā vermiliona sistēma, ko lieto raststudio.lv un visi iekšējie rīki (rast-koks, rastbotinfo, rast-ieteikumi). Arhetipu sajaukums **Creator 70 / Ruler 30** — viens drosmīgs žests atturīgā, sakārtotā sistēmā. Avots: `rast/css/styles.css`.

## Kodols

- Fons `#0A0A0C`, virsmas `#131318`/`#17171D`, teksts silti balts `#F4F0E9`, sekundārais `#A7A2AE`, **vienīgais akcents** vermilions `#FF4A2E`. Viens akcents ≤10% no virsmas; vienīgais atļautais gradients ir punkts. Teksts uz akcenta aizpildījuma ir `--bg`, nekad balts. Pilnā palete, kontrasta likumi un type scale: [tokens.md](tokens.md).
- **Tikai divas saimes:** **Bricolage Grotesque** (display, 96pt griezums lielajiem virsrakstiem) + **Inter** (pamatteksts, UI, etiķetes). Nav monospace, nav Space Mono, nav dekoratīvu fontu. Display line-height ≥1,05 latviešu tekstam. Ielāde un latviešu diakritika: [fonts.md](fonts.md).
- **Signature:** viens vermiliona punkts, kas atdalās no hero wordmarka un apsēžas kājenē (trīs atpūtas punkti, `IntersectionObserver`, ≤5 KB JS). Nav partikuļu, nav kursora punkta, nav magnētisku pogu, nav fontu morphing, nav pulsāciju. Sīkāk: [tokens.md](tokens.md#kustība-un-efekti-v3).
- Logo: mazie burti "rast" + ciets vermiliona punkts augšā pa labi (zīmola atoms). Logo faili un asset ceļi: [tokens.md](tokens.md#logo-un-asset-faili).
- Būve: tīrs statisks HTML/CSS/vanilla JS, **bez build soļa**. Deploy uz GitHub Pages (dupitrs konts = raststudio.lv + iekšējie rīki; org `rast-studio` = klientu lapas, pušo no dupitrs kā org owner/admin). Konvencijas, deploy paterni un demo lapu process: [build.md](build.md).

## Kad kuru identitāti lietot

| Ko būvē | Identitāte |
|---|---|
| raststudio.lv lapas, rast IG grafika, slaidi, e-pastu HTML | rast tumšā sistēma (šis skill) |
| Iekšējie rīki un atskaites | rast tumšā sistēma |
| Datu vizualizāciju lapas | pieļaujama atsevišķa datu identitāte (precedents: mjslapu-nepiciesamiba) — sk. tokens.md |
| **Klienta demo lapa (melnraksts)** | **klienta zīmols, NE rast tumšā sistēma.** No rast ņem tikai kvalitātes latiņu un būves konvencijas (build.md) |

Tekstiem uz rast lapām un materiāliem izmanto rast-brand. Klienta demo lapa runā klienta balsī — no rast-brand pārnesami tikai vispārīgie principi (godīgums, īsi teikumi, bez buzzwordiem) un `latvian_lang_skill`.

## Kvalitātes latiņa (jebkurai lapai)

- Telefons pirmais: ar mobilo skatu sāk, ne beidz.
- Ātra ielāde: WebP attēli, lazy loading, minimālas atkarības.
- Animācijas vienmēr ar fallback: ja CDN vai JS krīt, lapai jāstrādā (no-anim princips, sk. build.md).
- SEO pamati katrā publiskā lapā: title, description, canonical, JSON-LD, og attēls.

## Atsauces faili

| Fails | Kad lasīt |
|---|---|
| [tokens.md](tokens.md) | krāsas, tipogrāfija, komponenti, efekti, asset ceļi |
| [fonts.md](fonts.md) | fontu saimes, svari, Google Fonts URL, ielādes stratēģija |
| [build.md](build.md) | būves konvencijas, GitHub Pages deploy, demo lapu process, SEO |
