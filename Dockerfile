FROM node:16-slim

EXPOSE 3000

ENV MONGO_URL "mongodb://mongo:27017/ehrs"


RUN mkdir /app && chown -R node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package.json ./

RUN npm install --only=prod && npm cache clean --force

COPY --chown=node:node . .

CMD ["npm", "start"]