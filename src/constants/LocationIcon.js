import L from 'leaflet';

export const LocationIcon = L.icon({
    iconUrl: require('../assets/location_icon.svg'),
    iconRetinaUrl: require('../assets/location_icon.svg'),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [60, 50],
    className: 'leaflet-venue-icon'
});