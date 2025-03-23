import { Shelter } from '../types/shelter';

export const fetchShelters = async (): Promise<Shelter[]> => {
    try {
        const response = await fetch('http://localhost:5000/shelters');
        if (!response.ok) throw new Error('Failed to fetch shelters');
        return await response.json();
    } catch (error) {
        console.error('Error fetching shelters:', error);
        return [];
    }
};