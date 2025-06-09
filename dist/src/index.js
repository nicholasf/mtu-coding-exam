import fetch from 'node-fetch';
const tomTomSearch = async function search(apikey, query) {
    const url = `https://api.tomtom.com:443/search/2/search/${encodeURIComponent(query)}.json?key=${apikey}&countrySet=AU`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const addresses = tomtomToQuickRoute(data);
        return addresses;
    }
    catch (err) {
        throw new Error('Unable to call endpoint: ' + err.message);
    }
};
export function tomtomToQuickRoute(res) {
    return res.results.map((result) => ({
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
//# sourceMappingURL=index.js.map