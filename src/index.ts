import yaml from 'js-yaml';

async function getLinguistData(): Promise<Record<string, Record<string, any>>> {
	const linguistUrl = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

	try {
		const response = await fetch(linguistUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const yamlText = await response.text();
		return yaml.load(yamlText) as Record<string, Record<string, any>>;
	} catch (error) {
		console.error('Error fetching linguist data:', error);
		throw error;
	}
}

async function getLanguageColors(lang: string) {
	const linguistData = await getLinguistData();
	if (!linguistData[lang]) {
		throw new Error(`Language not found: ${lang}, available: ${Object.keys(linguistData).join(', ')}`);
	}
	return linguistData[lang];
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Get the URL of the request
		const url = new URL(request.url);

		// Retrieve the search params from the URL
		const params = url.searchParams;
		const language = params.get('language');

		if (language) {
			const langMeta = await getLanguageColors(language);
			return Response.json(langMeta);
		}
		return new Response(language);
	},
} satisfies ExportedHandler<Env>;
