const fs = require('fs');
const path = require('path');
const envs = require('./../environments');
const cookiesFullPath = path.join(envs.privatePath, 'nfx_cookies');
const { Browser } = require('./Browser');
const baseURL = 'https://www.netflix.com';
const loginURL = baseURL + '/Login';
const request = require('requestretry');
const requestOptions = {
	maxAttempts: 1,
	json: true,
	fullResponse: true,
	jar: request.jar(),
};
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const cachedNfxPrivate = async (languageCode) => {
	try {
		if (fs.existsSync(cookiesFullPath)) {
			return JSON.parse(await fs.promises.readFile(cookiesFullPath));
		}
		return await requestNfxPrivate(languageCode);
	} catch (err) {
		console.error('cachedNfxPrivate: ', err);
	}
};

const requestNfxPrivate = async (languageCode) => {
	try {
		const formData = Object.assign(
			{
				userLoginId: envs.nfxUser,
				password: envs.nfxPass,
			},
			await populateLoginFormData()
		);
		const response = await request.post(
			loginURL,
			Object.assign(
				{
					formData: formData,
				},
				requestOptions
			)
		);
		if (response.statusCode === 302) {
			const accountPage = await request.get(baseURL + '/YourAccount', requestOptions);
			const dom = new JSDOM(accountPage.body, { runScripts: 'dangerously' });
			const authURL = dom.window.netflix.reactContext.models.memberContext.data.userInfo.authURL;
			const nfxPrivate = {
				cookies: requestOptions.jar.getCookieString(loginURL),
				authURL: authURL || null,
				languageCode: languageCode,
			};
			await saveNfxPrivate(nfxPrivate);
			return nfxPrivate;
		}
		return await getNfxPrivateViaBrowser(languageCode);
	} catch (err) {
		console.error('requestNfxPrivate: ', err);
	}
};

const populateLoginFormData = async () => {
	try {
		const response = await request.get(loginURL, requestOptions);
		const dom = new JSDOM(response.body);
		const formData = {};
		const inputsName = [
			'flow',
			'mode',
			'action',
			'withFields',
			'authURL',
			'countryCode',
			'countryIsoCode',
			'cancelType',
			'cancelReason',
		];
		inputsName.forEach((input) => {
			formData[input] = dom.window.document.getElementsByName(input)[0].value;
		});
		return formData;
	} catch (err) {
		console.error('populateLoginFormData: ', err);
	}
};

const getNfxPrivateViaBrowser = async (languageCode) => {
	try {
		this.Browser = new Browser();
		this.validCookies = false;
		const browser = await this.Browser.launch();
		const page = await browser.newPage();
		await this.Browser.blockResources(page);
		await page.goto(loginURL, { waitUntil: 'networkidle0' });
		const credentials = {
			id_userLoginId: envs.nfxUser,
			id_password: envs.nfxPass,
		};
		for (const [key, value] of Object.entries(credentials)) {
			const selector = '#' + key;
			await page.click(selector);
			await page.type(selector, value);
		}
		await Promise.all([
			page.click('button[type=submit]'),
			page.waitForNavigation({ waitUntil: 'networkidle0' }),
		]);
		if (await page.url().includes('browse')) {
			const cookies = await page.cookies();
			await page.goto(baseURL + '/YourAccount', { waitUntil: 'networkidle0' });
			const authURL = await page.evaluate('netflix.reactContext.models.memberContext.data.userInfo.authURL');
			this.validCookies = {
				cookies: processCookiesObj(cookies),
				authURL: authURL || null,
				languageCode: languageCode,
			};
			await saveNfxPrivate(this.validCookies);
		}
		await page.close();
		await browser.close();
		return this.validCookies;
	} catch (err) {
		if (this.Browser) {
			await this.Browser.close();
		}
		console.error('getNfxPrivateViaBrowser: ', err);
	}
};

const processCookiesObj = (cookies) => {
	try {
		let cookiesString = '';
		for (const { name, value, expires } of cookies) {
			if (
				new Date(expires * 1000) > new Date() &&
				(name === 'NetflixId' || name === 'SecureNetflixId')
			) {
				cookiesString += `${name}=${value};`;
			}
		}
		return cookiesString;
	} catch (err) {
		console.error('processCookiesObj: ', err);
	}
};

const saveNfxPrivate = async (data) => {
	try {
		if (!fs.existsSync(envs.privatePath)) fs.mkdirSync(envs.privatePath, { recursive: true });
		await fs.promises.writeFile(cookiesFullPath, JSON.stringify(data, null, 2));
	} catch (err) {
		console.error('saveNfxPrivate: ', err);
	}
};

module.exports = {
	getNfxPrivateViaBrowser,
	cachedNfxPrivate,
	saveNfxPrivate,
};
