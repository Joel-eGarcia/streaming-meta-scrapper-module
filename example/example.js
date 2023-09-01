require('dotenv').config()
const { smsm } = require('./../index');
const fs = require('fs');

(async () => {
	const scrapper = new smsm({
		name: 'The Blacklist',
		//name: 'Better Things',
		id: 'tt2741602',
		//id: 'tt4370596',
		providers: ['nfx', 'hbm', 'dnp'],
		locale: 'es-ES',
	});
	const metadata = await scrapper.getMetadata();
	console.log(metadata);
	if (metadata) {
		await fs.promises.writeFile('./' + metadata.ids.imdb + '.json', JSON.stringify(metadata, null, 2));
	}
	
})();
