import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
    Map as MapIcon, Table, 
    Search, Filter
} from 'lucide-react';

import AgentStatus from './AgentStatus.js';
import TabButton from './components/TabButton.js';

// New Components
import Header from './components/Header.js';
import AirportTable from './components/AirportTable.js';
import AirportMap from './components/AirportMap.js';
import { useAirportData } from './hooks/useAirportData.js';

function App() {
    const [view, setView] = useState('map'); // agents, table, map
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');

    const { airportsData, dataSource, syncStatus, forceReseed } = useAirportData();

    // Optimized Filtering with useMemo to prevent unecessary re-calculations/renders
    const filteredData = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        let results = airportsData;

        // 1. Apply Region Filter
        if (regionFilter !== 'All') {
            if (regionFilter === 'South Africa') {
                // Special handling for Country-level filtering for South Africa
                // Also including Lesotho (LS) and Eswatini (SZ) as they are geographically embedded/neighbors
                results = results.filter(a => 
                    a.country === 'ZA' || 
                    a.country === 'South Africa' || 
                    a.country === 'LS' || 
                    a.country === 'SZ'
                );
            } else {
                results = results.filter(a => a.continent === regionFilter);
            }
        }

        // 2. Apply Search (Only if term exists)
        if (lower) {
            results = results.filter(airport => 
                (airport.name && airport.name.toLowerCase().includes(lower)) ||
                (airport.city && airport.city.toLowerCase().includes(lower)) ||
                (airport.country && airport.country.toLowerCase().includes(lower)) ||
                (airport.icao && airport.icao.toLowerCase().includes(lower)) ||
                (airport.iata && airport.iata.toLowerCase().includes(lower)) ||
                (airport.region && airport.region.toLowerCase().includes(lower)) // Added region search support
            );
        }
        
        return results;
    }, [searchTerm, airportsData, regionFilter]);

    const regions = ['All', 'South Africa', 'Africa', 'Europe', 'Asia', 'North America', 'South America', 'Oceania'];

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 font-sans text-slate-200 flex flex-col">
            <div className="flex-grow">
                {/* Header */}
                <Header 
                    dataSource={dataSource} 
                    syncStatus={syncStatus} 
                    airportsData={airportsData}
                />

                {/* Agent View (Hidden for instant access) */}
                {view === 'agents' && (
                    <AgentStatus onComplete={() => setView('map')} />
                )}

                {/* Main Interface */}
                {view !== 'agents' && (
                    <main className="animate-fade-in space-y-4">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-4 px-1">
                            <div className="bg-slate-800/50 p-1 rounded-lg border border-slate-700/50 flex gap-1 shrink-0">
                                <TabButton active={view === 'map'} label="Geospatial" icon={MapIcon} onClick={() => setView('map')} />
                                <TabButton active={view === 'table'} label="Database Registry" icon={Table} onClick={() => setView('table')} />
                            </div>

                            {/* Region Filter Scrollable */}
                            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 bg-slate-800/30 p-1.5 rounded-lg border border-slate-700/30">
                                <Filter className="w-4 h-4 text-slate-500 ml-2 shrink-0" />
                                {regions.map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setRegionFilter(r)}
                                        className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                                            regionFilter === r 
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                                            : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-64 group shrink-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search Database..."
                                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl ring-1 ring-white/5 relative">
                            
                            {/* Optimized Rendering: Keep Map Mounted to prevent reloading jank */}
                            <div className={view === 'table' ? 'block h-[650px]' : 'hidden h-[650px]'}>
                                <AirportTable data={filteredData} syncStatus={syncStatus} />
                            </div>

                            <div className={view === 'map' ? 'block h-[650px]' : 'hidden h-[650px]'}>
                                <AirportMap data={filteredData} syncStatus={syncStatus} />
                            </div>
                        </div>

                        <div className="mt-4 text-xs text-slate-500 font-mono flex flex-col md:flex-row justify-between px-2 gap-2 opacity-60 hover:opacity-100 transition-opacity">
                            <span>System: {syncStatus === 'SEEDING' ? 'WRITING DATA...' : 'ONLINE'} | Connection: SECURE</span>
                            <span>Records Synced: {airportsData.length} | Latency: 12ms</span>
                        </div>
                    </main>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-800 pt-6 pb-8 text-center animate-fade-in">
                <div className="max-w-3xl mx-auto px-4">
                    <p className="text-slate-500 text-xs leading-relaxed font-mono">
                        Developed by Siyabonga B Phakathi of The Voice & Eye of Bhambatha Inc. © 2026
                        <br />
                        <span className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-3 text-slate-600">
                            <a href="https://www.bhambathatablog.wordpress.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:underline">Blog</a>
                            <span className="hidden sm:inline text-slate-800">|</span>
                            <a href="https://www.facebook.com/C.Datoxic.P" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:underline">Facebook</a>
                            <span className="hidden sm:inline text-slate-800">|</span>
                            <a href="https://www.websim.com/@whisperinggalaxyd" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:underline">WebSim</a>
                            <span className="hidden sm:inline text-slate-800">|</span>
                            <a href="https://www.github.com/datoxic0" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:underline">GitHub</a>
                            <span className="hidden sm:inline text-slate-800">|</span>
                            <a href="https://discord.com/channels/datoxic0" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:underline">Discord</a>
                            <span className="hidden sm:inline text-slate-800">|</span>
                            <a href="https://x.com/Siya_B_Phakathi" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:underline">X</a>
                        </span>
                    </p>
                </div>
            </footer>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);