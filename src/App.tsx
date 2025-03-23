import React, { useEffect, useState } from 'react';
import { ShelterInfoCard, ShelterDetailsModal } from './components';
import { fetchShelters } from './data/shelters';
import { Shelter } from './types/shelter';
import styles from './App.module.css';

const BombShelterApp: React.FC = () => {
    const [shelters, setShelters] = useState<Shelter[]>([]);
    const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

    useEffect(() => {
        fetchShelters().then(setShelters);
    }, []);

    const handleFeedbackUpdate = (updatedShelter: Shelter) => {
        setShelters(currentShelters =>
            currentShelters.map(shelter =>
                shelter.id === updatedShelter.id ? updatedShelter : shelter
            )
        );
        setSelectedShelter(updatedShelter);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.appTitle}>Kyiv Bomb Shelters</h1>

            {shelters.map(shelter => (
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
                    onFeedbackUpdate={handleFeedbackUpdate}
                />
            )}
        </div>
    );
};

export default BombShelterApp;