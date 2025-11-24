import React from 'react';
import { Globe2, Database, FileDown } from 'lucide-react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

export default function Header({ dataSource, syncStatus, airportsData }) {
    
    const downloadCSV = () => {
        const headers = ["ICAO", "IATA", "Name", "City", "Region", "Country", "Latitude", "Longitude", "Elevation(ft)", "Address", "Type", "Status"];
        const rows = airportsData.map(a => [
            a.icao, a.iata, `"${a.name}"`, a.city, a.region, a.country, a.lat, a.lng, a.elevation_ft, `"${a.address}"`, a.type, a.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "aviation_nexus_db_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'SYNCED': return 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30';
            case 'SEEDING':
            case 'LOADING': return 'bg-blue-900/30 text-blue-400 border-blue-500/30 animate-pulse';
            default: return 'bg-slate-800 text-slate-400 border-slate-700';
        }
    };

    return html`
        <header className="mb-8 border-b border-slate-700/50 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
                        <${Globe2} className="w-10 h-10 text-blue-500" />
                        GLOBAL AVIATION NEXUS
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                        <p className="text-slate-400 font-medium">Strategic Airport Intelligence System</p>
                        <span className=${`px-2 py-0.5 text-xs rounded-md border font-mono flex items-center gap-1 transition-colors duration-500 ${getStatusColor(syncStatus)}`}>
                            <${Database} className="w-3 h-3" />
                            ${dataSource}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick=${downloadCSV} 
                        disabled=${airportsData.length === 0}
                        className="group bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg shadow-lg shadow-emerald-900/20 flex items-center gap-2 font-semibold transition-all hover:scale-105 active:scale-95"
                    >
                        <${FileDown} className="w-5 h-5 group-hover:animate-bounce" />
                        <span>Export DB</span>
                    </button>
                </div>
            </div>
        </header>
    `;
}