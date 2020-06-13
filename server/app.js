require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compress = require('compression')
const morgan = require('morgan')
const logger = morgan('dev') //tiny
const app = express()

const errorHandler = require('./middlewares/errorHandler')
const notFoundHandler = require('./middlewares/notFoundHandler')
const serverDateTimeHeader = require('./middlewares/serverDateTimeHeader')

const productsRoute = require('./routes/products')
const productSizesRoute = require('./routes/productSizes')
const entitiesRoute = require('./routes/entities')
const floristsRoute = require('./routes/florists')
const citiesRoute = require('./routes/cities')
const bannersRoute = require('./routes/banners')
const reviewsRoute = require('./routes/reviews')
const additivesRoute = require('./routes/additives')
const customersRoute = require('./routes/customers')
const teamRoute = require('./routes/team')
const botViberRouter = require('./routes/botsViber')
const contentRoute = require('./routes/content')
const ordersRoute = require('./routes/orders')
const additionalProductsRoute = require('./routes/additionalProducts')
const uploadRoute = require('./routes/upload')
const bookRoute = require('./routes/book')


// app.use('/static', express.static(__dirname + '/public'))
// app.use('/img', express.static(__dirname + '/public/img'))

// app.use('/', express.static(__dirname + '/public'))
// app.use('/uploads', express.static(__dirname + '/uploads'))

// Лучшие практики и коды https://restfulapi.net/http-status-codes/
// https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
// Договоренности https://restfulapi.net/


/** TODO:
 * ок - Вынести получение сущностей в отдельную функцию
 * ок - Обработка ошибок multer и общий errorHandler с кодами
 * ок - фильтрация изображений
 * ок - сжатие файлов
 * ок - кроп файлов
 * ок - Нормальная обработка ошибок и отправка статусов
 * Вынести все функции из роутов в controllers/products.js
 *   export.getProducts
 * Модели:
 * -- Города
 * -- -- Товары
 * -- -- -- Размер
 * -- -- Сущности (с типом и городом)
 * -- Пользователи (с правами)
 * -- -- Заказы
 *
 * Тесты для мока данных
 * Тесты для функций
 *
 */

// Пшеничная Евгения Александровна (взять МРТ шеи, текущее
// ККБ - Невролог
// Массаж - В академии



// middleware stack
app.use(cors())
app.use(logger)
app.use(compress())  // { threshold: 0 } what is it?
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '100kb' }))
app.use(serverDateTimeHeader)

app.use('/static', express.static('uploads'))

const apiV1 = '/v1'
// routes (also middleware stack)
app.use(`${apiV1}/team`, teamRoute)
app.use(`${apiV1}/bot-viber`, botViberRouter)
app.use(`${apiV1}/entities`, entitiesRoute)
app.use(`${apiV1}/products`, productsRoute)
app.use(`${apiV1}/product-sizes`, productSizesRoute)
app.use(`${apiV1}/florists`, floristsRoute)
app.use(`${apiV1}/cities`, citiesRoute)
app.use(`${apiV1}/banners`, bannersRoute)
app.use(`${apiV1}/reviews`, reviewsRoute)
app.use(`${apiV1}/additives`, additivesRoute)
app.use(`${apiV1}/customers`, customersRoute)
app.use(`${apiV1}/content`, contentRoute)
app.use(`${apiV1}/additional-products`, additionalProductsRoute)
app.use(`${apiV1}/orders`, ordersRoute)
app.use('/upload', uploadRoute)

app.get('/book', bookRoute)

app.use(notFoundHandler)
app.use(errorHandler)


// NODE_ENV это вообще должно быть объявлено в ручную или это стандарт?
// const mongoURI = process.env.NODE_ENV === "developer" ?
//   process.env.LOCAL_MONGODB_URI :
//   process.env.DOCKER_MONGODB_URI


// db connect
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, () => {
//   console.log('db connect')
// })

// listen
app.listen(process.env.LISTEN_PORT, () => {
   console.log('listen ' + process.env.LISTEN_PORT)
})