// src/App.jsx
import React from 'react';
import Map from './components/Map';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ position: 'absolute', top: '10px', left: '10%', zIndex: 10000 }}>
        Welcome to Map pointer!
      </h1>
      <Map />
    </div>
  );
}

export default App;