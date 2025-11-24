import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

export default function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    startIndex, 
    endIndex, 
    totalRecords 
}) {
    return html`
        <div className="bg-slate-900 border-t border-slate-700 p-3 flex items-center justify-between">
            <div className="text-xs text-slate-400 font-mono hidden sm:block">
                Showing <span className="text-white font-bold">${startIndex + 1}</span> to <span className="text-white font-bold">${endIndex}</span> of <span className="text-blue-400 font-bold">${totalRecords.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1 mx-auto sm:mx-0">
                <button onClick=${() => onPageChange(1)} disabled=${currentPage === 1} className="p-2 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed">
                    <${ChevronsLeft} className="w-4 h-4" />
                </button>
                <button onClick=${() => onPageChange(currentPage - 1)} disabled=${currentPage === 1} className="p-2 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed">
                    <${ChevronLeft} className="w-4 h-4" />
                </button>
                
                <div className="px-4 py-1 bg-slate-800 rounded border border-slate-700 text-xs font-mono text-white min-w-[80px] text-center">
                    Page ${currentPage} / ${totalPages}
                </div>

                <button onClick=${() => onPageChange(currentPage + 1)} disabled=${currentPage === totalPages} className="p-2 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed">
                    <${ChevronRight} className="w-4 h-4" />
                </button>
                <button onClick=${() => onPageChange(totalPages)} disabled=${currentPage === totalPages} className="p-2 hover:bg-slate-800 rounded text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed">
                    <${ChevronsRight} className="w-4 h-4" />
                </button>
            </div>
        </div>
    `;
}

