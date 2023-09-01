const request = require('./Request');
const metadata = require('./Metadata');
const lookup = require('country-code-lookup')
const { cachedHbmTokens } = require('./hbmTokens');
const API_URL = 'https://comet-emea.api.hbo.com';
const ART_URL = 'https://art-gallery-emea.api.hbo.com';

class HboMax {
	constructor(options) {
		this._options = Object.assign(
			{
				id: null,
				mediaType: null,
				countryCode: 'RO',
				languageCode: 'ro',
			},
			options
		);
		
		this.locale = this._options.languageCode + '-' + this._options.countryCode;
		this.countryName = lookup.byIso(this._options.countryCode).country;
		this.tokens = {};
	}

	async #getData() {
		try {
			this.tokens = await cachedHbmTokens();
			if(!this.tokens) {
				throw new Error('No authorization tokens');
			}
			const headers = {
				headers: {'Authorization': `Bearer ${this.tokens.refresh_token}`},
			}
			if (this._options.mediaType === 'show' && this._options.id.includes('episode')) {
				let episodeData = await new request(headers).request(this.#buildExpressContentApiUrl(this._options.id));
				episodeData = episodeData.find(obj => obj.id === this._options.id)
				this._options.id = episodeData?.body?.references?.series;
			}
			this.data = await new request(headers).request(this.#buildExpressContentApiUrl(this._options.id));
			if (!this.data) {
				throw new Error('Data is missing');
			}
			this.dataId = this.data.find(obj => obj.id === this._options.id);
		} catch (err) {
			console.error('getData: ', err);
		}	
	}
	
	async getMetadata() {
		try {
			this.Metadata = new metadata({providerShort: 'hbm'});
			this.metadata = this.Metadata.model();
			this.metadata.mediaType = this._options.mediaType;
			await this.#getData();
			if (!this.dataId) {
				throw new Error(`No data for this id ${this._options.id}`);
			}
			this.metadata.providerId = this._options.id;
			this.#setMetadataTexts(
				[
					{ metadataPath: 'title', contentPath: 'titles' }, 
					{ metadataPath: 'description', contentPath: 'summaries' }
				]
			);
			this.#setMetadataImages(
				[
					{
						imageType: 'tileburnedin', 
						imageMetadataType: 'poster',
						apiUrl: this.dataId?.body?.images?.tileburnedin,
						size: '960x1440',
					}, 
					{ 
						imageType: 'logoburnedin', 
						imageMetadataType: 'logo',
						apiUrl: this.dataId?.body?.images?.logoburnedin,
						size: '1200x362',
					}, 
					{ 
						imageType: 'tileburnedin', 
						imageMetadataType: 'thumbnail',
						apiUrl: this.dataId?.body?.images?.logoburnedin,
						size: '960x540',
					}, 
				]
			);
			
			if (this._options.mediaType === 'show') {
				this.textTypes = ['full', 'medium', 'brief'];
				for (const { id, body } of this.data) {
					if (id.includes('urn:hbo:episode:')) {
						let episode = this.Metadata.episodeModel();
						episode.seasonNumber = body.seasonNumber;
						episode.episodeNumber = body.numberInSeason;
						episode.providerEpisodeId = id;
						for (const value of this.textTypes) {
							let contentKey = (value === 'brief') ? 'short' : value;
							if (value !== 'medium') episode.title[value] = body?.titles[contentKey] || null;
							episode.description[value] =  body?.summaries[contentKey] || null;
						}
						this.metadata.episodes.push(episode);
					}
				}
			}
			
			return this.metadata;
			
		} catch (err) {
			console.error('getMetadata: ', err);
		}
	}
		
	#setMetadataImages(entries = []) {
		try {
			const id = this.metadata.providerId.split(':').pop();
			const language = this.locale.toLowerCase();
			for (const { imageType, imageMetadataType, apiUrl, size } of entries) {
				let urlParams = new URLSearchParams(apiUrl.split('?').pop());
				let imageId = urlParams.get('v');
				let resolution = size.split('x');
				this.metadata.images[imageMetadataType] = {
					url: `${ART_URL}/images/${id}/${imageType}/?v=${imageId}&size=${size}&language=${language}`,
					id: imageId,
					width: parseInt(resolution[0]),
					height: parseInt(resolution[1]),
				}
			}
		} catch (err) {
			console.error('setMetadataImages: ', err);
		}
	}
	
	#setMetadataTexts(entries = []) {
		try { 
			for (const { metadataPath, contentPath } of entries) {
				for (let [key] of Object.entries(this.metadata[metadataPath])) {
					let contentKey = (key === 'brief') ? 'short' : key;
					this.metadata[metadataPath][key] = this.dataId?.body[contentPath][contentKey] || null;
				}
			}
		} catch (err) {
			console.error('setMetadataTexts: ', err);
		}
	}
	
	#buildExpressContentApiUrl(id) {
		try {
			let expressContentUrl = `${API_URL}/express-content/${id}`;
			let expressUrlParams = {
				language: this.locale, 
				'api-version': 'v9.0', 
				'country-code': this._options.countryCode, 
				'signed-in': false, 
				'profile-type': 'adult', 
				'device-code': 'desktop', 
				'product-code': 'hboMax', 
				'brand': 'HBO MAX', 
				'territory': this.countryName.toUpperCase(), 					
			};
			return expressContentUrl + '?' + new URLSearchParams(expressUrlParams).toString();
		} catch (err) {
			console.error('buildExpressContentApiUrl: ', err);
		}	
	}
}

module.exports = HboMax