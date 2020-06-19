const knex = require('../db/knex')
const utils = require('../utils')
const nodemailer = require('nodemailer')
const axios = require('axios')

module.exports = {
    async confirmation(req, res, next) {
        const code = Math.random().toString().substr(2, 4)
        res.json({
            status: 'done',
            result: code
        })
    },

    async getOne(req, res, next) {
        try {
            // const { withUnpublic } = req.query
            const { id } = req.params

            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            // const where = R.compose(
            //   modificators.removeParamOfQuery(withUnpublic, 'public')
            // )({
            //     ...initialFields,
            //     id
            // })

            const order = await knex
              .select()
              .from('orders')
              .where('id', id)
              .first()

            if (!order)
                return next(utils.error(404, 'NOT FOUND', `Order not found`))

            const customer = await knex
              .select()
              .from('customers')
              .where('id', order.customer_id)
              .first()

            const { phone, name, points } = customer

            res.json({
                ...order,
                customer: {
                    phone,
                    name,
                    points
                }
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async nofity(req, res, next) {
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount()

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp-dev",
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass // generated ethereal password
                }
            })

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Новый заказ 👻" <alienspro2008@yandex.ru>', // sender address
                to: "alexmasyukov@gmail.com", // list of receivers alienspro2008@yandex.ru,
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>" // html body
            })

            console.log("Message sent: %s", info.messageId)
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            return info.messageId
        }

        main()
          .then(r => {
              res.json({
                  status: 'done',
                  result: r
              })
          })
          .catch((e) => {
              next(utils.error(500, 'ERROR', e.message))
          })


    }
}