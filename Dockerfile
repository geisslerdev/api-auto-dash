# Usar imagem base do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo o código da API
COPY . .

# Expor a porta 3000 (API)
EXPOSE 3000

# Comando para rodar a API
CMD ["npm", "run", "dev"]
