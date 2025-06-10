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
declare const tomTomSearch: Search;
export declare function tomtomToQuickRoute(res: TomTom.SearchResponse): Address[];
export { tomTomSearch as search };
export declare namespace TomTom {
    interface Summary {
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
    interface Position {
        lat: number;
        lon: number;
    }
    interface TimeRange {
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
    interface OpeningHours {
        mode: string;
        timeRanges: TimeRange[];
    }
    interface Brand {
        name: string;
    }
    interface CategorySet {
        id: number;
    }
    interface Classification {
        code: string;
        names: {
            nameLocale: string;
            name: string;
        }[];
    }
    interface TimeZone {
        ianaId: string;
    }
    interface POI {
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
    interface RelatedPoi {
        relationType: string;
        id: string;
    }
    interface Address {
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
    interface Mapcode {
        type: string;
        fullMapcode: string;
        territory: string;
        code: string;
    }
    interface Viewport {
        topLeftPoint: Position;
        btmRightPoint: Position;
    }
    interface EntryPoint {
        type: string;
        position: Position;
    }
    interface AddressRanges {
        rangeLeft: string;
        rangeRight: string;
        from: Position;
        to: Position;
    }
    interface Connector {
        connectorType: string;
        ratedPowerKW: number;
        currentA: number;
        currentType: string;
        voltageV: number;
        availabilityLastUpdated: string;
        availability: string;
    }
    interface ChargingPark {
        connectors: Connector[];
    }
    interface DataSource {
        id: string;
    }
    interface DataSources {
        chargingAvailability: DataSource;
        parkingAvailability: DataSource;
        fuelPrice: DataSource;
        geometry: DataSource;
    }
    interface SearchResult {
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
    interface SearchResponse {
        summary: Summary;
        results: SearchResult[];
    }
}
