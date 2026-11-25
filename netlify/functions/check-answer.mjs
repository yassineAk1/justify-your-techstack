// Nakijken zonder JavaScript. 11ty heeft zelf geen server, dus dit is een Netlify Function.
// Hij leest de form uit en stuurt door naar de vooraf gegenereerde antwoordpagina (src/antwoord.njk).
// Het echte nakijken staat dus in de HTML van die pagina; deze functie kiest alleen de juiste pagina.

export default async function checkAnswer(request) {
	const home = new URL('/', request.url);

	if (request.method !== 'POST') return Response.redirect(home, 303);

	const formData = await request.formData();
	const questionId = Number(formData.get('questionId'));
	const chosenKey = String(formData.get(`question-${questionId}`) ?? '');

	// Alleen een vraag-id en één letter doorlaten
	if (!Number.isInteger(questionId) || !/^[a-z]$/i.test(chosenKey)) {
		return Response.redirect(home, 303);
	}

	// 303: de browser doet daarna een GET op de antwoordpagina
	return Response.redirect(new URL(`/antwoord/${questionId}/${chosenKey.toLowerCase()}/`, request.url), 303);
}

export const config = {
	path: '/controleer',
};
