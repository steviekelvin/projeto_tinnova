import styles from "./ButtonComponent.module.scss";

import { MouseEventHandler } from "react";

const ButtonComponent = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  ...props
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  [key: string]: any;
}) => {
  // Define as classes com base no estado do botão
  const getButtonClass = () => {
    if (disabled) return `${styles.button} ${styles.disabled}`;
    if (loading) return `${styles.button} ${styles.loading}`;
    return `${styles.button} ${styles.enabled}`;
  };

  return (
    <button
      className={getButtonClass()}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <div className="spinner" />
      ) : (
        <span className="button-label">{children}</span>
      )}
    </button>
  );
};

export default ButtonComponent;
