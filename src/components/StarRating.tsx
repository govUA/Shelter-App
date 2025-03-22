import React, { useState } from 'react';
import { Star } from 'lucide-react';

const starRatingStyle = {
    display: 'flex',
    alignItems: 'center'
};

const starStyle = {
    cursor: 'pointer',
    marginRight: '0.25rem'
};

const editableStarStyle = {
    ...starStyle,
    transition: 'transform 0.2s ease'
};

const editableStarHoverStyle = {
    ...editableStarStyle,
    transform: 'scale(1.1)'
};

interface StarRatingProps {
    rating: number;
    editable?: boolean;
    onRatingChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
                                                          rating,
                                                          editable = false,
                                                          onRatingChange
                                                      }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleRatingChange = (selectedRating: number) => {
        if (editable && onRatingChange) {
            onRatingChange(selectedRating);
        }
    };

    return (
        <div style={starRatingStyle}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    color={star <= (hoverRating || rating) ? 'gold' : 'gray'}
                    fill={star <= (hoverRating || rating) ? 'gold' : 'none'}
                    style={
                        editable && star === hoverRating
                            ? editableStarHoverStyle
                            : (editable ? editableStarStyle : starStyle)
                    }
                    onMouseEnter={() => editable && setHoverRating(star)}
                    onMouseLeave={() => editable && setHoverRating(0)}
                    onClick={() => handleRatingChange(star)}
                />
            ))}
        </div>
    );
};