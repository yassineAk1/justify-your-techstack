import { cacheLife } from 'next/cache';

// Zelfde Directus-query als de 11ty-versie en de SvelteKit-referentie
const endpoint =
	'https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions' +
	'?fields=id,question,options,explanation_correct,explanation_wrong,exhibit_section_id' +
	'&filter[exhibit_section_id][_nnull]=true';

// 'use cache': Next onthoudt het resultaat, dus de vragen worden tijdens de build opgehaald
// en de pagina wordt statische HTML (net als bij 11ty en Nuxt).
// cacheLife('max'): het profiel voor "stable content that rarely changes" (ververst hooguit eens per 30 dagen).
export async function getQuestions() {
	'use cache';
	cacheLife('max');

	const response = await fetch(endpoint);

	// Liever een mislukte build dan een lege quiz online
	if (!response.ok) throw new Error(`Directus gaf status ${response.status}`);

	const { data } = await response.json();
	return data;
}
