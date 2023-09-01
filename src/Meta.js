const justWatch = require('./JustWatch');
const disneyPlus = require('./DisneyPlus');
const hboMax = require('./HboMax');
const netflix = require('./Netflix');
const validate = require('./Validate');
const envs = require('./../environments');

class Meta {
	constructor(options) {
		this._options = Object.assign(
			{
				id: null,
				name: null,
				providers: ['nfx', 'dnp', 'hbm'],
				mediaType: ['movie', 'show'],
				releaseYear: {
					min: null,
					max: null,
				},
				locale: process.env.SMSM_COUNTRY_CODE || 'RO' + '-' + process.env.SMSM_LANGUAGE_CODE || 'ro',
			},
			options
		);
		this.validate = new validate();
		const { error, value } = this.validate.validateMeta(this._options);
		if (error) {
			throw new Error(`Invalid options: ${error.details.map((e) => e.message).join(', ')}`);
		}
		this.options = value;
		[this.options.languageCode, this.options.countryCode] = this.options.locale.split('-');
	}

	async getMetadata() {
		try {
			this.zeroResponse = {
				count: 0,
				validResultsCount: 0,
				ids: [],
				results: [],
				language: this.options.languageCode,
				country: this.options.countryCode,
			};

			this.jw = new justWatch({
				countryCode: this.options.countryCode,
				languageCode: this.options.languageCode,
				streamingProviders: this.options.providers,
				id: this.options.id,
				query: this.options.name,
				filters: {
					mediaType: this.options.mediaType,
					releaseYear: this.options.releaseYear,
				},
			});
			
			if (!this.jw) {
				throw new Error('No response from Just Watch');
			}

			this.infoName = `${this.options.name} (id:${this.options.id})`;
			this.providers = await this.jw.getStreamingProvidersIds();

			if (
				!this.providers ||
				!this.providers.ids ||
				!this.providers.ids.streaming ||
				Object.keys(this.providers.ids.streaming).length === 0
			) {
				console.log(
					`No results found for ${this.infoName} on ${this.options.providers.join(' or ')}`
				);

				return this.zeroResponse;
			}

			console.log(
				`${this.infoName}: Total number of possible results found on streaming services: ${
					Object.keys(this.providers.ids.streaming).length
				}`
			);

			const promises = [];
			this.results = [];

			for (const [name, id] of Object.entries(this.providers.ids.streaming)) {
				console.log(`${this.infoName}: Scraping metadata from ${name}...`);
				if (name === 'dnp') {
					promises.push(
						new disneyPlus({
							id: id,
							mediaType: this.providers.mediaType,
							countryCode: this.options.countryCode,
							languageCode: this.options.languageCode,
						}).getMetadata()
					);
				} else if (name === 'hbm') {
					promises.push(
						new hboMax({
							id: id,
							mediaType: this.providers.mediaType,
							countryCode: this.options.countryCode,
							languageCode: this.options.languageCode,
						}).getMetadata()
					);
				} else if (name === 'nfx') {
					if (envs.nfxUser && envs.nfxPass && envs.nfxAccountOriginCoutryCode) {
						promises.push(
							new netflix({
								id: id,
								mediaType: this.providers.mediaType,
								languageCode: this.options.languageCode,
							}).getMetadata()
						);
					} else {
						console.log(
							`${this.infoName}: Please set ${name} username/password and account country code of origin before scraping metadata`
						);
					}
				}
			}
			
			const providersResult = await Promise.allSettled(promises);
			this.validResultsCount = 0;
			providersResult.forEach((result) => {
				if (result.status === 'fulfilled' && result.value) {
					let { error, value } = this.validate.validateMetadata(result.value);
					value['hasValidationsErros'] = false;
					this.validResultsCount = this.validResultsCount + 1;
					if (error) {
						console.error(
							`${this.infoName}: Validation error: ${error.details.map((x) => x.message).join(', ')}`
						);
						this.validResultsCount = this.validResultsCount - 1;
						value.hasValidationsErros = true;
						value['validationsErros'] = error.details.map((x) => x);
					} 
					if (value.providerShort === 'hbm' && value.providerId !== this.providers.ids.streaming.hbm) {
						this.providers.ids.streaming.hbm = value.providerId;
					}
					this.results.push(value);
				}
			});
			console.log(`${this.infoName}: Total validated results ${this.validResultsCount}`);

			return {
				count: this.results.length,
				validResultsCount: this.validResultsCount,
				ids: this.providers.ids,
				language: this.options.languageCode,
				country: this.options.countryCode,
				results: this.results,
			};
		} catch (err) {
			console.error('Meta:getMetadata: ', err);
			return this.zeroResponse;
		}
	}
}

module.exports = Meta;