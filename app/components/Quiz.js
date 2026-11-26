import { getQuestions } from '../lib/quiz';
import QuizQuestion from './QuizQuestion';

// Server Component: draait alleen tijdens de build (of op de server), nooit in de browser
export default async function Quiz() {
	const questions = await getQuestions();

	return (
		<section>
			{questions.map((question, index) => (
				<QuizQuestion key={question.id} question={question} number={index + 1} />
			))}
		</section>
	);
}
