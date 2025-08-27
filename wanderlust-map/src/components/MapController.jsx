// src/components/MapController.jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapController = ({ selectedPin }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPin) {
      // Smoothly fly to the selected pin's coordinates
      map.flyTo([selectedPin.lat, selectedPin.lng], 13); // 13 is the zoom level
    }
  }, [selectedPin, map]);

  return null; // This component doesn't render anything
};

export default MapController;