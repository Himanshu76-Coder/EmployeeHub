// Main entry point for React application
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/fonts/fonts.css'
import './assets/fonts/material-symbols.css'
import './index.css'
import App from './App.jsx'

// Render app with StrictMode for development warnings
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
