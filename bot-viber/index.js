const ViberBot = require('viber-bot').Bot,
  BotEvents = require('viber-bot').Events,
  TextMessage = require('viber-bot').Message.Text,
  RichMediaMessage = require('viber-bot').Message.RichMedia,
  express = require('express'),
  bodyParser = require('body-parser')
const knex = require('./db/knex')
const axios = require('axios')
// const { response } = require('express')
const app = express()

const COMMANDS = {
  SHOW_ALL_COMMANDS: '/all',
  SUBSCRIBE_ME: '/listen',
  SMS_BALANCE: '/sms-balance',
  ORDER_COMPLETE: '/order-complete',
  ORDER_UNCOMPLETE: '/order-uncomplete'
}

const SAMPLE_RICH_MEDIA = {
  "Type": "rich_media",
  "ButtonsGroupColumns": 6,
  "ButtonsGroupRows": 1,
  "BgColor": "#76879a",
  "Buttons": []
}

const BUTTON = {
  Columns: 3,
  Rows: 1,
  ActionType: "reply",
  // ActionBody: 'body',
  Text: `<font>[Text]</font>`,
  TextSize: "medium",
  TextVAlign: "middle",
  TextHAlign: "middle",
}
const usersCommands = {}

async function getSubscribers() {
  const data = await knex
    .select('notify_subscribers')
    .from('bots_viber')
    .where('id', 1)
    .first()
    
  return data.notify_subscribers
}

async function getSmsBalance() {
  try {
    const balance = await axios({
      method: 'get',
      url: `http://api-dev:3500/v1/sms/balance`,
    })

    return balance.data.result
  } catch (e) {
    return 'ERROR'
  }
}



async function getBotConfig() {
  return await knex
    .select()
    .from('bots_viber')
    .where('id', 1)
    .first()
}

function checkSubscribe(notify_subscribers, id) {
  return notify_subscribers.some(user => user.id === id)
}

async function subscribe(notify_subscribers, user) {
  return await knex
    .update({
      notify_subscribers: JSON.stringify([
        ...notify_subscribers,
        user
      ])
    })
    .into('bots_viber')
    .returning('id')
}

getBotConfig()
  .then((config) => {
    const {
      token, subscribe_password,
      expose_url: expurl_prod, expose_url_dev: expurl_dev
    } = config

    const expose_url = process.env.NODE_ENV === 'development' ?
      expurl_dev : expurl_prod

    let bot = new ViberBot({
      authToken: token,
      name: 'Клумба | менеджер',
      avatar: ""
    })

    app.use("/viber/webhook", bot.middleware())

    bot.setWebhook(`${expose_url}/viber/webhook`)
      .then(() => {
        getSubscribers()
          .then((subscribers) => {
            sendMessages(bot, subscribers, [
              new TextMessage('✋ Привет, я бот! Меня перезагрузили 🚀')
            ])
          })
          .catch(e => e)
      })
      .catch(error => {
        console.log(`Can not set webhook //${expose_url}// on following server. Is it running?`)
        console.error(error)
        process.exit(1)
      })


    // bot.on(BotEvents.SUBSCRIBED, response => {
    //   sendMessage(bot, response.userProfile.id, '✋ Привет, я бот!')
    //   // response.senddd(ndew TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`))
    // })

    bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
      const { id, name } = response.userProfile
      const user = usersCommands[id]

      const subscribers = await getSubscribers()

      if (message.text.trim().includes(COMMANDS.ORDER_COMPLETE) ||
        message.text.trim().includes(COMMANDS.ORDER_UNCOMPLETE)
      ) {
        const [command, orderId] = message.text.split('=')
        const complete = command === COMMANDS.ORDER_COMPLETE

        await axios({
          method: 'put',
          url: `http://api-dev:3500/v1/orders/${orderId}`,
          data: {
            complete
          }
        })
          .then(() =>
            sendMessages(bot, subscribers, [
              new TextMessage(`Заказ № ${orderId} ${complete ? 'выполнен 👍' : 'отменен ❌'}`)])
          )
          .catch(error => {
            console.log(error.response.data)
            response.send(new TextMessage('Ошибка ❌, это техническая команда'))

          })
      }


      switch (message.text.trim()) {
        case COMMANDS.SUBSCRIBE_ME:
          usersCommands[id] = { id, status: '', prevMessage: COMMANDS.SUBSCRIBE_ME }
          response.send(new TextMessage('🤚 Чтобы получать уведомления, введите пароль'))
          break


        case COMMANDS.SMS_BALANCE:
          const balance = await getSmsBalance()
          response.send(new TextMessage(`Баланс - ${balance} руб. (https://sms.ru)`))
          break

        case COMMANDS.SHOW_ALL_COMMANDS:
          response.send(new TextMessage(Object.values(COMMANDS).join('\n')))
          break

        case subscribe_password:
          if (!user || user.prevMessage !== COMMANDS.SUBSCRIBE_ME) return

          if (checkSubscribe(subscribers, id)) {
            delete usersCommands[id]
            response.send(new TextMessage('👌 Вы уже подписаны'))
            break
          }

          subscribe(subscribers, { id, name })
            .then(id => {
              delete usersCommands[id]
              response.send(new TextMessage('👍 Вы подписались на уведомления от магазина'))
            })
            .catch(e => e)
          break

        default:
          if (user && user.prevMessage === COMMANDS.SUBSCRIBE_ME) {
            response.send(new TextMessage('😱 😤 Неверный пароль ❗️'))
            delete usersCommands[id]
          }
      }

    })

    app.post('/send',
      bodyParser.urlencoded({ extended: false }),
      bodyParser.json({ limit: '100kb' }),
      async (req, res) => {
        const { messages, buttons = [] } = req.body

        if (!messages) return res.json({
          status: 'error',
          result: 'not msg'
        })

        try {
          const subscribers = await getSubscribers()

          let msgs = messages.map(msg => new TextMessage(msg))

          if (buttons.length > 0) {
            SAMPLE_RICH_MEDIA.Buttons = buttons.map(({ title, body }) => ({
              ...BUTTON,
              ActionBody: body,
              Text: `<font color=#FFFFFF>${title}</font>`
            }))

            msgs = [...msgs, new RichMediaMessage(SAMPLE_RICH_MEDIA)]
          }

          sendMessages(bot, subscribers, msgs)

          return res.json({
            status: 'done',
            result: 'ок'
          })
        } catch (e) {
          return res.json({
            status: 'error /send',
            result: e
          })
        }

      }
    )

    app.post('/test', (req, res) => {
      process.exit(1)
    })
  })
  .catch(e => e)


const port = process.env.PORT || 9999

app.listen(port, () => {
  console.log(`Application running on port: ${port}`)
})

function sendMessages(bot, users, msg) {
  users.forEach(user => sendMessage(bot, user.id, [...msg]))
}

function sendMessage(bot, userID, msg) {
  bot.sendMessage({ id: userID }, msg)
}