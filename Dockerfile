FROM node

EXPOSE 80

WORKDIR /usr/src/app

COPY . .
RUN cd client && npm install && npm run build
RUN mv /usr/src/app/client/build /usr/src/app/server
RUN cd server && npm install

WORKDIR /usr/src/app/server

ENTRYPOINT ["npm", "start"]