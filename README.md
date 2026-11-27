# justify-your-techstack

Onderzoek naar 11ty, Next.js en Nuxt voor de leertaak [Choices, Choices – The Tech-stack](https://github.com/fdnd-task/choices-choices-the-tech-stack/wiki) (FDND, sprint 16).

**Onderzoeksvraag:** welke tech-stack (11ty, Next.js of Nuxt) past het best bij de quiz op het museumplatform van Q42?

## Inhoud

- [Opzet](#opzet)
- [Versies](#versies)
- [Resultaten](#resultaten)
- [Conclusie](#conclusie)
- [Licentie](#licentie)

## Opzet

Dezelfde quiz in drie frameworks: de Teylers-vragen uit Directus, een antwoord kiezen, nakijken en uitleg krijgen. HTML, CSS en data zijn overal gelijk, zodat alleen het framework verschilt. De referentie is de SvelteKit-quiz uit [`fdnd-agency/q42museumplatform`](https://github.com/fdnd-agency/q42museumplatform). Elk framework staat op een eigen branch; de branches worden niet samengevoegd.

## Versies

| Framework | Branch | Live | Issue |
|---|---|---|---|
| 11ty | [`2-11ty`](https://github.com/yassineAk1/justify-your-techstack/tree/2-11ty) | https://quiz-11ty.netlify.app | [#2](https://github.com/yassineAk1/justify-your-techstack/issues/2) |
| Next.js | [`3-next`](https://github.com/yassineAk1/justify-your-techstack/tree/3-next) | https://quiz-nextjs.netlify.app | [#3](https://github.com/yassineAk1/justify-your-techstack/issues/3) |
| Nuxt | [`4-nuxt`](https://github.com/yassineAk1/justify-your-techstack/tree/4-nuxt) | https://quiz-nuxt.netlify.app | [#4](https://github.com/yassineAk1/justify-your-techstack/issues/4) |

Onderzoeksplan en doelgroep: [#1](https://github.com/yassineAk1/justify-your-techstack/issues/1). Testplan en metingen: [#5](https://github.com/yassineAk1/justify-your-techstack/issues/5). Renderstrategie: [#6](https://github.com/yassineAk1/justify-your-techstack/issues/6).

## Resultaten

| | 11ty | Next.js | Nuxt |
|---|---|---|---|
| Lighthouse (mobiel) | 100 × 4 | 100 × 4 | 100 × 4 |
| Quiz in beeld (filmstrip) | 1,28 s | 1,31 s | 1,35 s |
| Paginagewicht | 237 kB | 370 kB | 316 kB |
| JavaScript | 12 kB | 143 kB | 89 kB |
| JavaScript uitvoeren | 19 ms | 128 ms | 53 ms |
| Nakijken zonder JS | Netlify Function | Server Action | Server route |
| Axe | 0 (was 2) | 0 | 0 |

JavaScript is inclusief het Netlify-script (±11 kB) dat op elke site staat. Gemeten met speedlify2 en de Lighthouse CLI; details in [#5](https://github.com/yassineAk1/justify-your-techstack/issues/5).

## Conclusie

Voor het Q42-museumplatform kiezen wij **Next.js**. Q42 werkt er zelf al in, zonder JavaScript werken is er het eenvoudigst (één Server Action), en de community is het grootst. Next stuurt wel de meeste JavaScript mee, maar de quiz staat in alle drie even snel in beeld. De uitwerking met argumentatieschema staat in [#1](https://github.com/yassineAk1/justify-your-techstack/issues/1).

## Licentie

[MIT](LICENSE)
