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
  // Interceptamos o "onChange" para chamar blur() após alterar o valor
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Se houver um onChange vindo do pai, chamamos primeiro
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
        // Em vez de passar "onChange={onChange}", passamos "handleChange"
        onChange={handleChange}
        {...rest}
      />

      {error && <div className={classes.error}>{error.message}</div>}
    </div>
  );
};

export default InputTextComponent;
