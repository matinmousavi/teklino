FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

EXPOSE 5001

# Set the entrypoint
ENTRYPOINT [ "./entrypoint.sh" ]

# The command that will be executed by the entrypoint
CMD [ "npm", "run", "dev" ]