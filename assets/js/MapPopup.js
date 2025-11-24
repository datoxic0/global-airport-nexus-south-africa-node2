import React from 'react';
import { Plane, Globe2, MapPin } from 'lucide-react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

export const MapPopup = ({ airport }) => {
    return html`
        <div className="font-sans min-w-[240px] p-2 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                    <div className="bg-blue-500/10 p-1.5 rounded border border-blue-500/20">
                         <${Plane} className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="font-black text-blue-100 text-lg tracking-tight">${airport.icao}</h3>
                </div>
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-blue-300 border border-slate-700 font-bold">${airport.iata}</span>
            </div>
            <p className="text-sm font-bold text-white mb-1 leading-tight">${airport.name}</p>
            <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                <${Globe2} className="w-3 h-3 text-slate-500" /> 
                ${airport.city}, ${airport.region}
            </p>
            ${airport.address && html`
                <div className="text-[10px] text-slate-500 mb-4 flex items-start gap-1.5 border-t border-slate-800/50 pt-2">
                    <${MapPin} className="w-3 h-3 text-slate-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">${airport.address}</span>
                </div>
            `}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 shadow-inner">
                <div>
                    <span className="text-slate-600 block text-[10px] uppercase tracking-wider mb-0.5">Latitude</span>
                    <span className="text-emerald-400 font-medium">${airport.lat.toFixed(4)}</span>
                </div>
                <div>
                    <span className="text-slate-600 block text-[10px] uppercase tracking-wider mb-0.5">Longitude</span>
                    <span className="text-emerald-400 font-medium">${airport.lng.toFixed(4)}</span>
                </div>
                <div className="col-span-2 border-t border-slate-800/50 pt-2 mt-1 flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] uppercase">Elevation</span>
                    <span className="text-blue-400 font-bold bg-blue-900/20 px-2 py-0.5 rounded">${airport.elevation_ft} ft</span>
                </div>
            </div>
        </div>
    `;
};