import React, {useState, CSSProperties} from 'react';
import {MapPin, Image as ImageIcon} from 'lucide-react';
import {Shelter, Feedback} from '../types/shelter';
import {StarRating} from './StarRating';
import {addFeedbackToShelter} from '../data/shelters';

const modalOverlayStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    zIndex: 1000
};

const modalContentStyle: CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    maxWidth: '42rem',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto'
};

const modalHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
};

const modalTitleStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold'
};

const modalCloseButtonStyle: CSSProperties = {
    color: '#EF4444',
    fontWeight: 'bold'
};

const shelterImageStyle: CSSProperties = {
    width: '100%',
    height: '16rem',
    objectFit: 'cover',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem'
};

const shelterLocationStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const shelterAddressStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center'
};

const shelterDescriptionStyle: CSSProperties = {
    marginTop: '0.5rem'
};

const feedbackSectionStyle: CSSProperties = {
    marginBottom: '1rem'
};

const feedbackTitleStyle: CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
};

const feedbackListItemStyle: CSSProperties = {
    borderBottom: '1px solid #e0e0e0',
    padding: '0.5rem 0'
};

const feedbackHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between'
};

const feedbackFormStyle: CSSProperties = {
    borderTop: '1px solid #e0e0e0',
    paddingTop: '1rem'
};

const feedbackInputStyle: CSSProperties = {
    width: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '0.25rem',
    padding: '0.5rem'
};

const feedbackSubmitButtonStyle: CSSProperties = {
    backgroundColor: '#22C55E',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem'
};

interface ShelterDetailsModalProps {
    shelter: Shelter;
    onClose: () => void;
}

interface NewFeedback {
    rating: number;
    comment: string;
    image?: File | null;
}

export const ShelterDetailsModal: React.FC<ShelterDetailsModalProps> = ({
                                                                            shelter,
                                                                            onClose
                                                                        }) => {
    const [newFeedback, setNewFeedback] = useState<NewFeedback>({
        rating: 0,
        comment: '',
        image: null
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault();

        if (newFeedback.rating === 0 || newFeedback.comment.trim() === '') {
            setFeedbackMessage({type: 'error', text: 'Please provide both a rating and a comment.'});
            return;
        }

        const feedbackToSubmit: Omit<Feedback, 'id'> = {
            user: 'Користувач',
            rating: newFeedback.rating,
            comment: newFeedback.comment,
            imageUrl: previewImage ?? undefined
        };

        addFeedbackToShelter(shelter.id, feedbackToSubmit);

        setNewFeedback({rating: 0, comment: '', image: null});
        setPreviewImage(null);

        setFeedbackMessage({type: 'success', text: 'Feedback submitted successfully!'});
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={modalHeaderStyle}>
                    <h1 style={modalTitleStyle}>{shelter.name}</h1>
                    <button
                        onClick={onClose}
                        style={modalCloseButtonStyle}
                    >
                        Close
                    </button>
                </div>

                <div>
                    <img
                        src={shelter.photoUrl}
                        alt={shelter.name}
                        style={shelterImageStyle}
                    />
                    <div style={shelterLocationStyle}>
                        <div style={shelterAddressStyle}>
                            <MapPin size={20} style={{marginRight: '0.5rem', color: '#4B5563'}}/>
                            <p>{shelter.address}</p>
                        </div>
                        <StarRating rating={shelter.rating}/>
                    </div>
                    <p style={shelterDescriptionStyle}>{shelter.description}</p>
                </div>

                <div style={feedbackSectionStyle}>
                    <h2 style={feedbackTitleStyle}>User Feedback</h2>
                    {shelter.feedback.length === 0 ? (
                        <p>No feedback yet. Be the first to review!</p>
                    ) : (
                        shelter.feedback.map(feedback => (
                            <div key={feedback.id} style={feedbackListItemStyle}>
                                <div style={feedbackHeaderStyle}>
                                    <p>{feedback.user}</p>
                                    <StarRating rating={feedback.rating}/>
                                </div>
                                <p>{feedback.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleSubmitFeedback} style={feedbackFormStyle}>
                    <h2 style={feedbackTitleStyle}>Leave Your Feedback</h2>
                    <div style={{marginBottom: '0.5rem'}}>
                        <label style={{display: 'block', marginBottom: '0.25rem'}}>Your Rating</label>
                        <StarRating
                            rating={newFeedback.rating}
                            editable
                            onRatingChange={(rating) => setNewFeedback(prev => ({...prev, rating}))}
                        />
                    </div>
                    <div style={{marginBottom: '0.5rem'}}>
                        <label style={{display: 'block', marginBottom: '0.25rem'}}>Your Feedback</label>
                        <textarea
                            value={newFeedback.comment}
                            onChange={(e) => setNewFeedback(prev => ({...prev, comment: e.target.value}))}
                            style={feedbackInputStyle}
                            rows={4}
                            placeholder="Share your experience with this shelter..."
                        />
                    </div>
                    <div style={{marginBottom: '0.5rem'}}>
                        <label
                            htmlFor="imageUpload"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginBottom: '0.25rem'
                            }}
                        >
                            <ImageIcon size={16} style={{marginRight: '0.5rem'}}/>
                            Upload Image (Optional)
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{display: 'none'}}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{
                                    maxWidth: '200px',
                                    maxHeight: '200px',
                                    marginTop: '0.5rem',
                                    borderRadius: '0.25rem'
                                }}
                            />
                        )}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <button
                            type="submit"
                            style={feedbackSubmitButtonStyle}
                        >
                            Submit Feedback
                        </button>
                        {feedbackMessage && (
                            <label style={{color: feedbackMessage.type === 'success' ? 'green' : 'red'}}>
                                {feedbackMessage.text}
                            </label>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};