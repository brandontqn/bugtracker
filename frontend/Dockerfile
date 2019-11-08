# base image
FROM node:10.16.3 as build

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.16

# add app
COPY . /app

RUN ng build --output-path=dist

EXPOSE 80

# FROM nginx:1.16.0-alpine as publish
# FROM nginx:alpine as publish
# FROM build as publish

# COPY --from=build /app/dist /usr/share/nginx/html
# COPY --from=build /app/dist

# EXPOSE 80

# CMD ["nginx", "-g", "daemon on;"]
# start app
# CMD ["ng", "serve", "--host", "0.0.0.0"]
