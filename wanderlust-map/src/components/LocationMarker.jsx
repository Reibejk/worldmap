// src/components/LocationMarker.jsx
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

function LocationMarker({ onMapClick }) {
  useMapEvents({
    click(e) {
      // Pass the latlng object to the parent component
      onMapClick(e.latlng);
    },
  });

  return null; // This component does not render anything
}

export default LocationMarker;