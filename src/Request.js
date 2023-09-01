const request = require('requestretry');
const { getHbmTokensViaBrowser } = require('./hbmTokens');
const { getNfxPrivateViaBrowser } = require('./nfxCookies');

class Request {
	constructor(options) {
		this._options = Object.assign(
			{
				maxAttempts: 3,
				retryDelay: 3000,
				fullResponse: true,
				json: true,
			},
			options
		);
	}

	async retryStrategy(err, response, body, options) {
		try {
			let statusCode = response?.statusCode || null;
			if (statusCode >= 200 && statusCode < 300) {
				return;
			} else if (statusCode === 401) {
				if (options.url.includes('hbo.com')) {
					options.headers = { Authorization: `Bearer ${await getHbmTokensViaBrowser()}` };
				}
				else if (options.url.includes('netflix.com')) {
					options.headers.cookie = await getNfxPrivateViaBrowser(options.nfxLanguageCode);
				}
			}
			return {
				mustRetry: true,
				options: options,
			};
		} catch (err) {
			console.error('retryStrategy: ', err);
		}
	}

	async request(url) {
		try {
			this._options.retryStrategy = this.retryStrategy;
			const response = await request(url, this._options);
			if (response.statusCode < 200 || response.statusCode >= 300) {
				throw new Error(`code: ${response.statusCode}, message: ${response.statusMessage}`);
			}	
			return response.body;
		} catch (err) {
			console.error('request: ', err);
		}
	}
}

module.exports = Request;
