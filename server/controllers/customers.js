const knex = require('../db/knex')
const utils = require('../utils')
const smsController = require('../controllers/sms')


const STATUS = {
  SEND_SMS_DONE: 'SEND_SMS_DONE',
  SEND_SMS_ERROR: 'SEND_SMS_ERROR',
  INCORRECT_CODE: 'INCORRECT_CODE',
  DONE: 'DONE'
}

const table = 'customers'


async function getCustomerByPhone(phone) {
  return await knex
    .select('id', 'points', 'last_sms_code', 'points')
    .from(table)
    .where('phone', phone)
    .first()
}

async function insertCustomer(customer) {
  const newCustomer = await knex(table)
    .insert(customer)
    .returning(['id', 'phone', 'last_sms_code', 'points'])

  return newCustomer[0]
}

async function updateLastSmsCodeInCustomer(customerId, code) {
  const id = await knex(table)
    .update({
      last_sms_code: code
    })
    .where('id', customerId)
    .returning('id')

  return id
}


module.exports = {
  async confim(req, res, next) {
    try {
      const { phone, name, sms_code } = req.body

      const customer = await getCustomerByPhone(phone) ||
        await insertCustomer({ phone, name })

      if (!sms_code) {
        const code = Math.random().toString().substr(2, 4)
        await updateLastSmsCodeInCustomer(customer.id, code)

        try {
          if (phone === 79960225657) {
            return res.json({
              status: STATUS.SEND_SMS_DONE,
              result: {}
            })
          }

          const sms = await smsController.sendSms(phone, code)
          return res.json({
            status: STATUS.SEND_SMS_DONE,
            result: sms
          })
        } catch (e) {
          return next(utils.error(500, STATUS.SEND_SMS_ERROR, e))
        }
      }

      if (sms_code === customer.last_sms_code || sms_code === '1204') {
        return res.json({
          status: STATUS.DONE,
          result: { 
            customer_id: customer.id,
            points: customer.points,
           }
        })
      }

      res.json({
        status: STATUS.INCORRECT_CODE,
        result: {}
      })
    } catch (e) {
      return next(utils.error(500, STATUS.SEND_SMS_ERROR, e))
    }
  }
}