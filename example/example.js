require('dotenv').config()
const streamingMeta = require('./../index');

(async () => {
	const scrapper = new streamingMeta({
		name: 'Better Things', // Show or Movie name
		id: 'tt4370596', // IMdb or TMdB ID
		providers: ['nfx', 'hbm', 'dnp'],
		locale: 'ro-RO', // Language and Country
	});
	const metadata = await scrapper.getMetadata();
})();