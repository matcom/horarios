FROM docker.uclv.cu/node:16-alpine as build-stage

WORKDIR /usr/src/ui

COPY package*.json ./

RUN npm install yarn

RUN yarn install

COPY . .

RUN npm run build

FROM docker.uclv.cu/nginx as production-stage

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /usr/src/ui/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]