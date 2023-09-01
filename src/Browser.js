const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const extra = require('puppeteer-extra-plugin-stealth');
puppeteer.use(extra());

const defaultArgs = [
	'--disable-web-security',
	'--disable-features=IsolateOrigins',
	'--disable-site-isolation-trials',
];

const blockResourceType = [
	'beacon',
	'csp_report',
	'font',
	'image',
	'imageset',
	'media',
	'object',
	'texttrack',
	'stylesheet',
];
	
class Browser {
	constructor(options) {
		this._options = Object.assign(
			{
				args: defaultArgs,
				headless: 'on',
			},
			options
		);

		this.browser = null;
	}
	
	async launch() {
		try {
			this.browser = await puppeteer.launch(this._options);
			const autoCloseBrowser = setTimeout(async () => {
				try {
					if(this.browser !== null) {
						await this.close();
					}
				} catch(err) {
					console.error('autoCloseBrowser: ', err);
				}
			   
			}, 90000);
			
			this.tmpProfileDir = null;
			for (const arg of this.browser.process().spawnargs) {
				if (arg.includes('--user-data-dir=')) {
					this.tmpProfileDir = arg.replace('--user-data-dir=', '');
				}
			}
			this.browser.on('disconnected', async () => {
				clearTimeout(autoCloseBrowser);
				if (this.tmpProfileDir !== null) {
					try {
						await fs.promises.rm(this.tmpProfileDir, { 
							recursive: true, 
							force: true,
							maxRetries : 3,
						});
					} catch (err) {
						console.error('Browser:deleteTmpProfile: ', err);
					}
				}
			});
			
			return this.browser;
			
		} catch (err) {
			console.error('launch: ', err);
		}
	}
	
	async blockResources(page) {
		try {
			await page.setRequestInterception(true);
			page.on('request', interceptedRequest => {
				if (blockResourceType.indexOf(interceptedRequest.resourceType()) !== -1) {
					interceptedRequest.abort();
				} else {
					interceptedRequest.continue();
				}
			});
		} catch (err) {
			console.error('blockResources: ', err);
		}
	}
	
	async close() {
		try {
			if (this.browser) {
				this.browser.close();
			}
		} catch (err) {
			console.error('close: ', err);
		}
	}
}

module.exports = {
	Browser,
	blockResourceType,
};
