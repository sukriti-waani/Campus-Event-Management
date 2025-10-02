import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa"; // You'll need to install react-icons
import styles from "./Modal.module.css";

// Note: You'll need to install react-icons: `npm install react-icons`

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  ...props
}) => {
  const modalRef = useRef(null);

  // Close on Escape key press
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      document.addEventListener("keydown", handleKeyDown);
      // Focus on the modal for accessibility
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`${styles.modal} ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        ref={modalRef}
        tabIndex="-1" // Make it focusable
        {...props}
      >
        <div className={styles.modalHeader}>
          {title && (
            <h2 id="modal-title" className={styles.modalTitle}>
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body // Portal the modal to the body
  );
};

export default Modal;
