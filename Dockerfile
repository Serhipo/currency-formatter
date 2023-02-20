FROM node:13.12.0-alpine
WORKDIR /react-docker
COPY ./package*.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true