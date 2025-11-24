import React, { useState, useEffect } from 'react';
import htm from 'https://esm.sh/htm';
import AirportRow from './AirportRow.js';
import Pagination from './Pagination.js';

const html = htm.bind(React.createElement);

export default function AirportTable({ data, syncStatus }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(100); // Increased from 25 to show more data at once

    // Reset to first page when data changes (e.g. filtering)
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    // Pagination Logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(Math.max(1, Math.min(totalPages, pageNumber)));
    };

    return html`
        <div className="flex flex-col h-[650px]">
            <div className="overflow-auto flex-1 relative custom-scrollbar">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900/95 text-slate-400 uppercase font-mono text-xs sticky top-0 z-10 backdrop-blur-sm border-b border-slate-700 shadow-lg">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Ident</th>
                            <th className="px-6 py-4 font-semibold">Details</th>
                            <th className="px-6 py-4 font-semibold">Location</th>
                            <th className="px-6 py-4 font-semibold">Coordinates</th>
                            <th className="px-6 py-4 font-semibold text-right">Elevation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        ${data.length === 0 ? html`
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                    ${syncStatus === 'LOADING' ? 'Parsing large dataset...' : 'No records found matching your criteria.'}
                                </td>
                            </tr>
                        ` : (
                            currentRows.map((airport) => html`
                                <${AirportRow} key=${airport.id || airport.icao} airport=${airport} />
                            `)
                        )}
                    </tbody>
                </table>
            </div>
            
            ${data.length > 0 && html`
                <${Pagination} 
                    currentPage=${currentPage}
                    totalPages=${totalPages}
                    onPageChange=${handlePageChange}
                    startIndex=${indexOfFirstRow}
                    endIndex=${Math.min(indexOfLastRow, data.length)}
                    totalRecords=${data.length}
                />
            `}
        </div>
    `;
}

