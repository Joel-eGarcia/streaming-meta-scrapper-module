const request = require('./Request');
const API_URL = 'https://apis.justwatch.com';

class justWatch {
	constructor(options) {
		this._options = Object.assign(
			{
				countryCode: 'RO',
				languageCode: 'ro',
				streamingProviders: ['nfx', 'dnp', 'hbm'],
				id: null,
				query: null,
				filters: {
					mediaType: ['movie', 'show'],
					releaseYear: {
						min: null,
						max: null,
					},
					limit: 50,
				},
			},
			options
		);
				
		this._options.id = this._options.id.toString();
		this.locale = this._options.languageCode + '_' + this._options.countryCode;
		this._options['idProvider'] = this._options.id.startsWith('tt') ? 'imdb' : 'tmdb';
		this.jwData = {};
	}

	async searchTitles() {
		try {
			return await new request({
				method: 'POST',
				body: {
					operationName: 'GetSearchTitles',
					variables: {
						country: this._options.countryCode,
						language: this._options.languageCode,
						first: this._options.filters.limit,
						searchTitlesFilter: {
							searchQuery: this._options.query,
							objectTypes: this._options.filters.mediaType.map((media) => media.toUpperCase()),
							packages: this._options.streamingProviders,
							releaseYear: this._options.filters.releaseYear,
						},
						sortRandomSeed: 0,
						searchTitlesSortBy: 'POPULAR',
					},
					query: 'query GetSearchTitles($country: Country!, $searchTitlesFilter: TitleFilter, $searchAfterCursor: String, $searchTitlesSortBy: PopularTitlesSorting! = POPULAR, $first: Int! = 5, $language: Language!, $sortRandomSeed: Int! = 0, $profile: PosterProfile, $backdropProfile: BackdropProfile, $format: ImageFormat) {\n  popularTitles(\n    country: $country\n    filter: $searchTitlesFilter\n    after: $searchAfterCursor\n    sortBy: $searchTitlesSortBy\n    first: $first\n    sortRandomSeed: $sortRandomSeed\n  ) {\n    totalCount\n    pageInfo {\n      startCursor\n      endCursor\n      hasPreviousPage\n      hasNextPage\n      __typename\n    }\n    edges {\n      ...SearchTitleGraphql\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment SearchTitleGraphql on PopularTitlesEdge {\n  cursor\n  node {\n    id\n    objectId\n    objectType\n    content(country: $country, language: $language) {\n      title\n      fullPath\n      originalReleaseYear\n      scoring {\n        imdbScore\n        imdbVotes\n        tmdbScore\n        tmdbPopularity\n        __typename\n      }\n      posterUrl(profile: $profile, format: $format)\n      backdrops(profile: $backdropProfile, format: $format) {\n        backdropUrl\n        __typename\n      }\n      upcomingReleases(releaseTypes: [DIGITAL]) {\n        releaseDate\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n',
				},
			}).request(`${API_URL}/graphql`);
		} catch (err) {
			console.error('getPossibleIds: ', err);
		}
	}

	async #getTitle() {
		try {
			this.posbileIds = await this.searchTitles();
			for (const { node } of this.posbileIds.data.popularTitles.edges) {
				let response = await new request().request(
					`${API_URL}/content/titles/${node.objectType.toLowerCase()}/${node.objectId}/locale/${
						this.locale
					}`
				);
				if (
					response &&
					response.external_ids.find(
						(obj) =>
							obj.external_id == this._options.id &&
							obj.provider === this._options.idProvider
					)
				) {
					this.jwData = response;
					return;
				}
			}
		} catch (err) {
			console.error('getTitle: ', err);
		}
	}

	async getStreamingProvidersIds() {
		try {
			await this.#getTitle();
			if (!this.jwData || !this.jwData.offers) {
				return;
			}
			
			this.ids = {
				justwatch: this.jwData.id,
				streaming: {},
				tmdb: null,
				imdb: null,
				tmdb_history: [],
				imdb_history: [],
			};

			for (const { provider, external_id } of this.jwData.external_ids) {
				if (provider === 'tmdb_latest' || provider === 'imdb_latest') {
					this.ids[provider.split('_')[0]] = external_id;
				} else if (provider === 'tmdb' || provider === 'imdb') {
					this.ids[provider + '_' + 'history'].push(external_id);
				}
			}

			for (const { package_short_name, urls } of this.jwData.offers) {
				let providerId = null;
				if (this._options.streamingProviders.includes(package_short_name)) {
					if (package_short_name === 'nfx') {
						providerId = urls.standard_web.split('/title/').pop();
					} else if (package_short_name === 'dnp') {
						providerId = JSON.parse(JSON.parse(urls.deeplink_tizenos).action_data).id;
					} else if (package_short_name === 'hbm') {
						providerId = 'urn:' + urls.standard_web.split('urn:').pop();
					}
				}
				if (providerId) {
					this.ids.streaming[package_short_name] = providerId;
				}
			}
			
			return {
				mediaType: this.jwData.object_type,
				ids: this.ids || {},
			};
			
		} catch (err) {
			console.error('getStreamingProvidersIds: ', err);
		}
	}
}

module.exports = justWatch;
