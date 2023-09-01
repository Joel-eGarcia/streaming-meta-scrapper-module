## Installation
```shell
npm install streaming-meta-scrapper
```
## Usage
```js
const streamingMeta = require('streaming-meta-scrapper');

(async () => {
	const scrapper = new streamingMeta({
		name: 'Better Things', // TV or Movie name
		id: 'tt4370596', // IMdb or TMdB ID
		providers: ['nfx', 'hbm', 'dnp'],
		locale: 'ro-RO', // Language and Country
	});
	const metadata = await scrapper.getMetadata();
})();
```
## Supported metadata providers
|                        	| HBO Max 	| Disney Plus 	| Netflix 	|
|------------------------	|---------	|-------------	|---------	|
| Title                  	|   &check;      	|        &check;     	|       &check;  	|
| Description            	|      &check;  	|         &check;   	|      &check;   	|
| Poster image           	|      &check;   	|          &check;   	|      &check;  	|
| Logo image             	|      &check;   	|       &check;      	|     &check;    	|
| Backdrop image         	|       &check;  	|         &check;    	|     &check;   	|
| Id                     	| &check;     	|         &check;    	|      &check;   	|
| Require account 	| No      	| No          	| Yes     	|

##  Environment variables
```shell
SMSM_COUNTRY_CODE=RO
SMSM_LANGUAGE_CODE=ro
SMSM_NFX_USER=
SMSM_NFX_PASSWORRD=
SMSM_NFX_ORIGIN_COUNTRY_CODE=RO
```
