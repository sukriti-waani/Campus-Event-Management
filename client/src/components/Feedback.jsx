import { useState } from "react";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";
import styles from './Feedback.module.css';

export default function Feedback() {
  const [eventName, setEventName] = useState("");
  const [rating, setRating] = useState(5);
  const [suggestions, setSuggestions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setEventName("");
        setRating(5);
        setSuggestions("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  }

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={styles.starButton}
          >
            <Star className={`${styles.starIcon} ${star <= rating ? styles.starIconActive : ''}`} />
          </button>
        ))}
        <span className={styles.ratingText}>
          {rating} star{rating !== 1 ? 's' : ''}
        </span>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successWrapper}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckCircle className="h-8 w-8 text-success-600" />
            </div>
            <h2 className={styles.successTitle}>Thank You!</h2>
            <p className={styles.successText}>
              Your feedback has been submitted successfully. We appreciate your input and will use it to improve future events.
            </p>
            <div className={styles.successStatus}>
              <div className={styles.successDot}></div>
              <span className={styles.successStatusText}>Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className={styles.headerTitle}>Submit Feedback</h1>
          <p className={styles.headerDescription}>Help us improve by sharing your experience</p>
        </div>

        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Event Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Which event are you providing feedback for? *
              </label>
              <select
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className={styles.select}
              >
                <option value="">Select an event</option>
                <option value="TechFest 2025">TechFest 2025</option>
                <option value="Cultural Night">Cultural Night</option>
                <option value="Sports Meet">Sports Meet</option>
              </select>
            </div>

            {/* Rating */}
            <div className={styles.formGroup} style={{ animationDelay: '0.1s' }}>
              <label className={styles.label}>
                How would you rate this event? *
              </label>
              <div className={styles.ratingContainer}>
                <div className={styles.ratingRow}>
                <StarRating rating={rating} onRatingChange={setRating} />
                  <div className={styles.ratingFeedback}>
                    <p className={styles.ratingFeedbackText}>
                    {rating === 5 && "Excellent! 🎉"}
                    {rating === 4 && "Very Good! 👍"}
                    {rating === 3 && "Good 👌"}
                    {rating === 2 && "Fair 😐"}
                    {rating === 1 && "Needs Improvement 😔"}
                  </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className={styles.formGroup} style={{ animationDelay: '0.2s' }}>
              <label className={styles.label}>
                Your suggestions and comments
              </label>
              <textarea
                rows="6"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className={styles.textarea}
                placeholder="Tell us what you liked, what could be improved, or any other feedback you'd like to share..."
              />
              <p className={styles.textareaHelp}>
                Your feedback helps us create better events for everyone!
              </p>
            </div>

            {/* Submit Button */}
            <div className={styles.formGroup} style={{ animationDelay: '0.3s' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${
                  isSubmitting
                    ? styles.submitButtonDisabled
                    : styles.submitButtonNormal
                }`}
              >
                {isSubmitting ? (
                  <div className={styles.submitButtonContent}>
                    <div className={styles.spinner}></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className={styles.submitButtonContent}>
                    <Send className="h-5 w-5" />
                    <span>Submit Feedback</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className={styles.helpNotice}>
            <p className={styles.helpNoticeText}>
              <strong>💡 Tip:</strong> Your feedback is anonymous and helps us improve future events. 
              Be honest and specific in your comments for the best results!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}