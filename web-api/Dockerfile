FROM node:20 as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine

ENV PORT=""

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .

RUN yarn install --production --frozen-lockfile

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]
