import { useState, useEffect, useCallback } from 'react';
import { globalAirports } from '../data.js';
import { loadCsvData } from '../utils/csvLoader.js';
import { REGIONAL_DATASETS } from '../utils/regions.js';

// Global memory cache to prevent re-parsing on component re-mounts within the same session
let memoryCache = null;
const STORAGE_KEY = 'GAN_DATA_CACHE_V15'; // Bumped to V15 to force fresh load after refactor
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 Hours

export function useAirportData() {
    const [airportsData, setAirportsData] = useState([]);
    const [dataSource, setDataSource] = useState('Initializing...');
    const [syncStatus, setSyncStatus] = useState('LOADING');

    const loadData = useCallback(async (force = false) => {
        // 1. Memory Cache (Fastest)
        if (memoryCache && !force) {
            setAirportsData(memoryCache);
            setDataSource(`Memory Cache (${memoryCache.length} records)`);
            setSyncStatus('SYNCED');
            return;
        }

        // 2. Persistent LocalStorage Cache (Fast)
        if (!force) {
            try {
                const cached = localStorage.getItem(STORAGE_KEY);
                if (cached) {
                    const { timestamp, data } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        memoryCache = data; // Hydrate memory cache
                        setAirportsData(data);
                        setDataSource(`Local Cache (${data.length} records)`);
                        setSyncStatus('SYNCED');
                        return;
                    }
                }
            } catch (e) {
                console.warn("Cache read failed:", e);
            }
        }

        setSyncStatus('LOADING');
        setDataSource('Reading Global Datasets...');

        try {
            // REFACTOR: Legacy monolithic files (airports.csv, south_africa.csv, americas.csv) have been physically deleted.
            // System now exclusively aggregates from granular regional datasets.
            // tombstone: // removed loadCsvData('/airports.csv') - Monolith file deleted to improve load times
            // tombstone: // removed loadCsvData('/data/americas.csv') - Replaced by north_america.csv and south_america.csv
            // tombstone: // removed loadCsvData('/data/south_africa.csv') - Replaced by primary/secondary/tertiary/quaternary splits

            // Loading split regional datasets
            const promises = REGIONAL_DATASETS.map(region => loadCsvData(`/data/${region}.csv`));
            
            const results = await Promise.allSettled(promises);
            
            const combinedData = results
                .filter(p => p.status === 'fulfilled')
                .map(p => p.value)
                .flat();
            
            if (combinedData && combinedData.length > 0) {
                // Update Caches
                memoryCache = combinedData;
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify({
                        timestamp: Date.now(),
                        data: combinedData
                    }));
                } catch (e) {
                    // removed cache write error logging to reduce noise
                }
                
                setAirportsData(combinedData);
                setDataSource(`Global Registry (${combinedData.length} nodes)`);
                setSyncStatus('SYNCED');
            } else {
                throw new Error("Regional files were empty or invalid.");
            }
        } catch (e) {
            console.error("Primary CSV Load failed:", e);
            
            // Fallback to static data if CSV is missing or broken
            setAirportsData(globalAirports);
            setDataSource('Backup Link Active');
            setSyncStatus('OFFLINE');
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { airportsData, dataSource, syncStatus, forceReseed: loadData };
}