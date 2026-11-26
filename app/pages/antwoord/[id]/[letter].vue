<script setup>
// Nakijken zonder JavaScript: /controleer stuurt hierheen door (server/routes/controleer.post.ts).
// Eén bestand voor alle 20 antwoordpagina's (5 vragen × 4 letters); ze worden allemaal geprerenderd.
const { id, letter } = useRoute().params;
const checked = { questionId: Number(id), letter };

// 20 bijna-dubbele pagina's: niet in zoekmachines
useHead({ meta: [{ name: 'robots', content: 'noindex' }] });
</script>

<template>
	<h1>Quiz</h1>
	<Quiz :checked="checked" />
</template>
