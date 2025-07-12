import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ CORRECT import
import './index.css';
import App from './App.jsx';
import { AppContextProvider } from './Context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
