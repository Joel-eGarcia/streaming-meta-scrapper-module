const API_URL = 'https://disney.content.edge.bamgrid.com';
const API_VERSION = '5.1';
const request = require('./Request');
const metadata = require('./Metadata');

class DisneyPlus {
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
		
		this.dmc = 'DmcVideoBundle';
		this.maturity = '1499';
		this.encodedType = 'encodedFamilyId';
		this.program = 'program';
		this.path = 'video';
		
		if (this._options.mediaType === 'show') {
			this.dmc = 'DmcSeriesBundle';
			this.maturity = '1850';
			this.encodedType = 'encodedSeriesId';
			this.program = 'series';
			this.path = 'series';
		}

	}

	async getMetadata() {
		try {
			this.Metadata = new metadata({providerShort: 'dnp'});
			this.metadata = this.Metadata.model();
			this.metadata.providerId = this._options.id;
			this.metadata.mediaType = this._options.mediaType;
			
			this.response = await new request().request(this.#buildApiUrl());
			if (!this.response) {
				throw new Error('No response to parse');
			}
			this.data = this.response?.data[this.dmc][this.path];
			
			this.#setMetadataTexts({
				title: true,
				descriptions: ['full', 'medium', 'brief'],
			});
			
			this.#setMetadataImages(
				[
					{
						name: 'poster',
						aspectRatio: '0.71',
						key: 'tile',
					},
					{
						name: 'thumbnail_1_33',
						aspectRatio: '1.33',
						key: 'tile',
					},
					{
						name: 'thumbnail',
						aspectRatio: '1.78',
						key: 'tile',
					},
					{
						name: 'logo',
						aspectRatio: '1.78',
						key: 'title_treatment',
					},
				]
			);
			this.metadata.normalizedRating = parseInt(this.data?.ratings[0]?.value) || null;
			this.metadata['specific'] = {
				mediaId: this.data?.mediaMetadata?.mediaId,
				seriesId: this.data?.seriesId,
				encodedSeriesId: this.data?.encodedSeriesId,
				familyId: this.data?.family?.familyId,
				encodedFamilyId: this.data?.family?.encodedFamilyId,
				videosArt: this.data?.videoArt,
			};
			
			if (this._options.mediaType === 'show') {
				this.seasons = this.response?.data?.DmcSeriesBundle?.seasons?.seasons;
				this.textTypes = ['full', 'medium', 'brief'];
				for (let { seasonId } of this.seasons) {
					let seasonData = await new request().request(
						this.#buildApiUrl({
							id: seasonId,
							maxPage: true,
							isSeason: true,
						})
					);
					let episodes = seasonData?.data?.DmcEpisodes?.videos;
					for (let {seasonSequenceNumber, episodeSequenceNumber, 
						contentId, text, family, seriesId, videoId, mediaMetadata, programId, ratings} of episodes) {
						let episode = this.Metadata.episodeModel();
						episode.seasonNumber = seasonSequenceNumber;
						episode.episodeNumber = episodeSequenceNumber;
						episode.providerEpisodeId = contentId;
						for (const value of this.textTypes) {
							if (value === 'full') {
								let titlePath = text.title[value].program.default;
								if (titlePath.language === this._options.languageCode) 
								episode.title[value] =  titlePath.content;
							}
							let descriptionPath = text.description[value].program.default;
							if (descriptionPath.language === this._options.languageCode) 
							episode.description[value] = descriptionPath.content;
						
						}
						episode.normalizedRating = parseInt(ratings[0]?.value) || null;
						episode['specific'] = {
							mediaId: mediaMetadata.mediaId,
							familyId: family?.familyId,
							encodedFamilyId: family?.encodedFamilyId,
							seasonId: seasonId,
							videoId: videoId,
							programId: programId,
						};
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
			for (const { name, aspectRatio, key } of entries) {
				let path = this.data?.image[key][aspectRatio][this.program].default;
				this.metadata.images[name] = {
					url: path.url,
					id: path.masterId,
					width: path.masterWidth,
					height: path.masterHeight,
				};
			}
		} catch (err) {
			console.error('setMetadataImages: ', err);
		}
	}
	
	#setMetadataTexts(opts={}) {
		try {
			if (opts.title) {
				const titlePath = this.data.text.title.full[this.program].default;
				if (titlePath.language === this._options.languageCode) {
					this.metadata.title.full = titlePath.content;
				}
			}
			opts.descriptions.forEach((type) => {
				let descriptionPath = this.data.text.description[type][this.program].default;
				if (descriptionPath.language === this._options.languageCode) {
					this.metadata.description[type] = descriptionPath.content;
				}
			});
		} catch (err) {
			console.error('setMetadataTexts: ', err);
		}
	}
	
	#buildApiUrl(opts = {}) {
		let dmc = this.dmc;
		let encodedType = this.encodedType;
		let id = this._options.id;

		if (opts.id) {
			id = opts.id;
		}
		if (opts.isSeason) {
			dmc = 'DmcEpisodes';
			encodedType = 'seasonId';
		}

		const options = [
			API_URL,
			'svc',
			'content',
			dmc,
			'version',
			API_VERSION,
			'region',
			this._options.countryCode,
			'audience',
			'k-false,l-true',
			'maturity',
			this.maturity,
			'language',
			this._options.languageCode,
			encodedType,
			id,
		];

		if (opts.maxPage) {
			options.push('pageSize', '60', 'page', '1');
		}

		return options.join('/');
	}
}

module.exports = DisneyPlus;