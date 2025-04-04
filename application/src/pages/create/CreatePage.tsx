import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import InputTextComponent from "../../components/InputTextComponent/InputTextComponent";
import InputCpfComponent from "../../components/inputCpfComponent.tsx/InputCpfComponent";
import InputTelComponent from "../../components/inputTelComponent/InputTelComponent";

interface User {
  name: string;
  cpf: string;
  phone: string;
  email: string;
}

// Estendemos o tipo de `errors` para incluir todos os campos:
interface Errors {
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
}

const CreatePage = () => {
  const navigate = useNavigate();
  const { get: getLocalStorage, set: setLocalStorage } = useLocalStorage(
    "formulario_tinnova",
    []
  );

  const [user, setUser] = useState<User>({
    name: "",
    cpf: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  // 1. Validação de Nome
  const validateName = (value: string) => {
    if (value.trim().length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "O nome deve ter no mínimo 3 caracteres.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  // 2. Validação de CPF
  const validateCPF = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 11) {
      setErrors((prev) => ({
        ...prev,
        cpf: "CPF deve ter no mínimo 11 dígitos.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, cpf: undefined }));
    }
  };

  // 3. Validação de Telefone
  // Ex: exige no mínimo 10 dígitos (fixo) ou 11 (celular).
  const validatePhone = (value: string) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) {
      setErrors((prev) => ({
        ...prev,
        phone: "Telefone deve ter pelo menos 10 dígitos (incluindo DDD).",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  // 4. Validação de E-mail
  // Regex simples: texto@texto.texto
  const validateEmail = (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value.trim())) {
      setErrors((prev) => ({
        ...prev,
        email: "Formato de e-mail inválido (ex: nome@provedor.com).",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Chamada principal do onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        validateName(value);
        break;
      case "cpf":
        validateCPF(value);
        break;
      case "phone":
        validatePhone(value);
        break;
      case "email":
        validateEmail(value);
        break;
      default:
        break;
    }
  };

  // Validação final ao submeter
  const handleSubmit = () => {
    // Checagem final de nome
    if (user.name.trim().length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "O nome deve ter no mínimo 3 caracteres.",
      }));
      return;
    }
    // CPF
    if (user.cpf.trim().replace(/\D/g, "").length < 11) {
      setErrors((prev) => ({
        ...prev,
        cpf: "CPF deve ter no mínimo 11 dígitos.",
      }));
      return;
    }
    // Telefone
    if (user.phone.trim().replace(/\D/g, "").length < 10) {
      setErrors((prev) => ({
        ...prev,
        phone: "Telefone deve ter pelo menos 10 dígitos.",
      }));
      return;
    }
    // E-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email.trim())) {
      setErrors((prev) => ({
        ...prev,
        email: "Formato de e-mail inválido (ex: nome@provedor.com).",
      }));
      return;
    }

    // Se chegou até aqui, está tudo válido
    const storedData = getLocalStorage();
    const newData = [...storedData, user];
    setLocalStorage(newData);
    navigate("/");
  };

  return (
    <div className="m-1">
      <h1>Cadastrar Usuário</h1>

      <div>
        <InputTextComponent
          value={user.name}
          onChange={handleChange}
          label="Nome completo (sem abreviações)"
          id="name"
          name="name"
          error={errors.name ? { message: errors.name } : undefined}
        />
      </div>

      <div>
        <InputCpfComponent
          id="cpf"
          label="CPF"
          name="cpf"
          value={user.cpf}
          onChange={handleChange}
          error={errors.cpf ? { message: errors.cpf } : undefined}
        />
      </div>

      <div>
        <InputTelComponent
          value={user.phone}
          onChange={handleChange}
          label="Telefone"
          id="phone"
          name="phone"
          error={errors.phone ? { message: errors.phone } : undefined}
        />
      </div>

      <div>
        <InputTextComponent
          value={user.email}
          onChange={handleChange}
          label="E-mail"
          id="email"
          name="email"
          error={errors.email ? { message: errors.email } : undefined}
        />
      </div>

      <ButtonComponent type="button" onClick={handleSubmit}>
        Salvar
      </ButtonComponent>
    </div>
  );
};

export default CreatePage;
