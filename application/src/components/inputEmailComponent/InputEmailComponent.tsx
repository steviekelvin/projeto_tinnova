import React, { useState, FocusEvent } from "react";
import classes from "./InputEmailComponent.module.scss";

interface InputEmailComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: { message: string };
}


const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim());
};

const InputEmailComponent: React.FC<InputEmailComponentProps> = ({
  id,
  label,
  error,
  onBlur,
  ...rest
}) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined);


  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !isValidEmail(e.target.value)) {
      setLocalError("Endereço de e-mail inválido.");
    } else {
      setLocalError(undefined);
    }

    if (onBlur) onBlur(e);
  };

  const finalError = error?.message || localError;

  return (
    <div className={classes.container}>
      <label htmlFor={id} className={classes.label}>
        {label}:
      </label>
      <input
        {...rest}
        id={id}
        type="email"
        className={`${classes.input} ${finalError ? classes.invalid : ""}`}
        onBlur={handleBlur}
      />
      {finalError && <div className={classes.error}>{finalError}</div>}
    </div>
  );
};

export default InputEmailComponent;
