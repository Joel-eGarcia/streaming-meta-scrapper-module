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
| Title                  	|  &check;      | &check;     	| &check;  	|
| Description            	|  &check;  	| &check;   	| &check;   	|
| Poster image           	|  &check;   	| &check;   	| &check;  	|
| Logo image             	|  &check;   	| &check;      	| &check;    	|
| Backdrop image         	|  &check;  	| &check;    	| &check;   	|
| Id                     	| &check;     	| &check;    	| &check;   	|
| Require account 	| No      	| No          	| Yes     	|

##  Environment variables
```shell
SMSM_COUNTRY_CODE=RO
SMSM_LANGUAGE_CODE=ro
SMSM_NFX_USER=
SMSM_NFX_PASSWORRD=
SMSM_NFX_ORIGIN_COUNTRY_CODE=RO
```
##  Metadata response example
```json
{
  "count": 1,
  "validResultsCount": 1,
  "ids": {
    "justwatch": 64957,
    "streaming": {
      "dnp": "2h6PcHFDbsPy"
    },
    "tmdb": "24428",
    "imdb": "tt0848228",
    "tmdb_history": [
      "24428"
    ],
    "imdb_history": [
      "tt0848228"
    ]
  },
  "language": "en",
  "country": "US",
  "results": [
    {
      "providerShort": "dnp",
      "providerNicename": "Disney Plus",
      "providerId": "2h6PcHFDbsPy",
      "mediaType": "movie",
      "title": {
        "full": "Marvel Studios' The Avengers",
        "brief": null
      },
      "description": {
        "full": "Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. The Avengers — Iron Man, The Incredible Hulk, Thor and Captain America — assemble alongside Black Widow and Hawkeye to battle an unexpected enemy:  the Asgardian God Loki, who commands a powerful Chitauri army threatening global safety and security.\n\nSome flashing lights sequences or patterns may affect photosensitive viewers.",
        "brief": "Nick Fury recruits a team of heroes to battle an unexpected enemy.",
        "medium": "When an unexpected enemy threatens global safety and security, Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins."
      },
      "images": {
        "poster": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/742152B8B90725AF02183F0726926A0ADCACAEA21FD172DB98517072F0F614DC",
          "id": "742152B8B90725AF02183F0726926A0ADCACAEA21FD172DB98517072F0F614DC",
          "width": 2000,
          "height": 2818
        },
        "thumbnail_1_33": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/96C85364D6D391B11E2CFCC225E90937D76AD0E262EA3EC658E8348E8159DD81",
          "id": "96C85364D6D391B11E2CFCC225E90937D76AD0E262EA3EC658E8348E8159DD81",
          "width": 1440,
          "height": 1080
        },
        "thumbnail": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/82F3F6FA5D695E092E7BA684325ECD18F4F241CBEA31B660DD6F9DC57DE770B7",
          "id": "82F3F6FA5D695E092E7BA684325ECD18F4F241CBEA31B660DD6F9DC57DE770B7",
          "width": 1920,
          "height": 1080
        },
        "logo": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DE3E4068DDF2C30D661AD581674F9207C0FEB9647661850B6A7DE3A6CB1B20CF",
          "id": "DE3E4068DDF2C30D661AD581674F9207C0FEB9647661850B6A7DE3A6CB1B20CF",
          "width": 1920,
          "height": 1080
        }
      },
      "episodes": [],
      "hasValidationsErros": false
    }
  ]
}
```
####  Current project version: 0.01 (alpha)
