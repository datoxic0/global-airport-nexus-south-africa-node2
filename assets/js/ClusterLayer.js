import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import { renderToString } from 'react-dom/server';
import htm from 'https://esm.sh/htm';
import { createPlaneIcon } from '../utils/leafletIcons.js';
import { MapPopup } from './MapPopup.js';

const html = htm.bind(React.createElement);

const ClusterLayer = ({ data }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !data) return;

        // Create cluster group with custom settings
        const markers = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 60,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            animate: true,
        });

        // Create and add markers
        // We map data to Leaflet markers directly to avoid React overhead for large datasets
        const markerList = data.map(airport => {
            // Ensure valid coordinates and exclude 0,0 placeholders
            if (isNaN(airport.lat) || isNaN(airport.lng) || (Math.abs(airport.lat) < 0.1 && Math.abs(airport.lng) < 0.1)) return null;

            const marker = L.marker([airport.lat, airport.lng], {
                icon: createPlaneIcon(airport.type),
                title: airport.name
            });

            // Render React popup content to static HTML string
            const popupHtml = renderToString(html`<${MapPopup} airport=${airport} />`);
            marker.bindPopup(popupHtml, {
                className: 'leaflet-popup-content-wrapper', // Uses our global CSS overrides
                closeButton: true,
                minWidth: 260
            });

            return marker;
        }).filter(Boolean);

        markers.addLayers(markerList);
        map.addLayer(markers);

        // Cleanup
        return () => {
            map.removeLayer(markers);
        };
    }, [map, data]);

    return null;
};

export default ClusterLayer;