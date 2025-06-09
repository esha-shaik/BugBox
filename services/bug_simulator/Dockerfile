FROM node:18
WORKDIR /app
COPY app.js .
RUN npm init -y && npm install express
EXPOSE 5001
CMD ["node", "app.js"]
