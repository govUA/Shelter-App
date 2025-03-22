import { Shelter, Feedback } from '../types/shelter';

export const SHELTER_DATA: Shelter[] = [
    {
        id: 1,
        name: 'Centre of Children and Youth Arts',
        address: '18 Chystiakivska St',
        rating: 3.5,
        photoUrl: '',
        description: 'Basement of an educational institution.',
        feedback: [
            {
                id: 1,
                user: 'Mavrina V.R.',
                rating: 4,
                comment: 'Nice shelter for children and adults. Unfortunately, not enough seats.'
            },
            {
                id: 2,
                user: 'Hrynko V.P.',
                rating: 3,
                comment: 'Bad air flow.'
            }
        ]
    },
    {
        id: 2,
        name: 'Kyiv School of Economics',
        address: '3 Mykoly Shpaka St',
        rating: 0,
        photoUrl: '',
        description: 'Basement of an educational institution.',
        feedback: []
    }
];

export const addFeedbackToShelter = (shelterId: number, newFeedback: Omit<Feedback, 'id'>) => {
    const shelterIndex = SHELTER_DATA.findIndex(shelter => shelter.id === shelterId);

    if (shelterIndex === -1) {
        throw new Error('Shelter not found');
    }

    const feedback: Feedback = {
        ...newFeedback,
        id: SHELTER_DATA.length + 1
    };

    SHELTER_DATA[shelterIndex].feedback.push(feedback);

    const updatedRatings = SHELTER_DATA[shelterIndex].feedback.map(f => f.rating);
    const newAverageRating = updatedRatings.reduce((a, b) => a + b, 0) / updatedRatings.length;
    SHELTER_DATA[shelterIndex].rating = Number(newAverageRating.toFixed(1));

    return feedback;
};
