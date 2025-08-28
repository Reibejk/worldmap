import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

const MapController = ({ selectedPin }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPin) {
      map.flyTo([selectedPin.lat, selectedPin.lng], 13);
    }
  }, [selectedPin]); // This effect only runs when the selectedPin prop changes

  // The re-center button is now part of the controller, so it has access to `map`
  return (
    <>
      {selectedPin && (
        <button 
          className="recenter-button"
          onClick={(e) => {
            // Stop the click from propagating to the map and creating a new pin
            e.stopPropagation(); 
            map.flyTo([selectedPin.lat, selectedPin.lng], 13);
          }}
        >
          Re-center on {selectedPin.title}
        </button>
      )}
    </>
  );
};

export default MapController;