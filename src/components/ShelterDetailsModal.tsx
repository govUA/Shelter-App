import React, {useState, useCallback} from 'react';
import {MapPin, Image as ImageIcon} from 'lucide-react';
import {Shelter, Feedback} from '../types/shelter';
import {StarRating} from './StarRating';
import styles from './ShelterDetailsModal.module.css';

interface ShelterDetailsModalProps {
    shelter: Shelter;
    onClose: () => void;
    onFeedbackUpdate: (updatedShelter: Shelter) => void;
}

interface NewFeedback {
    rating: number;
    comment: string;
    image?: File | null;
}

export const ShelterDetailsModal: React.FC<ShelterDetailsModalProps> = ({
                                                                            shelter,
                                                                            onClose,
                                                                            onFeedbackUpdate
                                                                        }) => {
    const [newFeedback, setNewFeedback] = useState<NewFeedback>({
        rating: 0,
        comment: '',
        image: null
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const calculateNewAverageRating = useCallback((feedbackList: Feedback[]) => {
        const totalRating = feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0);
        return Number((totalRating / feedbackList.length).toFixed(1));
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewFeedback(prev => ({...prev, image: file}));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newFeedback.rating === 0 || newFeedback.comment.trim() === '') {
            setFeedbackMessage({
                type: 'error',
                text: 'Please provide both a rating and a comment.'
            });
            return;
        }

        const formData = new FormData();
        formData.append('user', 'User');
        formData.append('rating', newFeedback.rating.toString());
        formData.append('comment', newFeedback.comment);

        if (newFeedback.image) {
            formData.append('image', newFeedback.image);
        }

        try {
            const response = await fetch(`http://localhost:5000/shelters/${shelter.id}/feedback`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to submit feedback');

            const submittedFeedback = await response.json();

            const updatedFeedback = [...shelter.feedback, {...submittedFeedback, imageUrl: submittedFeedback.image_url}];
            const newAverageRating = calculateNewAverageRating(updatedFeedback);

            const updatedShelter: Shelter = {
                ...shelter,
                feedback: updatedFeedback,
                rating: newAverageRating
            };

            onFeedbackUpdate(updatedShelter);

            setNewFeedback({ rating: 0, comment: '', image: null });
            setPreviewImage(null);
            setFeedbackMessage({
                type: 'success',
                text: 'Feedback submitted successfully!'
            });
        } catch (error) {
            console.error(error);
            setFeedbackMessage({
                type: 'error',
                text: 'Error submitting feedback.'
            });
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>{shelter.name}</h1>
                    <button
                        onClick={onClose}
                        className={styles.modalCloseButton}
                    >
                        ❌
                    </button>
                </div>

                <div>
                    <img
                        src={shelter.photoUrl}
                        alt={shelter.name}
                        className={styles.shelterImage}
                    />
                    <div className={styles.shelterLocation}>
                        <div className={styles.shelterAddress}>
                            <MapPin size={20} className={styles.mapPinIcon}/>
                            <p>{shelter.address}</p>
                        </div>
                        <StarRating rating={shelter.rating}/>
                    </div>
                    <p className={styles.shelterDescription}>{shelter.description}</p>
                </div>

                <div className={styles.feedbackSection}>
                    <h2 className={styles.feedbackTitle}>User Feedback</h2>
                    {shelter.feedback.length === 0 ? (
                        <p>No feedback yet. Be the first to review!</p>
                    ) : (
                        shelter.feedback.map(feedback => (
                            <div key={feedback.id} className={styles.feedbackListItem}>
                                {feedback.imageUrl ? (
                                    <img
                                        src={`http://localhost:5000${feedback.imageUrl}`}
                                        alt="Feedback Photo"
                                        className={styles.feedbackImage}
                                    />
                                ) : null}
                                <div className={styles.feedbackHeader}>
                                    <p>{feedback.user}</p>
                                    <StarRating rating={feedback.rating}/>
                                </div>
                                <p>{feedback.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleSubmitFeedback} className={styles.feedbackForm}>
                    <h2 className={styles.feedbackTitle}>Leave Your Feedback</h2>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Your Rating</label>
                        <StarRating
                            rating={newFeedback.rating}
                            editable
                            onRatingChange={(rating) => setNewFeedback(prev => ({...prev, rating}))}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Your Feedback</label>
                        <textarea
                            value={newFeedback.comment}
                            onChange={(e) => setNewFeedback(prev => ({...prev, comment: e.target.value}))}
                            className={styles.feedbackInput}
                            rows={4}
                            placeholder="Share your experience with this shelter..."
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="imageUpload"
                            className={styles.imageUploadLabel}
                        >
                            <ImageIcon size={16} className={styles.imageIcon}/>
                            Upload Image (Optional)
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={styles.hidden}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className={styles.previewImage}
                            />
                        )}
                    </div>
                    <div className={styles.feedbackActions}>
                        <button
                            type="submit"
                            className={styles.feedbackSubmitButton}
                        >
                            Submit Feedback
                        </button>
                        {feedbackMessage && (
                            <label className={feedbackMessage.type === 'success' ? styles.successMessage : styles.errorMessage}>
                                {feedbackMessage.text}
                            </label>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};