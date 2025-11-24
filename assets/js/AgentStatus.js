import React, { useState, useEffect } from 'react';
import { Terminal, Globe, ShieldCheck, Database, Activity } from 'lucide-react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

const agents = [
    { name: "MASTER_LIST_AGENT", color: "text-blue-400", icon: Database },
    { name: "GEOSPATIAL_AGENT", color: "text-emerald-400", icon: Globe },
    { name: "VERIFICATION_AGENT", color: "text-purple-400", icon: ShieldCheck },
];

const logMessages = [
    { agent: 0, msg: "Initializing Distributed Dataset Scan..." },
    { agent: 0, msg: "Mounting Optimized Shards: ZA(4x), NA, SA, EU, AS, OC, AF, ET..." },
    { agent: 1, msg: "Geospatial Aggregation: Merging coordinate streams..." },
    { agent: 2, msg: "Validating ICAO/IATA integrity across shards..." },
    { agent: 0, msg: "Detected 12 autonomous data regions." },
    { agent: 1, msg: "Optimizing Cluster Geometry..." },
    { agent: 1, msg: "Map Tiles: Pre-warming cache..." },
    { agent: 2, msg: "Data Integrity Check: PASSED." },
    { agent: 0, msg: "Compiling final Global Aviation Nexus..." },
    { agent: 2, msg: "System Ready." }
];

export default function AgentStatus({ onComplete }) {
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentLog = 0;
        const interval = setInterval(() => {
            if (currentLog >= logMessages.length) {
                clearInterval(interval);
                setTimeout(onComplete, 100);
                return;
            }

            const log = logMessages[currentLog];
            setLogs(prev => [...prev.slice(-6), log]); // Keep last 7 logs
            setProgress(p => Math.min(100, p + 10));
            currentLog++;
        }, 150); // Accelerated sequence for instant feel

        return () => clearInterval(interval);
    }, [onComplete]);

    return html`
        <div className="glass-panel rounded-lg p-6 w-full max-w-4xl mx-auto mb-8 shadow-2xl shadow-blue-900/20 border-t border-blue-500/30">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                <div className="flex items-center gap-2 text-blue-400">
                    <${Activity} className="w-5 h-5 animate-pulse" />
                    <h2 className="text-lg font-bold tracking-wider">ACTIVE AGENTS</h2>
                </div>
                <span className="font-mono text-xs text-slate-400">SYS.STATUS: ONLINE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                ${agents.map((agent, idx) => html`
                    <div key=${idx} className="bg-slate-800/50 p-3 rounded border border-slate-700 flex items-center gap-3">
                        <${agent.icon} className=${`w-5 h-5 ${agent.color}`} />
                        <div>
                            <div className=${`text-xs font-bold ${agent.color}`}>${agent.name}</div>
                            <div className="text-xs text-slate-400 font-mono">Status: Active</div>
                        </div>
                    </div>
                `)}
            </div>

            <div className="bg-black/80 rounded p-4 font-mono text-sm h-48 overflow-hidden flex flex-col relative border border-slate-800">
                <div className="absolute top-2 right-2 text-xs text-emerald-500 font-bold">
                    ${progress}%
                </div>
                <div className="flex-1 flex flex-col justify-end">
                    ${logs.map((log, i) => html`
                        <div key=${i} className="mb-1">
                            <span className=${`${agents[log.agent].color} mr-2`}>
                                [${agents[log.agent].name}]:
                            </span>
                            <span className="text-slate-300">${log.msg}</span>
                        </div>
                    `)}
                    <div className="terminal-cursor text-green-500">_</div>
                </div>
            </div>
        </div>
    `;
}