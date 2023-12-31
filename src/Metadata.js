const models = {
	image: {
		url: null,
		id: null,
		width: null,
		height: null,
	},
};

class Metadata {
	constructor(options) {
		this._options = Object.assign(
			{
				providerShort: null,
			},
			options
		);

		switch (this._options.providerShort) {
			case 'nfx':
				this._options.providerNicename = 'Netflix';
				break;
			case 'dnp':
				this._options.providerNicename = 'Disney Plus';
				break;
			case 'hbm':
				this._options.providerNicename = 'HBO Max';
				break;
			default:
				this._options.providerNicename = null;
		}
	}

	model() {
		return {
			version: '1.1',
			providerShort: this._options.providerShort,
			providerNicename: this._options.providerNicename,
			providerId: null,
			mediaType: null,
			title: {
				full: null,
				brief: null,
			},
			description: {
				full: null,
				brief: null,
				medium: null,
			},
			images: {
				poster: models.image,
				thumbnail: models.image,
				logo: models.image,
			},
			normalizedRating: null,
			specific: {},
			episodes: [],
		};
	}

	episodeModel() {
		return {
			seasonNumber: null,
			episodeNumber: null,
			providerEpisodeId: null,
			title: {
				full: null,
				brief: null,
			},
			description: {
				full: null,
				brief: null,
				medium: null,
			},
			normalizedRating: null,
			specific: {},
		};
	}
}

module.exports = Metadata;
