// MapSection.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapSection({ lat, lng, angle }) {
  const position = [parseFloat(lat), parseFloat(lng)];

  function ArrowMarker({ position, angle }) {
    const map = useMap();

    useEffect(() => {
      const icon = L.divIcon({
        className: '',
        html: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40" height="40"
            viewBox="0 0 24 24"
            style="transform: rotate(${angle}deg);"
          >
            <path
              d="M12 2 L19 21 L12 17 L5 21 Z"
              fill="crimson"
            />
          </svg>
        `,
        iconSize:   [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker(position, { icon }).addTo(map);
    }, [map, position, angle]);

    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '20px auto',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={position}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: '250px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ArrowMarker position={position} angle={angle} />
      </MapContainer>
    </div>
  );
}
