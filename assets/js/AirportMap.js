import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import htm from 'https://esm.sh/htm';
import MapController from './MapController.js';
import ClusterLayer from './ClusterLayer.js';

const html = htm.bind(React.createElement);

export default function AirportMap({ data, syncStatus }) {
    return html`
        <div className="h-[650px] w-full relative z-0 bg-slate-900">
            <${MapContainer} 
                center=${[-29, 24]} 
                zoom=${3} 
                scrollWheelZoom=${true} 
                style=${{ background: '#0f172a', height: '100%', width: '100%' }}
                maxZoom=${18}
            >
                <${TileLayer}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                <${MapController} data=${data} />
                <${ClusterLayer} data=${data} />

            </${MapContainer}>
            
            <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-2xl max-w-xs">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Dataset Scope</div>
                <div className="flex items-end gap-2">
                    <div className="text-3xl font-black text-white">${data.length.toLocaleString()}</div>
                    <div className="text-sm text-slate-500 mb-1">Airports</div>
                </div>
                <div className="h-1 w-full bg-slate-800 mt-3 rounded-full overflow-hidden">
                    <div className=${`h-full w-full transition-all duration-500 ${syncStatus === 'LOADING' ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500'}`}></div>
                </div>
            </div>
        </div>
    `;
}