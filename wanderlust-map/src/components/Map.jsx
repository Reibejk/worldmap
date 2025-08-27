// src/components/Map.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

import LocationMarker from './LocationMarker';
import AddPinForm from './AddPinForm'; // We will create this component next
import VisitedList from './VisitedList'; // Import the sidebar
import MapController from './MapController'; // Import the controller


// ... (Leaflet icon fix from before)

const Map = ({ user, isListOpen, onCloseList }) => {
  const [pins, setPins] = useState([]);
  const [newPinLocation, setNewPinLocation] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null); // State for the selected pin from the list

  // Fetch existing pins from Firestore
  useEffect(() => {
   const fetchPins = async () => {
      if (!user) return; // Don't fetch if no user is logged in
      
      const q = query(collection(db, 'pins'), where("userId", "==", user.uid));
      
      const pinsSnapshot = await getDocs(q);
      const pinsList = pinsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPins(pinsList);
    };
    fetchPins();
  }, [user]); // Re-run the effect if the user changes


  const handleMapClick = (latlng) => {
    setNewPinLocation(latlng);
  };

  const handleFormClose = () => {
    setNewPinLocation(null);
  };

  const handlePinAdded = (newPin) => {
      setPins([...pins, newPin]);
      setNewPinLocation(null);
  };

  const handlePinSelect = (pin) => {
    setSelectedPin(pin);
    onCloseList(); // Close the sidebar after selecting a pin
  };

  return (
    <>
      <VisitedList 
        pins={pins} 
        isOpen={isListOpen} 
        onClose={onCloseList} 
        onPinSelect={handlePinSelect}
      />
      <MapContainer center={[20, 0]} zoom={3} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onMapClick={handleMapClick} />
        
        {pins.map(pin => (
          <Marker key={pin.id} position={[pin.lat, pin.lng]}>
            <Popup>
              <div>
                <h3>{pin.title}</h3>
                <p>{pin.notes}</p>
                {pin.photoDataUrl && <img src={pin.photoDataUrl} alt={pin.title} style={{ width: '100px' }} />}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Add the map controller here */}
        <MapController selectedPin={selectedPin} />
      </MapContainer>

      {newPinLocation && (
        <AddPinForm
          position={newPinLocation}
          onClose={handleFormClose}
          onPinAdded={handlePinAdded}
          user={user}
        />
      )}
    </>
  );
};

export default Map;