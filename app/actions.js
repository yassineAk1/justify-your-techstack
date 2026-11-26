'use server';

// Nakijken zonder JavaScript: de form POST komt hier binnen als Server Action.
// Next voert deze functie uit op de server en rendert daarna dezelfde pagina opnieuw met het resultaat,
// dus de URL blijft / (net als in de SvelteKit-referentie, en anders dan bij 11ty en Nuxt).
// Het nakijken zelf (goed of fout) staat in QuizQuestion.js; deze functie geeft alleen de gekozen letter terug.
export async function checkAnswer(previousState, formData) {
	const questionId = Number(formData.get('questionId'));
	const chosenKey = String(formData.get(`question-${questionId}`) ?? '');

	// Alleen een vraag-id en één letter doorlaten
	if (!Number.isInteger(questionId) || !/^[a-z]$/i.test(chosenKey)) return null;

	return { chosenKey };
}
