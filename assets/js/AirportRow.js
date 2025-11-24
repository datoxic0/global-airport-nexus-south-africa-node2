import React from 'react';
import { Globe2 } from 'lucide-react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

const AirportRow = ({ airport }) => html`
    <tr className="hover:bg-blue-900/10 transition-colors group">
        <td className="px-6 py-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-blue-400 font-bold font-mono border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                    ${airport.icao}
                </div>
                <div className="font-mono text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">${airport.iata}</div>
            </div>
        </td>
        <td className="px-6 py-3">
            <div className="font-medium text-white text-sm group-hover:text-blue-300 transition-colors">${airport.name}</div>
            <div className="text-[10px] text-emerald-500 mt-1 flex items-center gap-1.5 uppercase tracking-wider font-bold opacity-80">
                <div className=${`w-1.5 h-1.5 rounded-full ${String(airport.type).includes('International') ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                ${airport.type}
            </div>
        </td>
        <td className="px-6 py-3">
            <div className="text-slate-200 flex items-center gap-1.5 text-xs">
                <${Globe2} className="w-3 h-3 text-slate-500" />
                ${airport.city}
            </div>
            <div className="text-[10px] text-slate-500 ml-4.5 mt-0.5">${airport.region}</div>
            ${airport.address && html`
                <div className="text-[9px] text-slate-600 ml-4.5 mt-1 max-w-[150px] truncate" title=${airport.address}>
                    ${airport.address}
                </div>
            `}
        </td>
        <td className="px-6 py-3 font-mono text-[10px] text-slate-400">
            <div className="flex gap-2 justify-between max-w-[100px]">
                <span className="text-slate-600">LAT</span>
                <span className=${airport.lat === 0 ? 'text-red-900' : ''}>${airport.lat === 0 ? 'N/A' : airport.lat.toFixed(4)}</span>
            </div>
            <div className="flex gap-2 justify-between max-w-[100px]">
                <span className="text-slate-600">LNG</span>
                <span className=${airport.lng === 0 ? 'text-red-900' : ''}>${airport.lng === 0 ? 'N/A' : airport.lng.toFixed(4)}</span>
            </div>
        </td>
        <td className="px-6 py-3 text-right font-mono text-blue-200/80">
            ${airport.elevation_ft} <span className="text-slate-600 text-[10px]">ft</span>
        </td>
    </tr>
`;

export default AirportRow;