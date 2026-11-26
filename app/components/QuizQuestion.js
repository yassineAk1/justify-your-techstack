// Eén form per vraag, met dezelfde HTML als QuizQuestion.svelte en AnswerOption.svelte in de referentie
export default function QuizQuestion({ question, number }) {
	return (
		<form method="POST">
			<header>
				<p>Vraag {number}</p>
				<p>Nog niet beantwoord</p>
			</header>

			<fieldset>
				<legend>{question.question}</legend>
				{question.options.map((option) => (
					<label key={option.key}>
						<input type="radio" name={`question-${question.id}`} value={option.key} required />
						<span>{option.key}</span>
						{option.answer}
					</label>
				))}
			</fieldset>

			<button type="submit" name="questionId" value={question.id}>
				Controleer
			</button>

			<output></output>
		</form>
	);
}
