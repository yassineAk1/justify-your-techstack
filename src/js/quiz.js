// Nakijken in de browser, als progressive enhancement.
// Zonder JavaScript gaat de form gewoon naar /controleer (de Netlify Function).

// Goede letter + uitleg per vraag-id, door 11ty in de pagina gezet (zie quiz.njk)
const answers = JSON.parse(document.getElementById('quiz-answers').textContent);

for (const form of document.querySelectorAll('main form')) {
	form.addEventListener('submit', checkAnswer);
}

function checkAnswer(event) {
	// Voorkomt dat de form naar de server gaat en de pagina herlaadt
	event.preventDefault();

	const form = event.currentTarget;
	const questionId = form.elements.questionId.value;
	const chosenKey = new FormData(form).get(`question-${questionId}`);
	const { correctKey, explanation_correct, explanation_wrong } = answers[questionId];
	const isCorrect = chosenKey === correctKey;
	const result = isCorrect ? 'correct' : 'incorrect';

	// Status rechtsboven in de card
	form.querySelector('header p:last-child').textContent = isCorrect
		? 'Goed beantwoord'
		: 'Fout, probeer het nog eens';

	// Alleen het gekozen label krijgt de class correct of incorrect
	for (const label of form.querySelectorAll('label')) {
		label.classList.remove('correct', 'incorrect');
		if (label.control.value === chosenKey) label.classList.add(result);
	}

	// Feedback in de output: de gekozen letter + de juiste uitleg
	const feedback = document.createElement('p');
	feedback.className = result;
	feedback.textContent = `${chosenKey} ${isCorrect ? explanation_correct : explanation_wrong}`;

	const output = form.querySelector('output');
	output.replaceChildren(feedback);

	output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
