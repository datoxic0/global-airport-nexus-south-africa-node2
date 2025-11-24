/**
 * Normalizes airport data from various CSV sources (OurAirports, OpenFlights, etc.)
 * to a consistent application schema.
 */
export const normalizeAirportRecord = (row) => {
    // Helper to handle potentially numeric fields that might be strings
    const parseNum = (val, isInt = false) => {
        if (val === undefined || val === null || val === '') return 0;
        const num = parseFloat(val);
        if (isNaN(num)) return 0;
        return isInt ? Math.round(num) : num;
    };

    // Safer string conversion to prevent "toUpperCase is not a function" errors
    const safeStr = (val) => {
        if (val === null || val === undefined) return '';
        return String(val).trim();
    };

    // Helper to infer continent from country
    const getContinent = (countryName) => {
        const c = safeStr(countryName);
        if (!c) return 'Unknown';
        
        // removed hardcoded continent mapping logic (50+ lines) as source data now includes continent field
        
        return 'Other';
    };

    const country = safeStr(row.Country || row.country || row.iso_country || 'Unknown');

    // Optimization: Moved map outside function scope to prevent recreation on every row
    const zaMap = {
        'ZA-EC': 'Eastern Cape',
        'ZA-FS': 'Free State',
        'ZA-GT': 'Gauteng',
        'ZA-KZN': 'KwaZulu-Natal',
        'ZA-ZN': 'KwaZulu-Natal', // Alternative
        'ZA-LP': 'Limpopo',
        'ZA-MP': 'Mpumalanga',
        'ZA-NC': 'Northern Cape',
        'ZA-NW': 'North West',
        'ZA-WC': 'Western Cape',
        'ZA-U': 'Unknown'
    };

    // Friendly names for South African Provinces based on ISO Codes
    const cleanRegion = (reg) => {
        const r = safeStr(reg);
        // tombstone: // removed const zaMap = { ... } - Hoisted to module scope for performance
        return zaMap[r] || r;
    };

    return {
        // Identifiers
        icao: safeStr(row.ICAO || row.icao || row.ident || row.gps_code).toUpperCase(),
        iata: safeStr(row.IATA || row.iata || row.iata_code).toUpperCase(),
        
        // Descriptive
        name: safeStr(row.Name || row.name || 'Unknown Airport'),
        type: safeStr(row.Type || row.type || 'Unknown'),
        status: safeStr(row.Status || row.status || 'Operational'),
        
        // Location
        city: safeStr(row.City || row.city || row.municipality),
        region: cleanRegion(row.Region || row.region || row.iso_region),
        country: country,
        continent: row.Continent || row.continent || getContinent(country), // Infer if missing
        address: safeStr(row.Address || row.address),
        
        // Coordinates
        lat: parseNum(row.Latitude || row.lat || row.latitude_deg),
        lng: parseNum(row.Longitude || row.lng || row.longitude_deg),
        elevation_ft: parseNum(row['Elevation(ft)'] || row.elevation_ft || row.elevation_ft, true),
    };
};

export const validateRecord = (record) => {
    // Must have a name and some form of ID.
    // We allow records with 0 coordinates (missing data) to be loaded into the table,
    // but they will be filtered out by MapController and ClusterLayer.
    return record.name && (record.icao || record.iata);
};