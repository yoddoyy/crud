FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY . /
RUN npm install --production 
COPY . .
EXPOSE 3001
CMD ["yarn", "devStart"]