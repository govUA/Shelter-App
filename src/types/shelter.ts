export interface Feedback {
    id: number;
    user: string;
    rating: number;
    comment: string;
    imageUrl?: string;
}

export interface Shelter {
    id: number;
    name: string;
    address: string;
    rating: number;
    photoUrl: string;
    description: string;
    feedback: Feedback[];
}