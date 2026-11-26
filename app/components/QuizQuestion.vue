<script setup>
defineProps({
	question: { type: Object, required: true },
	number: { type: Number, required: true },
});
</script>

<template>
	<form method="POST" action="/controleer">
		<header>
			<p>Vraag {{ number }}</p>
			<p>Nog niet beantwoord</p>
		</header>

		<fieldset>
			<legend>{{ question.question }}</legend>
			<label v-for="option in question.options" :key="option.key">
				<input type="radio" :name="`question-${question.id}`" :value="option.key" required>
				<span>{{ option.key }}</span>
				{{ option.answer }}
			</label>
		</fieldset>

		<button type="submit" name="questionId" :value="question.id">Controleer</button>

		<output></output>
	</form>
</template>