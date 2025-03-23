import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

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

    const getStarClassName = (star: number) => {
        if (editable && star === hoverRating) {
            return styles.editableStarHover;
        } else if (editable) {
            return styles.editableStar;
        } else {
            return styles.star;
        }
    };

    return (
        <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    color={star <= (hoverRating || rating) ? 'gold' : 'gray'}
                    fill={star <= (hoverRating || rating) ? 'gold' : 'none'}
                    className={getStarClassName(star)}
                    onMouseEnter={() => editable && setHoverRating(star)}
                    onMouseLeave={() => editable && setHoverRating(0)}
                    onClick={() => handleRatingChange(star)}
                />
            ))}
        </div>
    );
};