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
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 3,
          "providerEpisodeId": "f1505337-5471-4410-b88b-033295d86a2c",
          "title": {
            "full": "Brown",
            "brief": null
          },
          "description": {
            "full": "Sam lucrează la un film cu o mare vedetă. Regizorul, Mel - un regizor celebru, a cărui carieră a cunoscut zile mai bune - este un fan al ei; cei doi discută despre carierele lor, iar ea îl invită să ia cina la ea acasă, împreună cu familia. Prietena lui Sam, Sunny, care are o căsnicie groaznică și care consideră că viața lui Sam are prea mult farmec, crede că Sam ar trebui să aibă o aventură cu Mel, care este căsătorit. Când Jeff, soțul inutil al lui Sunny, o dă în vileag pe Sunny fără ca aceasta să știe, Sam se descarcă pe el. La cină, Mel se înțelege bine cu copiii... dar Phyllis are o reacție ciudată la întâlnirea cu el, iar Mel este convins - în ciuda obiecțiilor lui Sam - că este din cauză că este negru.",
            "brief": "Sam invită un coleg acasă, la cină.",
            "medium": "Sam invită un coleg acasă, la cină - Mel, regizorul filmului la care lucrează. Prietena ei Sunny, care își trăiește viața prin prisma ei, crede că ea și Mel ar trebui să aibă o aventură."
          }
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 4,
          "providerEpisodeId": "638d795b-ee3f-4158-93f8-15396456ca4d",
          "title": {
            "full": "Femeia este ceva-ul din ceva",
            "brief": null
          },
          "description": {
            "full": "Sam, care este atât de extenuată încât doarme în mașină doar pentru a se relaxa în liniște, întâlnește o femeie fără adăpost care îi oferă o perspectivă șocantă asupra maternității și a sacrificiului pentru copiii tăi. Mai târziu, copiii fac ca diverse situații stresante să fie și mai stresante... mai ales când o strigă pe Sam ca să îl sune pe tatăl lor pentru a se ocupa de un incident minor care nu necesită în niciun caz intervenția lui. Epuizarea ei crește și se gândește la o operație estetică... dar, fără să știe, soarta ei profesională ar putea fi pe cale să se schimbe. Este luată în considerare pentru rolul principal într-un serial de comedie, dar sunt mulți factori în joc. Factori foarte, foarte stupizi. Cum ar fi dacă toți cei implicați pot fi convinși că o femeie mai în vârstă poate juca într-un serial de comedie. În timp ce în culise se desfășoară manevrele legate de acest lucru, singura femeie implicată în negocieri se află într-o situație dificilă. Iar managerul lui Sam, Tressa, îi ascunde în mod strategic informații lui Sam. Între timp, Sam și Frankie participă la un miting pentru drepturile femeilor, unde Sam este uimită de viziunea expansivă a lui Frankie asupra lumii și își face griji că a rămas în urmă în ceea ce privește evoluția vieții fiicei sale.",
            "brief": "Sam este privită cu adevărat.",
            "medium": "Sam este luată în considerare pentru rolul principal într-un serial de comedie, dar sunt mulți factori în joc. Între timp, Sam - care nu este implicată în aceste mașinațiuni - se confruntă cu epuizarea și stresul provocate de copii."
          }
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 5,
          "providerEpisodeId": "b8f12898-4b00-4f2b-806d-5e702ebe67f6",
          "title": {
            "full": "Febra viitorului",
            "brief": null
          },
          "description": {
            "full": "Sam se vede nevoită să ducă singură gustările la echipa de fotbal a lui Frankie, atunci când Frankie spune că este prea bolnavă pentru a merge la antrenamentul de fotbal. Când Sam află că una dintre mamele fetelor urmează să fie supusă unei intervenții chirurgicale dificile, începe să se gândească la moarte și o întreabă pe Phil dacă și-a făcut testamentul, deși nu era pregătită pentru răspunsul pe care urma să-l primească. Pe măsură ce Frankie este tot mai bolnavă, Sam și Max iau prânzul împreună și se implică în treburile altora, în loc să-și vadă de treburile lor. După o vizită la consilierul ei de orientare pentru facultate și o după-amiază petrecută cu prietenii ei leneși, Max se gândește cu îngrijorare la viitorul ei și le face adulților din viața ei o mărturisire importantă legată de nesiguranța ei.",
            "brief": "Sam are gustări și Max se gândește la lucruri.",
            "medium": "Când Frankie se îmbolnăvește, iar una dintre mamele din echipa ei de fotbal suferă o operație dificilă, Sam începe să se gândească la moarte și o întreabă pe Phil dacă și-a făcut un testament."
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
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 3,
          "providerEpisodeId": "urn:hbo:episode:GYQLBwgR0ak_CJwEAAAAp",
          "title": {
            "full": "Episod 3",
            "brief": "Episod 3"
          },
          "description": {
            "full": "Sam aduce un coleg la cină – pe Mel, regizorul filmului la care lucrează. Prietena ei, Sunny, care trăiește prin ea, crede că ea și Mel ar trebui să aibă o aventură, cu toate că el este însurat. Mel se înțelege bine cu copii... însă nu și cu Phil.",
            "brief": "Sam aduce un coleg la cină – pe Mel, regizorul filmului la care lucrează. Prietena ei, Sunny, care trăiește prin ea, crede că ea și Mel ar trebui să aibă o aventură, cu toate că el este însurat. Mel se înțelege bine cu copii... însă nu și cu Phil.",
            "medium": null
          }
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 4,
          "providerEpisodeId": "urn:hbo:episode:GYT-VMAe_csIgGwEAAABH",
          "title": {
            "full": "Episod 4",
            "brief": "Episod 4"
          },
          "description": {
            "full": "Sam este luată în considerare pentru rolul principal într-un serial, însă decizia va fi influențată de mulți factori externi. Între timp, Sam se confruntă cu epuizarea și stresul provocate de copii și încearcă să țină pasul cu viața lui Frankie.",
            "brief": "Sam este luată în considerare pentru rolul principal într-un serial, însă decizia va fi influențată de mulți factori externi. Între timp, Sam se confruntă cu epuizarea și stresul provocate de copii și încearcă să țină pasul cu viața lui Frankie.",
            "medium": null
          }
        },
        {
          "seasonNumber": 1,
          "episodeNumber": 5,
          "providerEpisodeId": "urn:hbo:episode:GYT-VbANbA5-QqQEAAABv",
          "title": {
            "full": "Episod 5",
            "brief": "Episod 5"
          },
          "description": {
            "full": "Când Frankie se îmbolnăvește și una dintre mamele din echipa ei de fotbal face o operație dificilă, Sam contemplează mortalitatea și îl întreabă pe Phil dacă a făcut un testament.",
            "brief": "Când Frankie se îmbolnăvește și una dintre mamele din echipa ei de fotbal face o operație dificilă, Sam contemplează mortalitatea și îl întreabă pe Phil dacă a făcut un testament.",
            "medium": null
          }
        }
      ],
      "hasValidationsErros": false
    }
  ]
}
```
####  Current project version: 0.01 (alpha)
