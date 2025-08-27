// src/App.jsx
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import './App.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null); // State to hold the logged-in user object
  const [isListOpen, setIsListOpen] = useState(false); // State for sidebar
  const auth = getAuth();

  // This effect runs once on component mount to check the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // If user logs in, currentUser is the user object. If logs out, it's null.
      setIsListOpen(false); // Close sidebar on auth change
    });
    
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);
  
  const handleLogout = () => {
    signOut(auth);
  };

  const toggleList = () => {
    setIsListOpen(prev => !prev);
  };

  return (
    <div className="App">
      {user ? (
        // If user is logged in, show the map and a logout button
        <>
          <Navbar 
            user={user} 
            onLogout={handleLogout} 
            onToggleList={toggleList} 
          />
          <Map 
            user={user} 
            isListOpen={isListOpen} 
            onCloseList={() => setIsListOpen(false)}
          />
        </>
      ) : (
        // If no user is logged in, show the Auth component
        <Auth />
      )}
    </div>
  );
}

export default App;