import Papa from 'https://esm.sh/papaparse@5.4.1';
import { normalizeAirportRecord, validateRecord } from './normalizer.js';

/**
 * Fetches and parses a CSV file from the given path.
 * Returns normalized data or throws an error.
 */
export const loadCsvData = async (path) => {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (results) => {
                    try {
                        if (results.errors && results.errors.length > 0) {
                            console.warn('CSV Parse warnings:', results.errors);
                        }
                        
                        if (!results.data || results.data.length === 0) {
                            resolve([]);
                            return;
                        }

                        const normalized = results.data
                            .map(normalizeAirportRecord)
                            .filter(validateRecord);
                            
                        resolve(normalized);
                    } catch (error) {
                        console.error('Error normalizing CSV data:', error);
                        reject(error);
                    }
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    } catch (error) {
        console.error('Error in loadCsvData:', error);
        return [];
    }
};