import L from 'leaflet';

// Fix Leaflet Icon paths for Webpack/Browser environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Plane Icon Generator
export const createPlaneIcon = (type) => {
    const isIntl = type && type.includes('International');
    const color = isIntl ? '#3b82f6' : '#10b981'; // Blue for Intl, Emerald for others
    const glowColor = isIntl ? 'rgba(59, 130, 246, 0.5)' : 'rgba(16, 185, 129, 0.5)';

    return L.divIcon({
        className: 'bg-transparent border-none',
        html: `
            <div class="relative flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform duration-200 cursor-pointer">
                <div class="marker-pulse bg-${isIntl ? 'blue' : 'emerald'}-500/30"></div>
                <div class="relative w-8 h-8 bg-slate-900 rounded-full border-2 ${isIntl ? 'border-blue-500' : 'border-emerald-500'} flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M20 12h-7l-5-9H4l6 9-6 9h3l5-9h7a2 2 0 0 0 0-4Z"/>
                    </svg>
                </div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
};