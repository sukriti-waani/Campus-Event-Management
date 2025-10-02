import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary', 'secondary', 'success', 'danger', 'outline', 'text'
  size = "md", // 'sm', 'md', 'lg'
  disabled = false,
  className = "",
  ariaLabel,
  ...props
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${
    disabled ? styles.disabled : ""
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
      aria-label={
        ariaLabel || (typeof children === "string" ? children : undefined)
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
