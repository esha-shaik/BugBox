FROM node:20
WORKDIR /app
COPY app.js .
RUN npm init -y && npm install express prom-client
CMD ["node", "app.js"]
