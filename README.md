# travis-ci-test

- Сборка образа Docker на основании текущего кода, настроек и окружения.

- Запуск nodemon NodeJS RestfulAPI
- Сборка билда client (React)
- Сборка билда cms (React)
- Запуск контейнеров docker compose

image Client (files inside image)
image Cms (files inside image)

- Тесты Travis CI
readme
fix 3

- Настроить dev и prod docker-compose
- Продакшн
    - По приходу коммита запускаем сборку образа docker-compose build
        и делаем новый образ Client c файлами внутри,
        с удалением папки node_modules
    - Запускаем docker-compose в работу
- Дев
    - Разработка клиента просто через yarn start
- Полная работоспособность на продакшене и деве

- Контейнер для API и React
- Файлы БД в отдельной папке
- Закончить с выбранным API
- Страницы Контакты, Доставка, Рекомендации по уходу, Вопросы и ответы
- Расчет по карте. Расчертить районы и цены.
