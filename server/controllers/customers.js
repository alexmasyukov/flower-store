const knex = require('../db/knex')
const utils = require('../utils')
const smsController = require('../controllers/sms')


const STATUS = {
  SEND_SMS_DONE: 'SEND_SMS_DONE',
  DONE: 'DONE',
  INCORRECT_CODE: 'INCORRECT_CODE',
  SEND_SMS_ERROR: 'SEND_SMS_ERROR'
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

        let sms = {}
        try {
          sms = await smsController.sendSms(phone, code) //'Клумба код: ' +
          // console.log('sms', sms)
        } catch (e) {
          // console.log(e)
          return next(utils.error(500, STATUS.SEND_SMS_ERROR, e))
        }

        await updateLastSmsCodeInCustomer(customer.id, code)

        return res.json({
          status: STATUS.SEND_SMS_DONE,
          result: sms
        })
      }

      if (Number(sms_code) === Number(customer.last_sms_code)) {
        return res.json({
          status: STATUS.DONE,
          result: { points: customer.points }
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