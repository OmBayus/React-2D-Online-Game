FROM node

EXPOSE 80

WORKDIR /usr/src/app

COPY . .
RUN CD client && npm install && npm run build
RUN mv build ../server
RUN CD server && npm install

ENTRYPOINT ["npm", "start"]