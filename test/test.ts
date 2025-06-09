import { expect } from 'chai';
import nock from 'nock';
import { search, tomtomToQuickRoute, Address, TomTom } from '../src/index.js';

const TEST_API_KEY = 'TEST';

describe('Fuzzy search success', () => {
    it('calls the fuzzy search endpoint', async () => {
        nock.load('./test/fixtures/422collins.json')
        try {
            let data = await search(TEST_API_KEY, '422 Collins st');
            let firstResult: Address = data[0];
            expect(firstResult.streetNumber).to.equal('422');
            expect(firstResult.streetName).to.equal('Collins Street');
            expect(firstResult.municipality).to.equal('Melbourne');
            expect(firstResult.postalCode).to.equal('3000');
            expect(firstResult.countrySubdivision).to.equal('Victoria');
            expect(firstResult.countryCode).to.equal('AU');
            expect(firstResult.country).to.equal('Australia');
            expect(firstResult.freeformAddress).to.equal('422 Collins Street, Melbourne CBD, VIC, 3000');
            expect(data.length).to.equal(10);
        } catch (e) {
            throw(e)  
        }
    })
})

describe('Fuzzy search failure (mismatching API key)', () => {
    it('calls the fuzzy search endpoint', async () => {
        nock('https://api.tomtom.com:443')
            .get('/search/2/search/422%20Collins%20st.json')
            .query({"key": "TEST", "countrySet": "AU"})
            .reply(403, // the below comes from test/fixtures/forbidden.json - recorded nock code for a 403
                { "detailedError":
                    {"code": "Forbidden", "message": "You are not allowed to access this endpoint"}}, 
                    {connection: 'close',  
                        'content-length': '94',
                        'content-type': 'application/json',  
                        date: 'Mon, 09 Jun 2025 08:33:33 GMT',
                        server: 'tomtom',
                        'tracking-id': '10a7a4cb-20d8-4f14-9d56-ff923c2dceea',
                        'x-tomtom-attempt-count': '1',
                        'x-tomtom-processed-by': 'australiaeast',
                        'x-tomtom-upstream-service-time': '10'});

        try {
            await search(TEST_API_KEY, '422 Collins st');
        } catch (e) {
            let err = e as Error;
            expect(err).to.not.be.null;      
            expect(err.message).to.include('HTTP error! status: 403');
        }
    })
})

describe('THe tomtomToQuickRoute mapping function', () => {
    it('maps the tomtom response to the QuickRoute Address type', () => {
        const tomtomResponse: TomTom.SearchResponse = {
            summary: {
                query: '422 Collins st',
                queryType: 'NEAR',
                queryTime: 100,
                numResults: 10,
                offset: 0,
                totalResults: 10,
                fuzzyLevel: 1,
                geoBias: { lat: -37.8136, lon: 144.9631 },
                queryIntent: []
            },
            results: [{
                type: 'address',
                id: '123456',
                score: 1.0,
                dist: 0,
                info: '',
                entityType: 'Municipality',
                poi: {
                    name: '',
                    phone: '',
                    brands: [],
                    categorySet: [],
                    url: '',
                    categories: [],
                    classifications: [],
                    openingHours: {
                        mode: '',
                        timeRanges: []
                    },
                    timeZone: {
                        ianaId: ''
                    }
                },
                relatedPois: [],
                address: {
                    streetNumber: '422',
                    streetName: 'Collins Street',
                    municipalitySubdivision: '',
                    municipality: 'Melbourne',
                    countrySecondarySubdivision: '',
                    countryTertiarySubdivision: '',
                    countrySubdivision: 'Victoria',
                    postalCode: '3000',
                    extendedPostalCode: '',
                    countryCode: 'AU',
                    country: 'Australia',
                    countryCodeISO3: 'AUS',
                    freeformAddress: '422 Collins Street, Melbourne CBD, VIC, 3000',
                    countrySubdivisionName: 'Victoria',
                    localName: ''
                },
                position: {
                    lat: -37.8136,
                    lon: 144.9631
                },
                mapcodes: [],
                viewport: {
                    topLeftPoint: {
                        lat: -37.8126,
                        lon: 144.9621
                    },
                    btmRightPoint: {
                        lat: -37.8146,
                        lon: 144.9641
                    }
                },
                entryPoints: [],
                addressRanges: {
                    rangeLeft: '',
                    rangeRight: '',
                    from: {
                        lat: 0,
                        lon: 0
                    },
                    to: {
                        lat: 0,
                        lon: 0
                    }
                },
                chargingPark: {
                    connectors: []
                },
                dataSources: {
                    chargingAvailability: {
                        id: ''
                    },
                    parkingAvailability: {
                        id: ''
                    },
                    fuelPrice: {
                        id: ''
                    },
                    geometry: {
                        id: ''
                    }
                }
            }]
        };

        const addresses = tomtomToQuickRoute(tomtomResponse);
        expect(addresses).to.have.lengthOf(1);
        expect(addresses[0].streetNumber).to.equal('422');
        expect(addresses[0].streetName).to.equal('Collins Street');
        expect(addresses[0].municipality).to.equal('Melbourne');
        expect(addresses[0].postalCode).to.equal('3000');
        expect(addresses[0].countrySubdivision).to.equal('Victoria');
        expect(addresses[0].countryCode).to.equal('AU');
        expect(addresses[0].country).to.equal('Australia');
        expect(addresses[0].freeformAddress).to.equal('422 Collins Street, Melbourne CBD, VIC, 3000');
    });
})