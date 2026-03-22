cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "backend/app.js"]
EOF
