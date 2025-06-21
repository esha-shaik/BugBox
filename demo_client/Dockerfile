FROM node:20
WORKDIR /app
COPY client.js .
RUN npm init -y && npm install axios
CMD ["node", "client.js"]
