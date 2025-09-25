import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState("student"); // student or organizer
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (userType === "organizer") {
        // Store organizer login state
        localStorage.setItem("userType", "organizer");
        navigate("/organizer-dashboard");
      } else {
        // Store student login state
        localStorage.setItem("userType", "student");
        navigate("/dashboard");
      }
      setIsSubmitting(false);
      setEmail("");
      setPassword("");
    }, 1500);
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

            <div className={styles.formGroup} style={{ animationDelay: '0.1s' }}>
              <label className={styles.label}>
                Password *
              </label>
              <div className={styles.inputContainer}>
                <Lock className={`h-5 w-5 ${styles.inputIcon}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.input} ${styles.inputWithButton}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.toggleButton}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
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