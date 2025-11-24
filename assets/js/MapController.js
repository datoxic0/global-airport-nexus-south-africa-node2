import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const MapController = ({ data }) => {
    const map = useMap();

    useEffect(() => {
        // Safety check for map instance
        if (!map) return;

        // Debounce updates to prevent render thrashing and ensure container readiness
        const updateTimer = setTimeout(() => {
            try {
                // Ensure map knows its size (fixes grey tiles on load/resize)
                map.invalidateSize();

                if (data && data.length > 0) {
                    // Validate coordinates before creating bounds to prevent Leaflet crashes
                    const validPoints = data
                        .filter(p => 
                            p.lat !== undefined && p.lat !== null && !isNaN(p.lat) &&
                            p.lng !== undefined && p.lng !== null && !isNaN(p.lng) &&
                            (Math.abs(p.lat) > 0.1 || Math.abs(p.lng) > 0.1) // Exclude 0,0 or null island
                        )
                        .map(d => [d.lat, d.lng]);

                    if (validPoints.length > 0) {
                        const bounds = L.latLngBounds(validPoints);
                        if (bounds.isValid()) {
                            map.fitBounds(bounds, { 
                                padding: [50, 50], 
                                maxZoom: 10,
                                animate: true,
                                duration: 1.5
                            });
                        }
                    }
                } else {
                    // Default fallback view (South Africa) if dataset is empty
                    map.setView([-29.0, 24.0], 4, { animate: true });
                }
            } catch (error) {
                console.warn("MapController Error:", error);
            }
        }, 150);

        // Cleanup timeout on unmount or data change
        return () => clearTimeout(updateTimer);
    }, [map, data]);

    return null;
};

export default MapController;