FROM node:18

WORKDIR /app

COPY . .

CMD ["node", "backend/app.js"]
