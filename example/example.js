require('dotenv').config()
const smsm = require('./../index');

(async () => {
	const scrapper = new smsm({
		name: 'Better Things',
		id: 'tt4370596',
		providers: ['nfx', 'hbm', 'dnp'],
		locale: 'ro-RO',
	});
	const metadata = await scrapper.getMetadata();
	console.log(metadata);
})();
