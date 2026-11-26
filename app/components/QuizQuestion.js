'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

// Eén form per vraag, met dezelfde HTML als QuizQuestion.svelte en AnswerOption.svelte in de referentie.
// 'use client': dit component draait ook in de browser (hydratie), zodat nakijken zonder server kan.
export default function QuizQuestion({ question, number }) {
	// De letter die is nagekeken: pas gevuld na Controleer, dus feedback verschijnt pas na een bewuste klik
	const [checkedKey, setCheckedKey] = useState('');
	// Het <output>-element, om er na het nakijken naartoe te scrollen
	const output = useRef(null);

	const correctKey = question.options.find((option) => option.is_correct).key;
	const isCorrect = checkedKey === correctKey;
	const result = isCorrect ? 'correct' : 'incorrect';

	let status = 'Nog niet beantwoord';
	if (checkedKey) status = isCorrect ? 'Goed beantwoord' : 'Fout, probeer het nog eens';

	function check(event) {
		// Houdt de POST tegen, dus nakijken gebeurt hier in de browser
		event.preventDefault();
		const chosenKey = new FormData(event.currentTarget).get(`question-${question.id}`);

		// flushSync: React werkt de HTML meteen bij, anders scroll je naar een lege output
		flushSync(() => setCheckedKey(chosenKey));
		output.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}

	return (
		<form method="POST" onSubmit={check}>
			<header>
				<p>Vraag {number}</p>
				<p>{status}</p>
			</header>

			<fieldset>
				<legend>{question.question}</legend>
				{question.options.map((option) => (
					// Alleen het nagekeken label krijgt de class correct of incorrect
					<label key={option.key} className={option.key === checkedKey ? result : undefined}>
						<input type="radio" name={`question-${question.id}`} value={option.key} required />
						<span>{option.key}</span>
						{option.answer}
					</label>
				))}
			</fieldset>

			<button type="submit" name="questionId" value={question.id}>
				Controleer
			</button>

			<output ref={output}>
				{checkedKey && (
					<p className={result}>
						{checkedKey} {isCorrect ? question.explanation_correct : question.explanation_wrong}
					</p>
				)}
			</output>
		</form>
	);
}
