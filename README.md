# BuildServer

## Запуск

1. Скачать этот репозиторий

2. Чтобы запустить CI сервер - `cd server && npm ci && npm start`

3. Чтобы запустить агента - `cd agent && npm ci && npm start`

##  CI сервер

Сервер запускается на том хосте и порте, который указан в конфигурации

Однако функционал обновления настроек и добавления билдов в очередь строится на том,
что [node api](https://github.com/Super-Cereal/CiServer)
делает запросы к этому серверу. 

Поэтому хост и порт лучше не менять, либо менять еще и соответсвующие поля в файле конфигурации [node api](https://github.com/Super-Cereal/CiServer)

## Агенты

Агент запускается на хосте 127.0.0.1 и порту, который указан в файле конфигурации.

....докер бы плодкючить сюда