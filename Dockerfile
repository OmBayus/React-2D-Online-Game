FROM node

EXPOSE 80

WORKDIR /usr/src/app

COPY ./server/ .
RUN npm install

ENTRYPOINT ["npm", "start"]