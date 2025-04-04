# Use uma imagem leve do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Exponha a porta padrão do Vite (5173)
EXPOSE 5173

# Executa o servidor Vite configurando o host para 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host"]
