## Installation
```shell
npm install streaming-meta-scrapper
```
## Usage
```js
const streamingMeta = require('streaming-meta-scrapper');

(async () => {
	const scrapper = new streamingMeta({
		name: 'Better Things', // Show or Movie name
		id: 'tt4370596', // IMdb or TMDB ID
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
  "count": 2,
  "validResultsCount": 2,
  "ids": {
    "justwatch": 41894,
    "streaming": {
      "dnp": "5MJuEOCCWWH1",
      "hbm": "urn:hbo:series:GYQLBuAROFDpSKQEAAAAO"
    },
    "tmdb": "66859",
    "imdb": "tt4370596",
    "tmdb_history": [
      "66859",
      "20186"
    ],
    "imdb_history": [
      "tt4370596",
      "tt4371706",
      "tt5156920"
    ]
  },
  "language": "ro",
  "country": "RO",
  "results": [
    {
      "providerShort": "dnp",
      "providerNicename": "Disney Plus",
      "providerId": "5MJuEOCCWWH1",
      "mediaType": "show",
      "title": {
        "full": "Lucruri mai bune",
        "brief": null
      },
      "description": {
        "full": "În serialul „Lucruri mai bune” personajul principal este Sam Fox (Pamela Adlon), o actriță celibatară și fără nicio reținere, care își crește cele trei fiice, Max (Mikey Madison), Frankie (Hannah Alligood) și Duke (Olivia Edward), în Los Angeles. Ea este mamă, tată, arbitru și polițist. Sam are grijă și de mama ei, Phil (Celia Imrie), o englezoaică expatriată, care locuiește vizavi. Sam este imperfectă și feroce în dragostea pentru fiicele ei, dar și pentru propria mamă, revărsându-și uneori dragostea atunci când se simte vinovată. Sam încearcă doar să își câștige existența, să se implice în viețile fiicelor sale, să se distreze cu un prieten sau doi și, de asemenea - poate - să strecoare din când în când și ceva timp pentru ea însăși.",
        "brief": "Mamă singură și actriță, Sam Fox își crește cele trei fiice.",
        "medium": "Serial de comedie care o are în prim plan pe Sam Fox (Pamela Adlon), o actriță celibatară și fără nicio reținere, care își crește cele trei fiice în Los Angeles."
      },
      "images": {
        "poster": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/BE1B6BBD3BF0889885F95F8E3ADC13D615CC6962768457B120932BA3D9B4381F",
          "id": "BE1B6BBD3BF0889885F95F8E3ADC13D615CC6962768457B120932BA3D9B4381F",
          "width": 2000,
          "height": 2818
        },
        "thumbnail_1_33": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/65456811AAFFFA6D982BC802BB9D848E9BEFF445E031CC060F47C269FBBED3B3",
          "id": "65456811AAFFFA6D982BC802BB9D848E9BEFF445E031CC060F47C269FBBED3B3",
          "width": 1440,
          "height": 1080
        },
        "thumbnail": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/220DC37C249C28C5BCD711CE5E9A06EBED25BD1C5901CA90A88BD55B28460985",
          "id": "220DC37C249C28C5BCD711CE5E9A06EBED25BD1C5901CA90A88BD55B28460985",
          "width": 3840,
          "height": 2160
        },
        "logo": {
          "url": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/307396D2FBB962F4C06FAC444F60DC4F2CFE49912D00C301EF9486DE0DED175F",
          "id": "307396D2FBB962F4C06FAC444F60DC4F2CFE49912D00C301EF9486DE0DED175F",
          "width": 3840,
          "height": 2160
        }
      },
      "episodes": [
        {
          "seasonNumber": 1,
          "episodeNumber": 1,
          "providerEpisodeId": "13f7cd12-ac64-44ee-af4a-7e9f4ceb76d0",
          "title": {
            "full": "Sam",
            "brief": null
          },
          "description": {
            "full": "Sam Fox, mamă celibatară a trei copii și actriță fără prea mult succes, încearcă doar să supraviețuiască de pe o zi pe alta. Este uluită când Max, fata cea mare, în vârstă de 15 ani, o roagă fără rețineri să-i cumpere niște iarbă. Este stresată când fiică ei mijlocie, Frankie, în vârstă de 12 ani, excentrică, inteligentă și obsesiv-compulsivă îi întrerupe audiția lipsită de perspectivă pentru a o întreba dacă poate invita niște prieteni la ea. Și s-a săturat să fie judecată de alte femei atunci când cea mică, Duke, în vârstă de șase ani, plânge în public fără niciun motiv întemeiat. În plus, are de-a face cu pretendenți prea solicitanți, cu roluri de actriță în care nu este sigură că vrea ca fiicele ei să o vadă jucând și cu profesori de școală neînțelegători față de situația ei. În lipsa brațelor singurului bărbat care o poate face să se gândească la altceva, Sam sfârșește prin a avea o noapte la fel de zbuciumată. Dar, în cele din urmă, lucrurile nu sunt atât de groaznice... doar obositoare.",
            "brief": "Faceți cunoștință cu Sam Fox.",
            "medium": "Faceți cunoștință cu Sam Fox, mamă singură a trei copii, stresată, actriță fără prea mult succes, încercând să treacă peste o zi grea și o noapte obositoare."
          }
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 2,
          "providerEpisodeId": "f027da2b-ee63-44a6-a399-319e6ee5a35b",
          "title": {
            "full": "Menstruație",
            "brief": null
          },
          "description": {
            "full": "Sam se duce la un control ginecologic și este descumpănită să afle de la ginecologul ei, o gravidă fericită, că menopauza nu se întrevede la orizont - și este și mai descumpănită de reacția prietenilor ei la aflarea acestei vești. Apoi, se întoarce acasă mai devreme după o altă dezamăgire profesională și constată că bona ei, Susie, și-a neglijat în mod dezamăgitor îndatoririle, iar fetele au întors casa cu fundul în sus. În timp ce face curățenie - și este dezmierdată prin telefon de divagațiile egocentrice ale mamei sale, Phil - găsește un prezervativ nefolosit în camera lui Max, dar alege să nu spună nimic despre asta. Probleme familiale fierbinți ies la iveală - și rămân în mod dezolant nerezolvate - între Sam și Phil, precum și între Sam și Max. Iar când Sam vorbește la un seminar de emancipare a femeilor și a fetelor la liceul lui Frankie, toată treaba lipsită de strălucire este deprimantă... până când Sam începe să arunce câteva adevăruri bombă.",
            "brief": "Sam se confruntă cu treburi femeiești.",
            "medium": "Sam află că copiii au vandalizat casa cât ea a fost plecată, ginecologul îi dă vești neașteptate și trebuie să vorbească la un seminar de emancipare a femeilor și fetelor la liceul lui Frankie."
          }
        }
      ],
      "hasValidationsErros": false
    },
    {
      "providerShort": "hbm",
      "providerNicename": "HBO Max",
      "providerId": "urn:hbo:series:GYQLBuAROFDpSKQEAAAAO",
      "mediaType": "show",
      "title": {
        "full": "Lucruri mai bune",
        "brief": "Lucruri mai bune"
      },
      "description": {
        "full": "O comedie care o are în centrul atenției pe Sam Fox, o actriță și mamă singură a trei fete. Viața ei e amuzantă atunci când ești doar telespectator - deși, uneori, ți-ai dori să fii în locul ei.",
        "brief": "O comedie care o are în centrul atenției pe Sam Fox, o actriță și mamă singură a trei fete. Viața ei e amuzantă atunci când ești doar telespectator - deși, uneori, ți-ai dori să fii în locul ei.",
        "medium": null
      },
      "images": {
        "poster": {
          "url": "https://art-gallery-emea.api.hbo.com/images/GYQLBuAROFDpSKQEAAAAO/tileburnedin/?v=c9fcbd0ecb97dcdf17eb51f91f23b5e3&size=960x1440&language=ro-ro",
          "id": "c9fcbd0ecb97dcdf17eb51f91f23b5e3",
          "width": 960,
          "height": 1440
        },
        "thumbnail_1_33": {
          "url": null,
          "id": null,
          "width": null,
          "height": null
        },
        "thumbnail": {
          "url": "https://art-gallery-emea.api.hbo.com/images/GYQLBuAROFDpSKQEAAAAO/tileburnedin/?v=c9fcbd0ecb97dcdf17eb51f91f23b5e3&size=960x540&language=ro-ro",
          "id": "c9fcbd0ecb97dcdf17eb51f91f23b5e3",
          "width": 960,
          "height": 540
        },
        "logo": {
          "url": "https://art-gallery-emea.api.hbo.com/images/GYQLBuAROFDpSKQEAAAAO/logoburnedin/?v=c9fcbd0ecb97dcdf17eb51f91f23b5e3&size=1200x362&language=ro-ro",
          "id": "c9fcbd0ecb97dcdf17eb51f91f23b5e3",
          "width": 1200,
          "height": 362
        }
      },
      "episodes": [
        {
          "seasonNumber": 1,
          "episodeNumber": 1,
          "providerEpisodeId": "urn:hbo:episode:GYQLBuAPBE5iTwgEAAAAl",
          "title": {
            "full": "Episod 1",
            "brief": "Episod 1"
          },
          "description": {
            "full": "Ea este Sam Fox, o mamă singură cu trei copii, care încearcă să devină actriță. Ea încearcă să treacă cu bine printr-o zi complicată și o noapte epuizantă.",
            "brief": "Ea este Sam Fox, o mamă singură cu trei copii, care încearcă să devină actriță. Ea încearcă să treacă cu bine printr-o zi complicată și o noapte epuizantă.",
            "medium": null
          }
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 2,
          "providerEpisodeId": "urn:hbo:episode:GYT-U9AOQDMIgGwEAAABF",
          "title": {
            "full": "Episod 2",
            "brief": "Episod 2"
          },
          "description": {
            "full": "Sam descoperă că cei mici au distrus casa cât a fost ea plecată. Ginecologul ei îi dă niște vești neașteptate, după care trebuie să vorbească la un seminar despre împuternicirea femeilor și fetelor la liceul lui Frankie.",
            "brief": "Sam descoperă că cei mici au distrus casa cât a fost ea plecată. Ginecologul ei îi dă niște vești neașteptate, după care trebuie să vorbească la un seminar despre împuternicirea femeilor și fetelor la liceul lui Frankie.",
            "medium": null
          }
        }
      ],
      "hasValidationsErros": false
    }
  ]
}
```
####  Current project version: 0.1.2 (alpha)
