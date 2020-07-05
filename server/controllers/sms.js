const axios = require('axios')
const utils = require('../utils')

async function run(method = 'post', action = 'sms/send', params = {}) {
  const api_id = process.env.SMS_API_ID

  const link = Object
    .entries(params)
    .map(([key, value]) => key === 'msg' ? [key, encodeURI(value)] : [key, value])
    .reduce((res, [key, value]) => `${res}&${key}=${value}`, '')

  const result = axios({
    method,
    url: `https://sms.ru/${action}?api_id=${api_id}` +
      `${link}&json=1`
  })


  return await new Promise(async function(resolve, reject) {
    result
      .then((res) => {
        if (res.data.status === 'ERROR') {
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(e => reject(e))
  })

  // setTimeout(() => {
  //   Math.random() > 0.5 ? resolve('ok') : reject('fuck')
  // }, 300)
}


async function sendSms(phone, text) {
  const params = {
    to: phone,
    msg: text
  }

  return await run('post', 'sms/send', params)
}

module.exports = {
  sendSms,

  async getBalance(req, res, next) {
    try {
      const result = await run('get', 'my/balance')
      res.json({
        status: 'done',
        result: result.balance
      })
    } catch (e) {
      return next(utils.error(500, 'error', e))
    }
  }
}