const utils = require('../utils')
const axios = require('axios')
const md5 = require('md5')


module.exports = {
    getSmsConfig(action = 'getUserBalance', args = []) {
        return async function (req, res, next) {
            const version = process.env.SMS_API_VERSION
            const publicKey = process.env.SMS_PUBLIC_KEY
            const privateKey = process.env.SMS_PRIVATE_KEY
            const currency = 'RUB'
            const controlSum = md5(action + currency + publicKey + version + privateKey)

            req.smsConfig = {
                version,
                publicKey,
                controlSum,
                action
            }

            next()
        }
    },

    async getBalance(req, res, next) {
        const { version, publicKey, controlSum, action } = req.smsConfig

        try {
            const balance = await axios({
                method: 'post',
                url: `http://api.atompark.com/api/sms/${version}/${action}?key=${publicKey}&sum=${controlSum}&currency=RUB`,
            })

            res.json({
                status: 'done',
                result: balance.data.result.balance_currency
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}