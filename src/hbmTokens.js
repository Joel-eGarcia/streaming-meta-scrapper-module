const fs = require('fs');
const path = require('path');
const envs = require('./../environments');
const fileTokensFullPath = path.join(envs.privatePath, 'hbm_tokens');
const { Browser } = require('./Browser');
const OAUTH_URL = 'https://oauth.api.hbo.com/auth/tokens';
const { v4: uuidv4 } = require('uuid');
const request = require('requestretry');
const secrets = {
	client_id: '585b02c8-dbe1-432f-b1bb-11cf670fbeb0',
	client_secret: '585b02c8-dbe1-432f-b1bb-11cf670fbeb0',
	clientDeviceData: { paymentProviderCode: 'blackmarket' },
	deviceSerialNumber: uuidv4(),
	grant_type: 'client_credentials',
	scope: 'browse video_playback_free',
};

const requestHbmTokensWithSecrets = async () => {
	try {
		const tokens = await request.post(OAUTH_URL, {
			maxAttempts: 1,
			json: true,
			fullResponse: false,
			body: secrets,
		});
		if (typeof tokens === 'object' && tokens.hasOwnProperty('refresh_token')) {
			await saveHbmTokens(tokens);
			return tokens;
		}
		return await getHbmTokensViaBrowser();
	} catch (err) {
		console.error('requestHbmTokensWithSecrets: ', err);
	}
};

const getHbmTokensViaBrowser = async () => {
	try {
		let tokens = {};
		this.Browser = new Browser();
		const browser = await this.Browser.launch();
		const page = await browser.newPage();
		await this.Browser.blockResources(page);
		page.on('response', async (response) => {
			const request = response.request();
			if (request.method() === 'POST' && request.url() === OAUTH_URL) {
				const parsePostData = JSON.parse(request.postData());
				if (parsePostData.hasOwnProperty('refresh_token')) {
					tokens = await response.json();
				}
			}
		});
		await page.goto('https://play.hbomax.com/signUp', { waitUntil: 'networkidle0' });
		await page.close();
		await browser.close();
		if (tokens.hasOwnProperty('refresh_token')) {
			await saveHbmTokens(tokens);
			return tokens;
		}
	} catch (err) {
		if (this.Browser) {
			await this.Browser.close();
		}
		console.error('getHbmTokensViaBrowser: ', err);
	}
};

const saveHbmTokens = async (tokens) => {
	try {
		let now = new Date();
		tokens['expirationDate'] = new Date(now.setMinutes(now.getMinutes() + 20));
		if (!fs.existsSync(envs.privatePath)) fs.mkdirSync(envs.privatePath, { recursive: true });
		return await fs.promises.writeFile(fileTokensFullPath, JSON.stringify(tokens, null, 2));
	} catch (err) {
		console.error('saveHbmTokens: ', err);
	}
};

const cachedHbmTokens = async () => {
	try {
		try {
			if (fs.existsSync(fileTokensFullPath)) {
				const fileTokens = JSON.parse(await fs.promises.readFile(fileTokensFullPath));
				if (new Date(fileTokens.expirationDate).getTime() > new Date().getTime()) {
					return fileTokens;
				}
			}
		} catch (err) {
			console.error('cachedHbmTokens:TokensFromFile: ', err);
		}
		return await requestHbmTokensWithSecrets();
	} catch (err) {
		console.error('cachedHbmTokens: ', err);
	}
};

module.exports = {
	getHbmTokensViaBrowser,
	cachedHbmTokens,
};
