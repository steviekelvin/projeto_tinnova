import React, { ChangeEvent } from "react";
import classes from "./InputTelComponent.module.scss";

interface InputTelComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: { message: string };
}

/**
 * Função que formata o telefone:
 * - (XX) XXXX-XXXX para 10 dígitos
 * - (XX) XXXXX-XXXX para 11 dígitos
 */
const formatPhoneNumber = (inputValue: string) => {
  const digits = inputValue.replace(/\D/g, "");
  if (!digits) return "";

  // Telefones com DDD:
  // - Se 10 dígitos -> (XX) XXXX-XXXX
  // - Se 11 dígitos -> (XX) XXXXX-XXXX
  if (digits.length <= 2) {
    return `(${digits}`;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
};

const InputTelComponent: React.FC<InputTelComponentProps> = ({
  id,
  label,
  error,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, "");
    const fieldName = e.target.name; 

    if (onChange) {
      const syntheticEvent: ChangeEvent<HTMLInputElement> = {
        ...e,
        target: {
          ...e.target,
          name: fieldName,
          value: rawDigits,
        },
      };
      onChange(syntheticEvent);
    }
  };

  const displayedValue = formatPhoneNumber(String(rest.value || ""));

  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}:
      </label>
      <input
        {...rest}
        id={id}
        type="tel"
        maxLength='15'
        value={displayedValue}
        onChange={handleChange}
        className={classes.input}
      />
      {error && <div className={classes.error}>{error.message}</div>}
    </div>
  );
};

export default InputTelComponent;
