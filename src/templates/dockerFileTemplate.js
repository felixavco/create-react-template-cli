const dockerFileTemplate = () => `FROM node:12

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.1

COPY /app/build/ /usr/share/nginx/html`;

export default dockerFileTemplate;