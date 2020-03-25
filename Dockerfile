FROM node:12-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache --virtual .gyp python make g++

RUN chown -R node:node $HOME
USER node

ENV HOME=/home/node

WORKDIR $HOME
COPY . $HOME/

RUN npm ci --quiet
RUN npm run build

ENV HOST 0.0.0.0

CMD ["npm", "start"]
