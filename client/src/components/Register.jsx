import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Mail, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import styles from './Register.module.css';

export default function Register() {
  const { eventName } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
      registrations.push({ name, email, event: eventName, date: new Date().toISOString() });
      localStorage.setItem("registrations", JSON.stringify(registrations));
      setIsSubmitting(false);
      navigate("/dashboard", { state: { showSuccess: true, eventName } });
    }, 1500);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className={`${styles.headerTitle} gradient-text`}>Event Registration</h1>
            <p className={styles.headerDescription}>Join us for an amazing experience!</p>
          </div>

          {/* Event Info */}
          <div className={styles.eventInfo}>
            <h2 className={styles.eventInfoTitle}>Registering for:</h2>
            <p className={`${styles.eventInfoName} gradient-text`}>{eventName}</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Full Name *
              </label>
              <div className={styles.inputContainer}>
                <User className={`h-5 w-5 ${styles.inputIcon}`} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className={styles.formGroup} style={{ animationDelay: '0.1s' }}>
              <label className={styles.label}>
                Email / Roll Number *
              </label>
              <div className={styles.inputContainer}>
                <Mail className={`h-5 w-5 ${styles.inputIcon}`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your email or roll number"
                />
              </div>
            </div>

            <div className={styles.formGroup} style={{ animationDelay: '0.2s' }}>
              <label className={styles.label}>
                Event Name
              </label>
              <div className={styles.inputContainer}>
                <Calendar className={`h-5 w-5 ${styles.inputIcon}`} />
                <input
                  type="text"
                  value={eventName}
                  readOnly
                  className={`${styles.input} ${styles.inputReadonly}`}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className={styles.termsNotice} style={{ animationDelay: '0.3s' }}>
              <CheckCircle className={`h-5 w-5 ${styles.termsIcon}`} />
              <div className={styles.termsContent}>
                <p className={styles.termsTitle}>Registration Terms</p>
                  <p>By registering, you agree to attend the event and follow all campus guidelines. Cancellation must be done 24 hours before the event.</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className={styles.formGroup} style={{ animationDelay: '0.4s' }}>
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
                    <span>Registering...</span>
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className={styles.helpText}>
            <p>Need help? Contact the event organizers or visit the help desk.</p>
          </div>
        </div>
      </div>
    </div>
  );
}