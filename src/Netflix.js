const request = require('./Request');
const metadata = require('./Metadata');
const { cachedNfxPrivate, saveNfxPrivate } = require('./nfxCookies');
const API_URL_MEMBERS = 'https://www.netflix.com/nq/website/memberapi';
const API_URL_SHAKTI = 'https://www.netflix.com/api/shakti/mre';
const { nfxAccountOriginCoutryCode } = require('./../environments');

class Netflix {
	constructor(options) {
		this._options = Object.assign(
			{
				id: null,
				mediaType: null,
				allowImagesWithNewContent: true,
				forceChangeLocale: false,
				languageCode: 'ro',
				accountOriginCoutryCode: nfxAccountOriginCoutryCode,
			},
			options
		);
		
		this.nfxLocale = this._options.languageCode + '-' +  this._options.accountOriginCoutryCode;
		this.defaultPathtype = 'videos';
		this.imgOptions = {
			poster: {
				width: 426,
				height: 607,
				extension: 'jpg',
			},
			thumbnail: {
				width: 1280,
				height: 720,
				extension: 'jpg',
			},
			logo: {
				width: 550,
				height: 124,
				extension: 'png',
			},
		};
		this.buildIdentifier = 'vaf4f97f3';
	}
	
	async #getData() {
		try {
			
			this.nfxPrivate = await cachedNfxPrivate(this._options.languageCode);
			this.cookies = this.nfxPrivate.cookies;
			if (!this.cookies) {
				throw new Error('No cookies to send');
			}

			if (
				(this.nfxPrivate.languageCode !== this._options.languageCode) ||
				this._options.forceChangeLocale === true
			) {
				await this.#changeLocale();
			}

			this.dataOptions = [
				{
					type: this.defaultPathtype,
					id: this._options.id,
					selectors: ['jawSummary'],
				},
				{
					type: this.defaultPathtype,
					id: this._options.id,
					selectors: ['boxarts'],
					attributes: this.#buildImageAttributes('poster'),
				},
				{
					type: this.defaultPathtype,
					id: this._options.id,
					selectors: ['boxarts'],
					attributes: this.#buildImageAttributes('thumbnail'),
				},
			];

			if (this._options.mediaType === 'show') {
				this.dataOptions.push({
					type: this.defaultPathtype,
					id: this._options.id,
					rangeSelectors: {
						seasonList: { from: 0, to: 30 },
						episodes: { from: 0, to: 30 },
					},
					selectors: ['title', 'synopsis', 'summary', 'maturity'],
				});
			}

			this.data = await new request({
				method: 'POST',
				nfxLanguageCode: this._options.languageCode,
				headers: { cookie: this.cookies },
				form: this.#buildPaths(this.dataOptions),
			}).request(this.#buildMemberApiPath());
			
		} catch (err) {
			console.error('getData: ', err);
		}
	}

	async getMetadata() {
		try {
			this.Metadata = new metadata({ providerShort: 'nfx' });
			this.metadata = this.Metadata.model();
			this.metadata.mediaType = this._options.mediaType;
			await this.#getData();
			if (!this.data) {
				throw new Error('No data to parse');
			}
			this.metadata.providerId = this._options.id;

			this.#setMetadataTexts([
				{ metadata: 'title', content: 'title' },
				{ metadata: 'description', content: 'synopsisRegular' },
			]);

