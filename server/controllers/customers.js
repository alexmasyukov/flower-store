const knex = require('../db/knex')
const utils = require('../utils')


const STATUS = {
    CODE_SENT: 'CODE_SENT',
    CONFIM_DONE: 'CONFIM_DONE',
    INCORRECT_CODE: 'INCORRECT_CODE',
    SEND_SMS_ERROR: 'SEND_SMS_ERROR'
}

const table = 'customers'

async function sendSmsCode(code) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('ok') : reject('fuck')
        }, 1000)
    })
}


async function getCustomerByPhone(phone) {
    const customer = await knex
        .select('id', 'points', 'last_sms_code', 'points')
        .from(table)
        .where('phone', phone)
        .first()

    return customer
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
        const { phone, name, sms_code } = req.body

        const customer = await getCustomerByPhone(phone) ||
            await insertCustomer({ phone, name })

        if (!sms_code) {
            const code = Math.random().toString().substr(2, 4)

            try {
                await sendSmsCode(code)
            } catch (e) {
                // next(utils.error(500, 'ERROR', e))
                return res.status(500).json({
                    status: STATUS.SEND_SMS_ERROR,
                    result: e
                })
            }

            await updateLastSmsCodeInCustomer(customer.id, code)
            return res.json({
                status: STATUS.CODE_SENT,
                result: {}
            })
        }

        if (Number(sms_code) === Number(customer.last_sms_code)) {
            return res.json({
                status: STATUS.CONFIM_DONE, //STATUS.SEND_SMS_ERROR
                result: { points : customer.points }
            })
        }

        res.json({
            status: STATUS.INCORRECT_CODE, //STATUS.SEND_SMS_ERROR
            result: {}
        })
    }
}