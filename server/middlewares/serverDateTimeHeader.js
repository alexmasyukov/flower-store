const datetime = require('node-datetime')

function serverDateTimeHeader(req, res, next) {
   // PostgreSQL 2020-01-07 16:19:33.000000 +00:00

   const dt = datetime.create();
   const formatted = dt.format('Y-m-d H:M:S.000000 +00:00');
   res.header('Server-datetime', formatted)
   next()
}

module.exports = serverDateTimeHeader