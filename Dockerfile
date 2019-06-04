FROM mhart/alpine-node:base-10

WORKDIR /app
COPY . .

EXPOSE 3000

ENV DEBUG sc.*

CMD [ "node", "src/index.js" ]
