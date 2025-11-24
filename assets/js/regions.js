// Central registry of all CSV data files to be loaded by the application
// This makes adding new regions easier - just add the filename (without extension) here.

export const REGIONAL_DATASETS = [
    // tombstone: // removed 'south_africa' (Monolith) - Split into primary/secondary/tertiary/quaternary
    // tombstone: // removed 'americas' (Monolith) - Split into North/South America
    // tombstone: // removed 'airports' (Monolith) - Replaced by regional aggregation logic
    
    // --- AFRICA ---
    'south_africa_primary', 
    'south_africa_secondary', 
    'south_africa_tertiary',
    'south_africa_quaternary',
    'africa',
    'additional_africa',
    'ethiopia',

    // --- REST OF WORLD ---
    'europe', 
    'asia', 
    'north_america', 
    'south_america', 
    'oceania'
];