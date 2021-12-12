# To build and publish:
# docker build -t registry.home.blyberg.net/jb-api -t registry.home.blyberg.net/jb-api:1.0 .
# docker push registry.home.blyberg.net/jb-api; docker push registry.home.blyberg.net/jb-api:1.0

# Builder Stage
FROM node:lts as builder
WORKDIR /app
RUN mkdir /app/config
COPY package.json tsconfig.json tsconfig.build.json yarn.lock nest-cli.json ./
COPY src/ src/
COPY config/default.yml config/default.yml
COPY config/production.yml config/production.yml
RUN yarn install
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

# Production Stage
FROM node:lts as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/config ./config
EXPOSE 3000
CMD ["yarn", "start:prod"]