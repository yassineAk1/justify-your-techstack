<script setup>
// Haalt de vragen op tijdens de build. Het resultaat gaat als payload mee, dus de browser fetcht niet opnieuw.
const { quizEndpoint } = useRuntimeConfig().public;
const { data: questions, error } = await useFetch(quizEndpoint, {
	transform: (response) => response.data,
});

// Liever een mislukte build dan een lege quiz online
if (error.value) {
	throw createError({ statusCode: 502, statusMessage: 'Directus gaf geen quizvragen', fatal: true });
}
</script>

<template>
	<section>
		<QuizQuestion
			v-for="(question, index) in questions"
			:key="question.id"
			:question="question"
			:number="index + 1"
		/>
	</section>
</template>