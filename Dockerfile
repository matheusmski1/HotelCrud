FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#Valor default que pode ser substituído 
ENV PORT 5000 

EXPOSE $PORT

CMD [ "npm", "run", "prod" ]