import React from 'react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

const TabButton = ({ active, label, icon: Icon, onClick }) => html`
    <button 
        onClick=${onClick}
        className=${`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-200 ${
            active 
            ? 'bg-slate-800 text-blue-400 border-t-2 border-blue-500 font-bold' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
        }`}
    >
        <${Icon} className="w-4 h-4" />
        <span className="font-medium">${label}</span>
    </button>
`;

export default TabButton;

