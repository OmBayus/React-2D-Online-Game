FROM node

EXPOSE 80

WORKDIR /usr/src/app

COPY . .
RUN cd client && npm install && npm run build
RUN mv build ../server
RUN cd server && npm install

ENTRYPOINT ["npm", "start"]