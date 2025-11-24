// Verified Global Airport Data (Fallback)
// NOTE: Redundant static data has been removed to reduce bundle size.
// The application now relies primarily on parsing split regional CSV files in /data/*.csv.

export const globalAirports = [
    // --- AFRICA ---
    {
        icao: "FAOR", iata: "JNB", name: "O.R. Tambo International", city: "Johannesburg",
        region: "Gauteng", country: "South Africa", continent: "Africa",
        lat: -26.1392, lng: 28.246, elevation_ft: 5558, type: "Large International", status: "Operational"
    },
    {
        icao: "FACT", iata: "CPT", name: "Cape Town International", city: "Cape Town",
        region: "Western Cape", country: "South Africa", continent: "Africa",
        lat: -33.9648, lng: 18.6017, elevation_ft: 151, type: "Large International", status: "Operational"
    },
    {
        icao: "FALE", iata: "DUR", name: "King Shaka International", city: "Durban",
        region: "KwaZulu-Natal", country: "South Africa", continent: "Africa",
        lat: -29.6144, lng: 31.1197, elevation_ft: 295, type: "Large International", status: "Operational"
    },
    {
        icao: "FAGG", iata: "GRJ", name: "George Airport", city: "George",
        region: "Western Cape", country: "South Africa", continent: "Africa",
        lat: -34.0056, lng: 22.3789, elevation_ft: 648, type: "Regional", status: "Operational"
    },
    {
        icao: "FALA", iata: "HLA", name: "Lanseria International", city: "Johannesburg",
        region: "Gauteng", country: "South Africa", continent: "Africa",
        lat: -25.9386, lng: 27.9261, elevation_ft: 4517, type: "International", status: "Operational"
    },
    {
        icao: "FAPE", iata: "PLZ", name: "Chief Dawid Stuurman International", city: "Gqeberha",
        region: "Eastern Cape", country: "South Africa", continent: "Africa",
        lat: -33.9849, lng: 25.6173, elevation_ft: 226, type: "International", status: "Operational"
    },
    // tombstone: // removed 150+ lines of legacy static airport data objects to optimize bundle size
    {
        icao: "KJFK", iata: "JFK", name: "John F. Kennedy International", city: "New York",
        region: "New York", country: "United States", continent: "North America",
        lat: 40.6413, lng: -73.7781, elevation_ft: 13, type: "Large International", status: "Operational"
    }
];