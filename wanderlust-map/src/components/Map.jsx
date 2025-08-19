// src/components/Map.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import AddPinForm from './AddPinForm'; // We will create this component next
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// ... (Leaflet icon fix from before)

const Map = () => {
  const [pins, setPins] = useState([]);
  const [newPinLocation, setNewPinLocation] = useState(null);

  // Fetch existing pins from Firestore
  useEffect(() => {
    const fetchPins = async () => {
      const pinsCollection = collection(db, 'pins');
      const pinsSnapshot = await getDocs(pinsCollection);
      const pinsList = pinsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPins(pinsList);
    };
    fetchPins();
  }, []);

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

  return (
    <>
      <MapContainer center={[20, 0]} zoom={3} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onMapClick={handleMapClick} />
        
        {/* Display existing pins */}
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
      </MapContainer>

      {/* Show the form as a modal/overlay */}
      {newPinLocation && (
        <AddPinForm
          position={newPinLocation}
          onClose={handleFormClose}
          onPinAdded={handlePinAdded}
        />
      )}
    </>
  );
};

export default Map;