## Commands
nodemon app.js

### В проекте присутствуют:
- Миграции и заполнители (seeders) Knex 

#### Выполняем миграции и вносим тестовые данные
npm install knex -g

knex migrate:latest
knex seed:run

(or only one file 
knex seed:run --specific products.js)

[Knex migrations and seeders](http://knexjs.org/#Migrations)

##### Markdown
[https://paulradzkov.com/2014/markdown_cheatsheet/](https://paulradzkov.com/2014/markdown_cheatsheet/)

  // https://habr.com/ru/post/144011/
         // https://medium.com/hashmapinc/rest-good-practices-for-api-design-881439796dc9

         // const product = R.pick(schemaKeys, req.body)
         //    return next(utils.error(500, 'VALIDATE ERROR', ajv.errors[0].message))

         // Доктор Хаус 6 сезон 15 серия музыка