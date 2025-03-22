import React from 'react';
import ReactDOM from 'react-dom/client';
import BombShelterApp from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BombShelterApp />
    </React.StrictMode>
);