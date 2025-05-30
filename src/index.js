// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// PWA detection helper
function isPWA() {
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  if (window.navigator.standalone === true) return true;
  if (document.referrer.startsWith('android-app://')) return true;
  return false;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Register SW and notify it when in PWA mode
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
        // Notify SW if app is running as PWA
        if (isPWA() && registration.active) {
          registration.active.postMessage({ type: 'PWA_MODE' });
        }
        // Listen for updates and skip waiting immediately
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      })
      .catch(err => console.error('SW registration failed:', err));
  }
});