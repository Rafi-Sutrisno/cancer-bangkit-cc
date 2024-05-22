FROM node:18
WORKDIR /app
COPY . .
COPY .env .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]