require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const logger = morgan('dev') //tiny
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const app = express()
const knex = require('./db/knex')
const passport = require('passport')
const LocalStrategy = require('passport-local')


const errorHandler = require('./middlewares/errorHandler')
const notFoundHandler = require('./middlewares/notFoundHandler')
const serverDateTimeHeader = require('./middlewares/serverDateTimeHeader')

const productsRoute = require('./routes/products')
const productsSizesRoute = require('./routes/productsSizes')
const entitiesRoute = require('./routes/entities')
const citiesRoute = require('./routes/cities')
const bannersRoute = require('./routes/banners')
const reviewsRoute = require('./routes/reviews')
const additivesRoute = require('./routes/additives')
const customersRoute = require('./routes/customers')
const teamRoute = require('./routes/team')
const botViberRouter = require('./routes/botsViber')
const contentRoute = require('./routes/content')
const ordersRoute = require('./routes/orders')
const smsRoute = require('./routes/sms')
const additionalProductsRoute = require('./routes/additionalProducts')
const uploadRoute = require('./routes/upload')
const authRoute = require('./routes/auth')
const bookRoute = require('./routes/book')


/** TODO:
 * ок - сжатие файлов
 * ок - кроп файлов
 * */

const apiV1 = '/v1'
const store = new KnexSessionStore({
  knex,
  tablename: 'sessions'
})


passport.use('local', new LocalStrategy(
  function(username, password, done) {
    console.log('passport use', username, password)
    return done(null, {
      id: 5544,
      username,
      password
    })
  }
))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const whitelist = ['http://localhost:5000', 'http://localhost']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   console.log(req.header('Origin'))
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   }else{
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// middleware stack
app.use(cors(corsOptions))
// {
//   // origin: '*',
//   // origin: 'http://localhost:5000',
//   credentials: true
// }))
// app.use(logger)
app.use(compression())  // { threshold: 0 } what is it?
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '100kb' }))
app.use(serverDateTimeHeader)
app.use(session({
  store,
  secret: 'keyboard cat',
  cookie: {
    path: '/',
    httpOnly: false,
    // domain: 'localhost',
    maxAge: 10000 * 10000 // ten seconds, for testing
  },
  resave: true,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//
// const test = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // Math.random() < 0.5 ? resolve('ок') : reject('errsss')
//     resolve('ок')
//   }, 300)
// })
//
// const done = (e) => {
//   console.log(e)
// }
//
// test
//   .then((res) => {
//     return done({
//       id: 10,
//       login: 'alex',
//       pass: '12345'
//     })
//   })
//   .catch(done)



app.use('/static', express.static('uploads')) //__dirname


// routes (also middleware stack)
app.use(`${apiV1}/team`, teamRoute)
app.use(`${apiV1}/bot-viber`, botViberRouter)
app.use(`${apiV1}/entities`, entitiesRoute)
app.use(`${apiV1}/products`, productsRoute)
app.use(`${apiV1}/products-sizes`, productsSizesRoute)
app.use(`${apiV1}/cities`, citiesRoute)
app.use(`${apiV1}/banners`, bannersRoute)
app.use(`${apiV1}/reviews`, reviewsRoute)
app.use(`${apiV1}/additives`, additivesRoute)
app.use(`${apiV1}/customers`, customersRoute)
app.use(`${apiV1}/content`, contentRoute)
app.use(`${apiV1}/additional-products`, additionalProductsRoute)
app.use(`${apiV1}/orders`, ordersRoute)
app.use(`${apiV1}/sms`, smsRoute)
app.use(`${apiV1}/`, authRoute)
app.use('/upload', uploadRoute)

app.get('/book', bookRoute)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.LISTEN_PORT, () => {
  console.log('listen ' + process.env.LISTEN_PORT)
})