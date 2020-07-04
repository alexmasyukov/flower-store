const axios = require('axios')
const R = require('ramda')
const md5 = require('md5')
const utils = require('../utils')

async function run(method = 'post', action = 'sms/send', params) { //sendSMS
  // const version = process.env.SMS_API_VERSION
  // const privateKey = process.env.SMS_PRIVATE_KEY
  // const key = process.env.SMS_PUBLIC_KEY
  //
  // const allParams = {
  //   version,
  //   action,
  //   key,
  //   ...params
  // }
  //
  // const controlSum = R.compose(
  //   md5,
  //   (sum) => sum + privateKey,
  //   R.join(''),
  //   Object.values,
  //   utils.ksort
  // )(allParams)

  // sendSMS4d4cab779dbaf9be14676c4eb739e1ff79960225657klumba0Ваш код: 55663.0a3776796d317c1964d49adfbc231acdc
  // sendSMS4d4cab779dbaf9be14676c4eb739e1ff79960225657klumba0Ваш код: 68423.0a3776796d317c1964d49adfbc231acdc
  // console.log(controlSum)

  const link = Object
    .entries(params)
    .filter(([key]) => key !== 'action' && key !== 'version')
    .map(([key, value]) => key === 'msg' ? [key, encodeURI(value)] : [key, value])
    .reduce((res, [key, value]) => `${res}&${key}=${value}`, '')

  // const result = axios({
  //   method: 'post',
  //   url: `http://api.atompark.com/api/sms/${version}/${action}?` +
  //     `key=${key}&sum=${controlSum}${link}`
  // })
  //
console.log(`https://sms.ru/${action}?api_id=4773E251-64CD-07E3-B671-894561405F76` +
  `${link}&json=1`)
  const result = axios({
    method,
    url: `https://sms.ru/${action}?api_id=4773E251-64CD-07E3-B671-894561405F76` +
    `${link}&json=1`
  })


  return await new Promise(async function(resolve, reject) {
    result
      .then((res) => {
        if ('error' in res.data) {
          console.log('in error')
          reject(res.data)
        }
        console.log(res.data)
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
    // datetime: '',
    // sms_lifetime: 0,
    // sender: 'klumba',
    // phone,
    // text: text
    to: phone,
    msg: text
  }

  return await run('post', 'sms/send', params)

  // try {
  //   const a = await run('sendSMS', params)
  //   console.log('a', a)
  // } catch (e) {
  //   console.log('run error', e)
  // }
}

module.exports = {
  sendSms,

  async getBalance(req, res, next) {
    const params = {
      // currency: 'RUB'
    }

    try {
      const result = await run('get', 'my/balance', params) //getUserBalance
      res.json({
        status: 'done',
        result: result.balance //result.data.result.balance_currency
      })
    } catch (e) {
      return next(utils.error(500, 'error', e))
    }
  }
}