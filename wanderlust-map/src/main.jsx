// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import 'leaflet/dist/leaflet.css'; // <-- MUST BE HERE

import './index.css' // Your own styles come after

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)