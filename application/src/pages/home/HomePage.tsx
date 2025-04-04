import { ChangeEvent, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import InputTextComponent from "../../components/InputTextComponent/InputTextComponent";
import styles from "./HomePage.module.scss";

interface User {
  name: string;
  cpf: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const HomePage = () => {
  const { get: getLocalStorage, set: setLocalStorage } = useLocalStorage(
    "formulario_tinnova",
    []
  );
  const [data, setData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_MOCK}/users`);
      if (response.ok) {
        const dataFromAPI = await response.json();
        setData(dataFromAPI);
        setLocalStorage(dataFromAPI);
      } else {
        console.error("Erro ao buscar dados da API");
      }
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    }
  };

  useEffect(() => {
    const storedData = getLocalStorage();
    if (storedData && storedData.length > 0) {
      setData(storedData);
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (item: User) => {
    setEditData(item);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    setLocalStorage(updatedData);
  };

  const validateEditData = (data: User): FormErrors => {
    const errors: FormErrors = {};
    if (!data.name || data.name.trim().length < 3) {
      errors.name = "Nome deve ter pelo menos 3 caracteres e ser preenchido.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email.trim())) {
      errors.email = "E-mail deve ser válido e preenchido.";
    }
    if (!data.phone || data.phone.trim() === "") {
      errors.phone = "Telefone é obrigatório.";
    }
    return errors;
  };

  const handleSaveEdit = () => {
    if (!editData) return;
    const validationErrors = validateEditData(editData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const updatedData = data.map((user) =>
      user.cpf === editData.cpf ? editData : user
    );
    setData(updatedData);
    setLocalStorage(updatedData);
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Listagem de Usuários</h1>
      </header>

      <ul className={styles.container}>
        {data.map((item, index) => (
          <li key={index} className={styles.list}>
            <span className={styles.list_item}>
              Nome: <strong>{item.name}</strong>
            </span>
            <span className={styles.list_item}>CPF: {item.cpf}</span>
            <span className={styles.list_item}>Telefone: {item.phone}</span>
            <span className={styles.list_item}>Email: {item.email}</span>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => handleEdit(item)}
                className={styles.edit_button}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(index)}
                className={styles.delete_button}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && editData && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Usuário</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <InputTextComponent
                value={editData.name}
                onChange={handleChange}
                label="Nome"
                id="name"
                name="name"
                error={errors.name ? { message: errors.name } : undefined}
              />
              <InputTextComponent
                value={editData.cpf}
                onChange={handleChange}
                label="CPF"
                id="cpf"
                name="cpf"
                disabled
              />
              <InputTextComponent
                value={editData.phone}
                onChange={handleChange}
                label="Telefone"
                id="phone"
                name="phone"
                error={errors.phone ? { message: errors.phone } : undefined}
              />
              <InputTextComponent
                value={editData.email}
                onChange={handleChange}
                label="E-mail"
                id="email"
                name="email"
                error={errors.email ? { message: errors.email } : undefined}
              />
              <div className={styles.modalButtonGroup}>
                <button type="submit">Salvar Alterações</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.delete_button}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
