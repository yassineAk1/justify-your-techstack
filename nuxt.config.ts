// Zelfde Directus-query als de 11ty-versie en de SvelteKit-referentie
const quizEndpoint =
	'https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions' +
	'?fields=id,question,options,explanation_correct,explanation_wrong,exhibit_section_id' +
	'&filter[exhibit_section_id][_nnull]=true';

export default defineNuxtConfig({
	compatibilityDate: '2026-11-26',
	devtools: { enabled: true },

	// Gedeelde CSS, 1-op-1 uit de 11ty-branch
	css: ['~/assets/css/style.css'],

	// Zelfde <head> als base.njk in de 11ty-versie
	app: {
		head: {
			htmlAttrs: { lang: 'nl' },
			title: 'Quiz · Nuxt',
			meta: [{ name: 'description', content: 'Test je kennis over de collectie van Teylers Museum.' }],
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
		},
	},

	// Zo kan Quiz.vue de URL opvragen met useRuntimeConfig()
	runtimeConfig: {
		public: { quizEndpoint },
	},

	// De quizpagina wordt tijdens de build statische HTML, net als bij 11ty
	routeRules: {
		'/': { prerender: true },
	},

	hooks: {
		// Nakijken zonder JavaScript: zet de 20 antwoordpagina's op de prerender-lijst.
		// Nuxt vindt pagina's door links te volgen, en niets linkt naar /antwoord/…
		async 'prerender:routes'({ routes }: { routes: Set<string> }) {
			const response = await fetch(quizEndpoint);
			if (!response.ok) throw new Error(`Directus gaf status ${response.status}`);
			const { data: questions } = await response.json();

			for (const question of questions) {
				for (const option of question.options) {
					routes.add(`/antwoord/${question.id}/${option.key.toLowerCase()}/`);
				}
			}
		},
	},
});