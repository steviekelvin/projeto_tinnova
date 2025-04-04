import React, { ChangeEvent } from "react";
import classes from "./InputCpfComponent.module.scss";

interface InputCpfComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: { message: string };
}

const formatCpf = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9
  )}-${digits.slice(9, 11)}`;
};

const InputCpfComponent: React.FC<InputCpfComponentProps> = ({
  id,
  label,
  error,
  onChange,
  ...rest
}) => {
  // Intercepta mudanças no input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Extrai apenas dígitos
    const digits = e.target.value.replace(/\D/g, "");
    // Preserva também o `target.name`
    const fieldName = e.target.name;

    if (onChange) {
      // Cria um evento sintético com o `value` "limpo" e o `name` preservado
      const syntheticEvent: ChangeEvent<HTMLInputElement> = {
        ...e,
        target: {
          ...e.target,
          value: digits,
          name: fieldName, // fundamental para o pai saber qual campo atualizar
        },
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={classes.inputWrapper}>
      <label htmlFor={id} className={classes.label}>
        {label}:
      </label>
      <input
        {...rest}
        type="text"
        id={id}
        // Aqui formatamos para exibir com pontos/hífens:
        value={formatCpf(String(rest.value || ""))}
        onChange={handleChange}
        className={`${classes.input} ${error ? classes.inputError : ""}`}
      />
      {error && <div className={classes.error}>{error.message}</div>}
    </div>
  );
};

export default InputCpfComponent;
