import React, { useState, FocusEvent } from "react";
import classes from "./InputEmailComponent.module.scss";

interface InputEmailComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: { message: string }; // erro recebido do componente pai
}

// Função simples para verificar se o e-mail tem formato válido
const isValidEmail = (email: string): boolean => {
  // Regex genérica que checa <texto>@<texto>.<texto>
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

  // Ao sair do campo (blur), validamos o e-mail
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    // Se estiver vazio, você pode decidir não exibir erro. Ajuste conforme regra:
    if (e.target.value && !isValidEmail(e.target.value)) {
      setLocalError("Endereço de e-mail inválido.");
    } else {
      setLocalError(undefined);
    }

    // Se o pai também passou um onBlur, chamamos para não sobrescrever
    if (onBlur) onBlur(e);
  };

  // Define a mensagem final de erro (prioriza a do pai, se existir)
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
