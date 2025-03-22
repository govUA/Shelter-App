import React, { CSSProperties } from 'react';
import { MapPin, Info } from 'lucide-react';
import { Shelter } from '../types/shelter';
import { StarRating } from './StarRating';

const shelterCardStyle: CSSProperties = {
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

const shelterCardHeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
};

const shelterCardTitleStyle: CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    flexGrow: 1
};

const shelterCardContentStyle: CSSProperties = {
    display: 'flex'
};

const shelterCardImageStyle: CSSProperties = {
    width: '8rem',
    height: '6rem',
    objectFit: 'cover',
    marginRight: '1rem',
    borderRadius: '0.25rem'
};

const shelterCardDetailsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

const shelterCardAddressStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
};

const shelterCardDetailsButtonStyle: CSSProperties = {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    display: 'flex',
    alignItems: 'center'
};

const shelterCardDetailsButtonIconStyle: CSSProperties = {
    marginRight: '0.5rem'
};

interface ShelterInfoCardProps {
    shelter: Shelter;
    onDetailsClick: (shelter: Shelter) => void;
}

export const ShelterInfoCard: React.FC<ShelterInfoCardProps> = ({
                                                                    shelter,
                                                                    onDetailsClick
                                                                }) => {
    return (
        <div style={shelterCardStyle}>
            <div style={shelterCardHeaderStyle}>
                <h2 style={shelterCardTitleStyle}>{shelter.name}</h2>
                <StarRating rating={shelter.rating} />
            </div>
            <div style={shelterCardContentStyle}>
                <img
                    src={shelter.photoUrl}
                    alt={shelter.name}
                    style={shelterCardImageStyle}
                />
                <div style={shelterCardDetailsStyle}>
                    <div style={shelterCardAddressStyle}>
                        <MapPin size={16} style={{ marginRight: '0.5rem', color: '#4B5563' }} />
                        <p>{shelter.address}</p>
                    </div>
                    <button
                        onClick={() => onDetailsClick(shelter)}
                        style={shelterCardDetailsButtonStyle}
                    >
                        <Info
                            size={16}
                            style={shelterCardDetailsButtonIconStyle}
                        />
                        More Details
                    </button>
                </div>
            </div>
        </div>
    );
};