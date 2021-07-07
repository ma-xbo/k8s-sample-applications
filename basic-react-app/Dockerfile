FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY public public
COPY src src

RUN npm start