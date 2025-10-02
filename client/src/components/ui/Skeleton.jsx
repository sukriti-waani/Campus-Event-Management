import styles from "./Skeleton.module.css";

const Skeleton = ({
  width,
  height,
  circle = false,
  className = "",
  ...props
}) => {
  const skeletonClass = `${styles.skeleton} ${styles.skeletonPulse} ${
    circle ? styles.circle : ""
  } ${className}`;

  return (
    <div
      className={skeletonClass}
      style={{ width, height }}
      aria-hidden="true" // Hide from screen readers
      {...props}
    ></div>
  );
};

export default Skeleton;
