FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 5001

ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "npm", "run", "dev" ]