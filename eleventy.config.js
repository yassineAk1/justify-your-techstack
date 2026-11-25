export default function (eleventyConfig) {
	// Statische bestanden gaan ongewijzigd naar _site
	eleventyConfig.addPassthroughCopy({
		'src/css': 'css',
		'src/js': 'js',
		'src/fonts': 'fonts',
		'src/favicon.svg': 'favicon.svg',
	});

	// Zet data als JSON in een <script>-tag; '<' wordt geëscaped zodat tekst uit het CMS de tag niet kan sluiten
	eleventyConfig.addFilter('json', (value) => JSON.stringify(value).replace(/</g, '\\u003c'));
}

export const config = {
	dir: {
		input: 'src',
		output: '_site',
	},
};
