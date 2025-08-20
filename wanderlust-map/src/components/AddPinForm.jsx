// src/components/AddPinForm.jsx
import React, { useState } from 'react';
import { db } from '../firebase'; // No longer need 'storage'
import { collection, addDoc } from 'firebase/firestore';
// No longer need Firebase Storage imports

const AddPinForm = ({ position, onClose, onPinAdded, user }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  // We will store the Base64 string here instead of the file object
  const [photoDataUrl, setPhotoDataUrl] = useState(null); 
  const [loading, setLoading] = useState(false);

  // *** NEW FUNCTION ***
  // This function converts the selected file into a Base64 string
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // The result is the Base64 Data URL
        setPhotoDataUrl(reader.result); 
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);

    // *** SIMPLIFIED LOGIC ***
    // We no longer need to upload to Storage. We just save to Firestore.
    try {
      const newPinData = {
        title,
        notes,
        // Save the Base64 string directly to the document
        photoDataUrl: photoDataUrl || '', 
        lat: position.lat,
        lng: position.lng,
        createdAt: new Date(),
        userId: user.uid,
      };
      const docRef = await addDoc(collection(db, 'pins'), newPinData);
      
      onPinAdded({ id: docRef.id, ...newPinData });
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add pin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3>Add New Destination</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <input
            type="file"
            // Use our new handler function
            onChange={handlePhotoChange} 
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Pin'}
          </button>
          <button type="button" className="close-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPinForm;