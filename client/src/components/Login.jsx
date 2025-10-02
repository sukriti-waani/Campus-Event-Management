import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa"; // For a login icon
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import styles from "./Login.module.css";
import { Button, Card, Input } from "./ui";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
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
    setTouched({ email: true, password: true }); // Mark all fields as touched on submit

    if (!validate()) {
      showToast("Please fix the errors in the form.", "danger");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast("Logged in successfully!", "success");
      navigate(from, { replace: true }); // Redirect to the page they were trying to access
    } catch (err) {
      showToast(err.message, "danger");
      setErrors((prev) => ({ ...prev, general: err.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Card className={styles.loginCard}>
        <h1 className={styles.title}>
          <FaSignInAlt className={styles.icon} aria-hidden="true" /> Login
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
            autoComplete="current-password"
          />
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
            {isSubmitting ? "Logging In..." : "Login"}
          </Button>
        </form>
        <p className={styles.registerLink}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
