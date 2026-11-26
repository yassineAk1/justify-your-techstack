'use client';

import { useActionState, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { checkAnswer } from '../actions';

// Eén form per vraag, met dezelfde HTML als QuizQuestion.svelte en AnswerOption.svelte in de referentie.
// 'use client': dit component draait ook in de browser (hydratie), zodat nakijken zonder server kan.
export default function QuizQuestion({ question, number }) {
	// Zonder JavaScript: de form gaat naar de Server Action (app/actions.js).
	// Next rendert de pagina opnieuw, en serverResult bevat dan { chosenKey } voor alleen deze vraag.
	const [serverResult, formAction] = useActionState(checkAnswer, null);
	// Met JavaScript: de letter die in de browser is nagekeken (zie check)
	const [checkedInBrowser, setCheckedInBrowser] = useState('');
	// Het <output>-element, om er na het nakijken naartoe te scrollen
	const output = useRef(null);

	// Pas gevuld na Controleer, dus feedback verschijnt pas na een bewuste klik
	const checkedKey = checkedInBrowser || serverResult?.chosenKey || '';
	const correctKey = question.options.find((option) => option.is_correct).key;
	const isCorrect = checkedKey === correctKey;
	const result = isCorrect ? 'correct' : 'incorrect';

	let status = 'Nog niet beantwoord';
	if (checkedKey) status = isCorrect ? 'Goed beantwoord' : 'Fout, probeer het nog eens';

	function check(event) {
		// Houdt de Server Action tegen, dus met JavaScript gebeurt het nakijken hier in de browser
		event.preventDefault();
		const chosenKey = new FormData(event.currentTarget).get(`question-${question.id}`);

		// flushSync: React werkt de HTML meteen bij, anders scroll je naar een lege output
		flushSync(() => setCheckedInBrowser(chosenKey));
		output.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}

	// Geen method="POST": bij een Server Action als action zet React zelf method="POST" en
	// enctype="multipart/form-data", plus een paar verborgen inputs die Next nodig heeft.
	return (
		<form action={formAction} onSubmit={check}>
			<header>
				<p>Vraag {number}</p>
				<p>{status}</p>
			</header>

			<fieldset>
				<legend>{question.question}</legend>
				{question.options.map((option) => (
					// Alleen het nagekeken label krijgt de class correct of incorrect
					<label key={option.key} className={option.key === checkedKey ? result : undefined}>
						<input
							type="radio"
							name={`question-${question.id}`}
							value={option.key}
							required
							// Na nakijken zonder JavaScript staat het gekozen antwoord weer aangevinkt
							defaultChecked={option.key === serverResult?.chosenKey}
						/>
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
