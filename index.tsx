
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Code-split so the tracker's JS/CSS (and its private Supabase config) never
// ships to a visitor browsing the public marketing pages.
const TrackerApp = lazy(() => import('./tracker/TrackerApp'));

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
const isTracker = window.location.pathname.startsWith('/tracker');

root.render(
  <React.StrictMode>
    {isTracker ? (
      <Suspense fallback={null}>
        <TrackerApp />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
