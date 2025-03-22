import React, { useState } from 'react';
import { ShelterInfoCard, ShelterDetailsModal } from './components';
import { SHELTER_DATA } from './data/shelters';
import { Shelter } from './types/shelter';

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem'
};

const appTitleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
};

const BombShelterApp: React.FC = () => {
    const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

    return (
        <div style={containerStyle}>
            <h1 style={appTitleStyle}>Укриття Києва</h1>

            {SHELTER_DATA.map(shelter => (
                <ShelterInfoCard
                    key={shelter.id}
                    shelter={shelter}
                    onDetailsClick={setSelectedShelter}
                />
            ))}

            {selectedShelter && (
                <ShelterDetailsModal
                    shelter={selectedShelter}
                    onClose={() => setSelectedShelter(null)}
                />
            )}
        </div>
    );
};

export default BombShelterApp;