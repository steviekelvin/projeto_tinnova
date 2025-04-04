import React, { ChangeEvent } from "react";
import classes from "./InputTextComponent.module.scss";

interface InputTextComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: {
    message: string;
  };
}

const InputTextComponent: React.FC<InputTextComponentProps> = ({
  id,
  label,
  error,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={classes.container}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>

      <input
        id={id}
        type="text"
        className={`${classes.input} ${error ? classes.invalid : ""}`}
        onChange={handleChange}
        {...rest}
      />

      {error && <div className={classes.error}>{error.message}</div>}
    </div>
  );
};

export default InputTextComponent;
