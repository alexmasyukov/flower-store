const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    async confim(req, res, next) {
        try {
            const { phone, name, sms_code } = req.body

            let customer = await knex
              .select('id', 'points')
              .from('customers')
              .where('phone', phone)
              .first()

            if (!customer) {
                const insertCustomer = await knex('customers')
                  .insert({
                      phone,
                      name
                  })
                  .returning(['id', 'phone'])

                customer = insertCustomer[0]
            }

            const sendSmsCode = (code) => new Promise((resolve, reject) => {
                setTimeout(() => resolve('ok'), 1000)
            })

            if (!sms_code) {
                sendSmsCode(Math.random().toString().substr(2, 4))
                  .then(status => {
                      res.json({
                          status: 'code_sent',
                          result: status
                      })
                  })
            }




            // const code =


            // if (!utils.checkInteger(phone)) {
            //     return next(utils.error(500, 'ERROR', 'phone should be Integer'))
            // }
            //
            // // const where = R.compose(
            // //   modificators.removeParamOfQuery(withUnpublic, 'public')
            // // )({
            // //     ...initialFields,
            // //     id
            // // })
            //
            // const order = await knex
            //   .select()
            //   .from('orders')
            //   .where('id', id)
            //   .first()
            //
            // if (!order)
            //     return next(utils.error(404, 'NOT FOUND', `Order not found`))
            //
            // const customer = await knex
            //   .select()
            //   .from('customers')
            //   .where('id', order.customer_id)
            //   .first()


            // res.json({
            //     ...order,
            //     customer: {
            //         phone,
            //         name,
            //         points
            //     }
            // })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}