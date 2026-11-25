// Haalt de quizvragen tijdens de build op uit Directus, met dezelfde query als de SvelteKit-referentie
const endpoint =
	'https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions' +
	'?fields=id,question,options,explanation_correct,explanation_wrong,exhibit_section_id' +
	'&filter[exhibit_section_id][_nnull]=true';

export default async function () {
	const response = await fetch(endpoint);

	// Liever een mislukte build dan een lege quiz online
	if (!response.ok) throw new Error(`Directus gaf status ${response.status}`);

	const { data: questions } = await response.json();

	// Eén pagina per vraag + gekozen letter, voor nakijken zonder JavaScript (zie antwoord.njk)
	const answerPages = questions.flatMap((question) =>
		question.options.map((option) => ({ questionId: question.id, chosenKey: option.key })),
	);

	// Alleen wat quiz.js nodig heeft om in de browser na te kijken
	const answers = Object.fromEntries(
		questions.map((question) => [
			question.id,
			{
				correctKey: question.options.find((option) => option.is_correct).key,
				explanation_correct: question.explanation_correct,
				explanation_wrong: question.explanation_wrong,
			},
		]),
	);

	return { questions, answerPages, answers };
}
