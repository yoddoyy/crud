FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY . /
RUN npm install --production 
COPY . .
EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
CMD ["yarn", "start"]