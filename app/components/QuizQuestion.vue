<script setup>
const props = defineProps({
	question: { type: Object, required: true },
	number: { type: Number, required: true },
});

// De radio die nu is aangeklikt (v-model)
const selected = ref('');
// De letter die is nagekeken: pas gevuld na Controleer, dus feedback verschijnt pas na een bewuste klik
const checkedKey = ref('');
// Het <output>-element, om er na het nakijken naartoe te scrollen
const output = useTemplateRef('output');

const correctKey = computed(() => props.question.options.find((option) => option.is_correct).key);
const isCorrect = computed(() => checkedKey.value === correctKey.value);
const result = computed(() => (isCorrect.value ? 'correct' : 'incorrect'));
const status = computed(() => {
	if (!checkedKey.value) return 'Nog niet beantwoord';
	return isCorrect.value ? 'Goed beantwoord' : 'Fout, probeer het nog eens';
});

// Alleen met JavaScript: @submit.prevent houdt de POST tegen, dus nakijken gebeurt hier in de browser
async function check() {
	checkedKey.value = selected.value;

	// Vue werkt de HTML pas na deze functie bij; wacht daarop, anders scroll je naar een lege output
	await nextTick();
	output.value.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
</script>

<template>
	<form method="POST" action="/controleer" @submit.prevent="check">
		<header>
			<p>Vraag {{ number }}</p>
			<p>{{ status }}</p>
		</header>

		<fieldset>
			<legend>{{ question.question }}</legend>
			<label v-for="option in question.options" :key="option.key" :class="option.key === checkedKey ? result : null">
				<input v-model="selected" type="radio" :name="`question-${question.id}`" :value="option.key" required>
				<span>{{ option.key }}</span>
				{{ option.answer }}
			</label>
		</fieldset>

		<button type="submit" name="questionId" :value="question.id">Controleer</button>

		<output ref="output">
			<p v-if="checkedKey" :class="result">
				{{ checkedKey }} {{ isCorrect ? question.explanation_correct : question.explanation_wrong }}
			</p>
		</output>
	</form>
</template>