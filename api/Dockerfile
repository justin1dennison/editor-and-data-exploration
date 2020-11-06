FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn 

COPY . .

RUN apt update && apt upgrade -y
RUN apt install pandoc texlive texlive-latex-extra -y
RUN apt install openjdk-8-jdk -y

EXPOSE 5000
CMD [ "npm", "start"]
