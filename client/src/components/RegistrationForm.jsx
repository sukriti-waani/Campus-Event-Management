import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import styles from "./RegistrationForm.module.css";
import { Button, Input, Modal } from "./ui";

const RegistrationForm = ({ isOpen, onClose, event }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    department: "",
    year: "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      showToast("Please fix all errors before submitting", "danger");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const registrationData = {
        ...formData,
        eventId: event.id,
        eventTitle: event.title,
        registrationDate: new Date().toISOString(),
      };

      const existingRegistrations = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
      existingRegistrations.push(registrationData);
      localStorage.setItem("eventRegistrations", JSON.stringify(existingRegistrations));

      showToast(`Successfully registered for ${event.title}!`, "success");

      setFormData({
        fullName: "",
        rollNumber: "",
        department: "",
        year: "",
        email: user?.email || "",
      });

      onClose();
    } catch (error) {
      showToast("Registration failed. Please try again.", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      rollNumber: "",
      department: "",
      year: "",
      email: user?.email || "",
    });
    setErrors({});
    onClose();
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Register for ${event.title}`}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <div className={styles.formGroup}>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            touched={!!errors.fullName}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <Input
              id="rollNumber"
              name="rollNumber"
              type="text"
              label="Roll Number"
              placeholder="e.g., 2021CS001"
              value={formData.rollNumber}
              onChange={handleChange}
              error={errors.rollNumber}
              touched={!!errors.rollNumber}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              id="year"
              name="year"
              type="text"
              label="Year"
              placeholder="e.g., 3rd Year"
              value={formData.year}
              onChange={handleChange}
              error={errors.year}
              touched={!!errors.year}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <Input
            id="department"
            name="department"
            type="text"
            label="Department / Branch"
            placeholder="e.g., Computer Science"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
            touched={!!errors.department}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            touched={!!errors.email}
            required
          />
        </div>

        <div className={styles.formActions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RegistrationForm;
