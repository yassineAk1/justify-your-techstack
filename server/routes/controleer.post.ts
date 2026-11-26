// Nakijken zonder JavaScript: de form POST komt hier binnen.
// Deze route stuurt door naar de geprerenderde antwoordpagina (app/pages/antwoord/[id]/[letter].vue).
// Het nakijken zelf staat dus in de HTML van die pagina; deze route kiest alleen de juiste pagina.
export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);
	const questionId = Number(formData.get('questionId'));
	const chosenKey = String(formData.get(`question-${questionId}`) ?? '');

	// Alleen een vraag-id en één letter doorlaten
	if (!Number.isInteger(questionId) || !/^[a-z]$/i.test(chosenKey)) {
		return sendRedirect(event, '/', 303);
	}

	// 303: de browser doet daarna een GET op de antwoordpagina
	return sendRedirect(event, `/antwoord/${questionId}/${chosenKey.toLowerCase()}/`, 303);
});
