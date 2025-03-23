import React from 'react';
import { MapPin, Info } from 'lucide-react';
import { Shelter } from '../types/shelter';
import { StarRating } from './StarRating';
import styles from './ShelterInfoCard.module.css';

interface ShelterInfoCardProps {
    shelter: Shelter;
    onDetailsClick: (shelter: Shelter) => void;
}

export const ShelterInfoCard: React.FC<ShelterInfoCardProps> = ({
                                                                    shelter,
                                                                    onDetailsClick
                                                                }) => {
    return (
        <div className={styles.shelterCard}>
            <div className={styles.shelterCardHeader}>
                <h3 className={styles.shelterName}>{shelter.name}</h3>
                <StarRating rating={shelter.rating} />
            </div>
            <div className={styles.shelterCardContent}>
                <div className={styles.addressContainer}>
                    <img
                        src={shelter.photoUrl}
                        alt={shelter.name}
                        className={styles.shelterCardImage}
                    />
                    <MapPin size={16} />
                    <span className={styles.shelterAddress}>{shelter.address}</span>
                </div>
                <button
                    onClick={() => onDetailsClick(shelter)}
                    className={styles.shelterCardDetailsButton}
                >
                    <Info size={16} />
                    More Details
                </button>
            </div>
        </div>
    );
};