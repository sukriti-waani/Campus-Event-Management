import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import styles from "./CreateEventForm.module.css";
import { Button, Input, Modal } from "./ui";

const CreateEventForm = ({ isOpen, onClose, onEventCreated, editingEvent = null }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState(
    editingEvent || {
      title: "",
      date: "",
      time: "",
      location: "",
      category: "Academic",
      description: "",
      imageUrl: "",
      maxAttendees: 100,
    }
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Academic", "Social", "Sports", "Arts & Culture", "Technology", "Cultural"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.time.trim()) {
      newErrors.time = "Event time is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    if (!formData.maxAttendees || formData.maxAttendees < 1) {
      newErrors.maxAttendees = "Max attendees must be at least 1";
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

      const eventData = {
        ...formData,
        id: editingEvent?.id || `e${Date.now()}`,
        organizer: {
          id: user.id,
          name: user.email,
        },
        maxAttendees: parseInt(formData.maxAttendees),
      };

      onEventCreated(eventData);

      showToast(
        editingEvent ? "Event updated successfully!" : "Event created successfully!",
        "success"
      );

      handleClose();
    } catch (error) {
      showToast("Operation failed. Please try again.", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "Academic",
      description: "",
      imageUrl: "",
      maxAttendees: 100,
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingEvent ? "Edit Event" : "Create New Event"}
    >
      <form onSubmit={handleSubmit} className={styles.createEventForm}>
        <div className={styles.formGroup}>
          <Input
            id="title"
            name="title"
            type="text"
            label="Event Title"
            placeholder="e.g., Annual Tech Conference"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            touched={!!errors.title}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <Input
              id="date"
              name="date"
              type="date"
              label="Event Date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              touched={!!errors.date}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              id="time"
              name="time"
              type="time"
              label="Event Time"
              value={formData.time}
              onChange={handleChange}
              error={errors.time}
              touched={!!errors.time}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <Input
            id="location"
            name="location"
            type="text"
            label="Location"
            placeholder="e.g., Campus Auditorium"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            touched={!!errors.location}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <Input
              id="maxAttendees"
              name="maxAttendees"
              type="number"
              label="Max Attendees"
              placeholder="100"
              value={formData.maxAttendees}
              onChange={handleChange}
              error={errors.maxAttendees}
              touched={!!errors.maxAttendees}
              required
              min="1"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            label="Event Image URL"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
            touched={!!errors.imageUrl}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Event Description <span className={styles.required}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Provide a detailed description of the event..."
            value={formData.description}
            onChange={handleChange}
            className={`${styles.textarea} ${errors.description ? styles.error : ""}`}
            required
          />
          {errors.description && (
            <span className={styles.errorText}>{errors.description}</span>
          )}
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? editingEvent
                ? "Updating..."
                : "Creating..."
              : editingEvent
              ? "Update Event"
              : "Create Event"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEventForm;