			this.#setMetadataImages([
				{ metadata: 'logo', contentType: 'jaw' },
				{ metadata: 'poster', contentType: 'boxarts' },
				{ metadata: 'thumbnail', contentType: 'boxarts' },
			]);
			this.metadata.normalizedRating = this.data.jsonGraph.videos[this._options.id]
				.jawSummary.value.maturity.rating.value.replace(/\D/g,'');
			
			if (this._options.mediaType === 'show') {
				for (let data of Object.values(this.data.jsonGraph.videos)) {
					if (data?.summary?.value?.type === 'episode') {
						let episode = this.Metadata.episodeModel();
						episode.seasonNumber = data.summary.value.season;
						episode.episodeNumber = data.summary.value.episode;
						episode.providerEpisodeId = data.summary.value.id.toString();
						episode.title.full = data.title.value;
						episode.description.full = data.synopsis.value;
						episode.normalizedRating = data.maturity.value.rating.value.replace(/\D/g,'');
						this.metadata.episodes.push(episode);
					}
				}
			}

			return this.metadata;
			
		} catch (err) {
			console.error('getMetadata: ', err);
		}
	}
	
	async #changeLocale() {
		try {
			this.localeResponse = await new request({
				method: 'POST',
				nfxLanguageCode: this._options.languageCode,
				headers: { cookie: this.cookies },
				body: {
					newLanguageID: this.nfxLocale,
					authURL: this.nfxPrivate.authURL,
				},
			}).request(`${API_URL_SHAKTI}/account/languagePrefs`);
			
			if(this.localeResponse) {
				await saveNfxPrivate({
					cookies: this.cookies,
					authURL: this.nfxPrivate.authURL,
					languageCode: this._options.languageCode,
				})
			}
		} catch (err) {
			console.error('changeLocale: ', err);
		}
	}
	
	#setMetadataTexts(entries = []) {
		try {
			for (const { metadata, content } of entries) {
				this.metadata[metadata].full =
					this.data.jsonGraph.videos[this._options.id].jawSummary.value[content] || null;
			}
		} catch (err) {
			console.error('setMetadataTexts: ', err);
		}
	}

	#setMetadataImages(options) {
		try {
			for (const { metadata, contentType } of options) {
				let sizePath = null;
				let extensionPath = null;
				let imageObj = {};
				let imageKey = 'imageKey';

				if (contentType === 'boxarts') {
					sizePath = '_' + this.imgOptions[metadata].width + 'x' + this.imgOptions[metadata].height;
					extensionPath = this.imgOptions[metadata].extension;
					imageKey = 'image_key';
				}

				imageObj =
					metadata === 'logo'
						? this.data.jsonGraph.videos[this._options.id].jawSummary.value.logoImage
						: this.data.jsonGraph.videos[this._options.id].boxarts[sizePath][extensionPath].value;
				
				let allowImage = true;
				if (imageObj[imageKey].includes('newcontent') && !this._options.allowImagesWithNewContent) {
					allowImage = false;
				}
				if (allowImage) {
					this.metadata.images[metadata] = {
						url: imageObj.url,
						id: imageObj[imageKey],
						width: this.imgOptions[metadata].width,
						height: this.imgOptions[metadata].height,
					};
				}
			}
		} catch (err) {
			console.error('setMetadataImages: ', err);
		}
	}

	#buildMemberApiPath(buildIdentifier = this.buildIdentifier) {
		this.membersApiUrlParams = {
			contextAwareImages: false,
			original_path: '/shakti/mre/pathEvaluator',
		};
		return (
			API_URL_MEMBERS +
			`/${buildIdentifier}/pathEvaluator` +
			'?' +
			new URLSearchParams(this.membersApiUrlParams).toString()
		);
	}
	
	#buildImageAttributes(type) {
		return [
			'_' + this.imgOptions[type].width + 'x' + this.imgOptions[type].height,
			this.imgOptions[type].extension,
		];
	}
	
	#buildPaths(data) {
		try {
			const paths = [];
			for (const { id, type, rangeSelectors = {}, selectors, attributes = [] } of data) {
				let path = [];
				path.push(type, id);
				for (const [selector, range] of Object.entries(rangeSelectors)) {
					path.push(selector, range);
				}
				path.push(selectors);
				attributes.forEach((attribute) => {
					path.push(attribute);
				});
				path = 'path=' + JSON.stringify(path);
				paths.push(path);
			}
			return paths.join('&');
		} catch (err) {
			console.error('pathsBuilder: ', err);
		}
	}
}

module.exports = Netflix;