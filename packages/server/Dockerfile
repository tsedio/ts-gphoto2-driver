###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2021-04-14                                              ##
## version         : 1.1                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
FROM node:12-alpine

RUN apk update && apk add build-base git python

COPY package.json .
COPY yarn.lock .
COPY ./src ./src
COPY ./dist ./dist
COPY ./views ./views

RUN yarn install --production

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["yarn", "start:prod"]
