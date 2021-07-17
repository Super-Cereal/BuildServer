FROM ubuntu
WORKDIR /agent-container

ARG port=1000

COPY . .
RUN npm ci

EXPOSE ${port}

CMD npm start port=${port}
