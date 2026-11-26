<script setup>
const props = defineProps({
	// Alleen op de antwoordpagina's: { questionId, letter } uit de URL
	checked: { type: Object, default: null },
});

// Haalt de vragen op tijdens de build. Het resultaat gaat als payload mee, dus de browser fetcht niet opnieuw.
const { quizEndpoint } = useRuntimeConfig().public;
const { data: questions, error } = await useFetch(quizEndpoint, {
	transform: (response) => response.data,
});

// Liever een mislukte build dan een lege quiz online
if (error.value) {
	throw createError({ statusCode: 502, statusMessage: 'Directus gaf geen quizvragen', fatal: true });
}

// De letter uit de URL hoort bij één vraag; voor de andere vragen is er nog niets nagekeken
function checkedKeyFor(question) {
	if (props.checked?.questionId !== question.id) return '';
	const option = question.options.find((option) => option.key.toLowerCase() === props.checked.letter);
	return option ? option.key : '';
}
</script>

<template>
	<section>
		<QuizQuestion
			v-for="(question, index) in questions"
			:key="question.id"
			:question="question"
			:number="index + 1"
			:initial-key="checkedKeyFor(question)"
		/>
	</section>
</template>
