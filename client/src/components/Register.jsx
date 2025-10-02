import { useState } from "react";
import { FaUserPlus } from "react-icons/fa"; // For a register icon
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import styles from "./Register.module.css";
import { Button, Card, Input } from "./ui";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!role) {
      newErrors.role = "Role is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      role: true,
    }); // Mark all fields as touched

    if (!validate()) {
      showToast("Please fix the errors in the form.", "danger");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password, role);
      showToast("Registration successful! You are now logged in.", "success");
      navigate("/"); // Redirect to home or dashboard after successful registration
    } catch (err) {
      showToast(err.message, "danger");
      setErrors((prev) => ({ ...prev, general: err.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <Card className={styles.registerCard}>
        <h1 className={styles.title}>
          <FaUserPlus className={styles.icon} aria-hidden="true" /> Register
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoComplete="email"
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoComplete="new-password"
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleBlur("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            autoComplete="new-password"
          />

          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>
              Register as:
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setErrors((prev) => ({ ...prev, role: undefined })); // Clear error on change
              }}
              onBlur={handleBlur("role")}
              className={`${styles.select} ${
                touched.role && errors.role ? styles.inputError : ""
              }`}
              aria-invalid={touched.role && errors.role ? "true" : "false"}
              aria-describedby={
                touched.role && errors.role ? "role-error" : undefined
              }
            >
              <option value="student">Student</option>
              <option value="organizer">Event Organizer</option>
            </select>
            {touched.role && errors.role && (
              <p id="role-error" className={styles.errorMessage} role="alert">
                {errors.role}
              </p>
            )}
          </div>

          {errors.general && (
            <p className={styles.generalError} role="alert">
              {errors.general}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
