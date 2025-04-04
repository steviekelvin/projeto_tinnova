# Projeto Tinnova 🚀

Este projeto é uma aplicação em **React** com **Vite**, configurada para rodar via **Docker**. As instruções abaixo detalham os passos para instalar as dependências, configurar o ambiente e levantar a aplicação.

---

## Pré-requisitos 📦

- [Docker](https://docs.docker.com/get-docker/) instalado 🐳
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente incluso no Docker)
- Git

---

## Passo a Passo 🛠️

### 1. Clonar o Repositório

No terminal, clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/steviekelvin/projeto_tinnova
cd projeto_tinnova
```

### 2. Configurar o Git (se necessário)

Caso o comando `git pull` retorne mensagem de *tracking branch* inexistente, configure o branch com:

```bash
git branch --set-upstream-to=origin/main main
```

Ou, para puxar diretamente do branch principal:

```bash
git pull origin main
```

### 3. Criar o Arquivo **.env**

Na raiz do projeto, crie o arquivo **.env** com os seguintes valores:

```dotenv
APP_PORT=3000
NODE_ENV=production
VITE_URL_MOCK=https://private-9d65b3-tinnova.apiary-mock.com
```

### 4. Instalação de dependências e levante do Projeto

Para iniciar a aplicação, execute:

```bash
docker-compose up --build 
```

O Docker Compose construirá e levantará os containers, fazendo a instalação das dependências necessárias. Após a inicialização, a aplicação estará disponível em [http://localhost:3000](http://localhost:3000) *(verifique a porta definida no `APP_PORT` em seu .env se necessário)*.

---

## Estrutura do Projeto 📂

- **`docker-compose.yml`**: Configuração dos serviços e containers.
- **`application/`**: Diretório que contém a aplicação React, o `Dockerfile` e demais arquivos do projeto.
- **`node_modules/`**: Pasta gerada após a instalação das dependências.
- **Outros Arquivos**: `.env`, `.gitignore`, etc.

---

## Comandos Úteis ⚙️

- **Parar os Containers:**

  ```bash
  docker-compose down
  ```

- **Rebuild dos Containers (caso haja alterações na configuração ou dependências):**

  ```bash
  docker-compose up --build
  ```

---

## Problemas Comuns ❗

- **Mensagem de Git sem tracking branch:**  
  Caso apareça *"There is no tracking information for the current branch..."*, configure o branch com:

  ```bash
  git branch --set-upstream-to=origin/main main
  ```

- **Dependências não instaladas:**  
  Certifique-se de executar o `npm install` (dentro do container ou localmente) e que a versão do Node seja compatível com o projeto.

---

Em caso de dúvidas, consulte a [documentação do Docker](https://docs.docker.com/) e do [Vite](https://vitejs.dev/).

---

<div align="center">
  <sub>Desenvolvido com 💜 por Stevie Kelvin </sub>
</div>
