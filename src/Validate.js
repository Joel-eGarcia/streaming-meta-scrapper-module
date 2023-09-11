const Joi = require('joi');
const defaultStringValue = Joi.string().allow(null).allow('').empty('').default(null);
const schemas = {
	title: Joi.object().keys({
		full: defaultStringValue.required(),
		brief: defaultStringValue,
	}),
	description() {
		return this.title.keys({
			medium: defaultStringValue,
		})
	},
	image: Joi.object().keys({
		url: defaultStringValue.uri().required(),
		id: defaultStringValue.required(),
		width: Joi.number().integer().allow(null).required(),
		height: Joi.number().integer().allow(null).required(),
	}),
};

class Validate {
	constructor(options) {
		this._options = Object.assign(
			{
				abortEarly: false,
				allowUnknown: false,
				stripUnknown: true,
			},
			options
		);
	}

	validateMetadata(data) {
		try {
			return Joi.object({
				providerShort: Joi.string().required().valid('nfx', 'dnp', 'hbm'),
				providerNicename: Joi.string().optional(),
				providerId: Joi.string().required(),
				mediaType: Joi.string().required().valid('movie', 'show'),
				title: schemas.title,
				description: schemas.description(),
				images: Joi.object().keys({
					poster: schemas.image,
					thumbnail: schemas.image,
					logo: schemas.image,
					thumbnail_1_33: schemas.image.fork(['url', 'id', 'width', 'height'], (schema) => schema.optional()),
				}),
				normalizedRating: Joi.number().integer().allow(null),
				specific: Joi.object(),
				episodes: Joi.array()
					.items({
						seasonNumber: Joi.number().integer().required(),
						episodeNumber: Joi.number().integer().required(),
						providerEpisodeId: Joi.string().required(),
						title: schemas.title,
						description: schemas.description().fork(['full'], (schema) => schema.optional()),
						normalizedRating: Joi.number().integer().allow(null),
						specific: Joi.object(),
					})
					.when('mediaType', { is: 'show', then: Joi.array().min(1).required() }),
			}).validate(data, this._options);
		} catch (err) {
			console.error('validateMetadata: ', err);
		}
	}

	validateMeta(data) {
		try {
			return Joi.object({
				id: Joi.string().required(),
				name: Joi.string().required(),
				locale: Joi.string()
					.regex(/^[a-z]{2}([-])?([A-Za-z]{2})?$/)
					.optional(),
				providers: Joi.array().items(Joi.string().valid('nfx', 'dnp', 'hbm')).unique().min(1),
				mediaType: Joi.array().items(Joi.string().valid('movie', 'show')).unique().min(1),
				releaseYear: Joi.object()
					.keys({
						min: Joi.string().regex(/^\d+$/).allow(null),
						max: Joi.string().regex(/^\d+$/).allow(null),
					})
					.required(),
			}).validate(data, {
				abortEarly: false,
				allowUnknown: false,
				stripUnknown: true,
			});
		} catch (err) {
			console.error('validateMeta: ', err);
		}
	}
}

module.exports = Validate;
