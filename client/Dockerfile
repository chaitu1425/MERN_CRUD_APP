FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL
RUN npm run build

EXPOSE 5173
CMD [ "npm", "run", "preview" ]
