import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      localStorage.setItem("userType", userType);
      localStorage.setItem("userEmail", email);

      showToast(`Welcome back! Logged in as ${userType}`, 'success');

      if (userType === "organizer") {
        navigate("/organizer-dashboard");
      } else {
        navigate("/dashboard");
      }

      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className={styles.headerTitle}>Welcome Back</h1>
            <p className={styles.headerDescription}>Sign in to your account to continue</p>
          </div>

          {/* User Type Selection */}
          <div className={styles.userTypeSection}>
            <label className={styles.label}>Login as:</label>
            <div className={styles.userTypeButtons}>
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`${styles.userTypeButton} ${userType === "student" ? styles.userTypeButtonActive : ""}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType("organizer")}
                className={`${styles.userTypeButton} ${userType === "organizer" ? styles.userTypeButtonActive : ""}`}
              >
                Organizer
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email / Roll Number *
              </label>
              <div className={styles.inputContainer}>
                <Mail className={`h-5 w-5 ${styles.inputIcon}`} aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`${styles.input} ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email or roll number"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.formGroup} style={{ animationDelay: '0.1s' }}>
              <label htmlFor="password" className={styles.label}>
                Password *
              </label>
              <div className={styles.inputContainer}>
                <Lock className={`h-5 w-5 ${styles.inputIcon}`} aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  className={`${styles.input} ${styles.inputWithButton} ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.toggleButton}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={styles.formOptions} style={{ animationDelay: '0.2s' }}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                />
                <span className={styles.checkboxLabel}>Remember me</span>
              </label>
              <button
                type="button"
                className={styles.forgotPassword}
              >
                Forgot password?
              </button>
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  `Sign In as ${userType === "organizer" ? "Organizer" : "Student"}`
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine}>
              <div className={styles.dividerBorder}>
                <div className={styles.dividerBorderLine}></div>
              </div>
              <div className={styles.dividerContent}>
                <span className={styles.dividerText}>Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className={styles.signupSection} style={{ animationDelay: '0.4s' }}>
            <button className={styles.signupButton}>
              <UserPlus className="h-5 w-5" />
              <span>Create New Account</span>
            </button>
          </div>

          {/* Help Text */}
          <div className={styles.helpText}>
            <p>Having trouble signing in? Contact support for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}