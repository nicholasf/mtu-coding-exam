import fetch from 'node-fetch';

// Type definitions
export interface Address {
    streetNumber: string;
    streetName: string;
    municipalitySubdivision: string;
    municipality: string;
    countrySecondarySubdivision: string;
    countryTertiarySubdivision: string;
    countrySubdivision: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    countrySubdivisionName: string;
    localName: string;
}

export type Search = (apikey: string, query: string) => Promise<Address[]>;

const tomTomSearch: Search = async function search(apikey: string, query: string): Promise<Address[]> {
    const url = `https://api.tomtom.com:443/search/2/search/${encodeURIComponent(query)}.json?key=${apikey}&countrySet=AU`;

    try {
        const res = await fetch(url)
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json() as TomTom.SearchResponse;
        const addresses = tomtomToQuickRoute(data);
        return addresses;
    } catch (err) {
        throw new Error('Unable to call endpoint: ' + (err as Error).message);
    }
}

export function tomtomToQuickRoute(res: TomTom.SearchResponse): Address[] {
    return res.results.map((result: TomTom.SearchResult) => ({
        streetNumber: result.address.streetNumber || '',
        streetName: result.address.streetName || '',
        municipalitySubdivision: result.address.municipalitySubdivision || '',
        municipality: result.address.municipality || '',
        countrySecondarySubdivision: result.address.countrySecondarySubdivision || '',
        countryTertiarySubdivision: result.address.countryTertiarySubdivision || '',
        countrySubdivision: result.address.countrySubdivision || '',
        postalCode: result.address.postalCode || '',
        extendedPostalCode: result.address.extendedPostalCode || '',
        countryCode: result.address.countryCode || '',
        country: result.address.country || '',
        countryCodeISO3: result.address.countryCodeISO3 || '',
        freeformAddress: result.address.freeformAddress || '',
        countrySubdivisionName: result.address.countrySubdivisionName || '',
        localName: result.address.localName || ''
    }));
}


export { tomTomSearch as search };


export namespace TomTom {
    export interface Summary {
        query: string;
        queryType: string;
        queryTime: number;
        numResults: number;
        offset: number;
        totalResults: number;
        fuzzyLevel: number;
        geoBias: Position;
        queryIntent: string[];
    }

    export interface Position {
        lat: number;
        lon: number;
    }

    export interface TimeRange {
        startTime: {
            date: string;
            hour: number;
            minute: number;
        };
        endTime: {
            date: string;
            hour: number;
            minute: number;
        };
    }

    export interface OpeningHours {
        mode: string;
        timeRanges: TimeRange[];
    }

    export interface Brand {
        name: string;
    }

    export interface CategorySet {
        id: number;
    }

    export interface Classification {
        code: string;
        names: {
            nameLocale: string;
            name: string;
        }[];
    }

    export interface TimeZone {
        ianaId: string;
    }

    export interface POI {
        name: string;
        phone: string;
        url: string;
        brands: Brand[];
        categorySet: CategorySet[];
        categories: string[];
        openingHours: OpeningHours;
        classifications: Classification[];
        timeZone: TimeZone;
    }

    export interface RelatedPoi {
        relationType: string;
        id: string;
    }

    export interface Address {
        streetNumber: string;
        streetName: string;
        municipalitySubdivision: string;
        municipality: string;
        countrySecondarySubdivision: string;
        countryTertiarySubdivision: string;
        countrySubdivision: string;
        postalCode: string;
        extendedPostalCode: string;
        countryCode: string;
        country: string;
        countryCodeISO3: string;
        freeformAddress: string;
        countrySubdivisionName: string;
        localName: string;
    }

    export interface Mapcode {
        type: string;
        fullMapcode: string;
        territory: string;
        code: string;
    }

    export interface Viewport {
        topLeftPoint: Position;
        btmRightPoint: Position;
    }

    export interface EntryPoint {
        type: string;
        position: Position;
    }

    export interface AddressRanges {
        rangeLeft: string;
        rangeRight: string;
        from: Position;
        to: Position;
    }

    export interface Connector {
        connectorType: string;
        ratedPowerKW: number;
        currentA: number;
        currentType: string;
        voltageV: number;
        availabilityLastUpdated: string;
        availability: string;
    }

    export interface ChargingPark {
        connectors: Connector[];
    }

    export interface DataSource {
        id: string;
    }

    export interface DataSources {
        chargingAvailability: DataSource;
        parkingAvailability: DataSource;
        fuelPrice: DataSource;
        geometry: DataSource;
    }

    export interface SearchResult {
        type: string;
        id: string;
        score: number;
        dist: number;
        info: string;
        entityType: string;
        poi: POI;
        relatedPois: RelatedPoi[];
        address: Address;
        position: Position;
        mapcodes: Mapcode[];
        viewport: Viewport;
        entryPoints: EntryPoint[];
        addressRanges: AddressRanges;
        chargingPark: ChargingPark;
        dataSources: DataSources;
    }

    export interface SearchResponse {
        summary: Summary;
        results: SearchResult[];
    }
}


