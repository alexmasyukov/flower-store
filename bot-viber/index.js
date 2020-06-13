const ViberBot = require('viber-bot').Bot,
  BotEvents = require('viber-bot').Events,
  TextMessage = require('viber-bot').Message.Text,
  express = require('express'),
  bodyParser = require('body-parser')
const knex = require('./db/knex')
const app = express()

const COMMANDS = {
    SUBSCRIBE_ME: '/listen'
}
const usersCommands = {}


async function config() {
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

config().then(config => {
    const {
        token, subscribe_password, notify_subscribers,
        expose_url = process.env.EXPOSE_URL
    } = config

    let bot = new ViberBot({
        authToken: token,
        name: 'Клубма | менеджер',
        avatar: ""
    })

    app.use("/viber/webhook", bot.middleware())

    bot.setWebhook(`${expose_url}/viber/webhook`)
      .then(() => {
          console.log('ОК')
          sendMessages(bot, notify_subscribers, [
              new TextMessage('✋ Привет, я бот! Меня перезагрузили 🚀')
          ])
      })
      .catch(error => {
          console.log(`Can not set webhook //${expose_url}// on following server. Is it running?`)
          console.error(error)
          process.exit(1)
      })




    bot.on(BotEvents.SUBSCRIBED, response => {
        sendMessage(bot, response.userProfile.id, '✋ Привет, я бот!')
        // response.senddd(ndew TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`))
    })

    bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
        const { id, name } = response.userProfile
        const user = usersCommands[id]

        switch (message.text.trim()) {
            case COMMANDS.SUBSCRIBE_ME:
                usersCommands[id] = { id, status: '', prevMessage: COMMANDS.SUBSCRIBE_ME }
                response.send(new TextMessage('🤚 Чтобы получать уведомления, введите пароль'))
                break

            case subscribe_password:
                if (!user || user.prevMessage !== COMMANDS.SUBSCRIBE_ME) return

                if (checkSubscribe(notify_subscribers, id)) {
                    delete usersCommands[id]
                    response.send(new TextMessage('👌 Вы уже подписаны'))
                    break
                }

                subscribe(notify_subscribers, { id, name })
                  .then(id => {
                      delete usersCommands[id]
                      response.send(new TextMessage('👍 Вы подписались на уведомления от магазина'))
                  })
                break

            default:
                if (user && user.prevMessage === COMMANDS.SUBSCRIBE_ME) {
                    response.send(new TextMessage('😱 😤 Неверный пароль ❗️'))
                    delete usersCommands[id]
                }
        }

        // console.log(usersCommands)
    })

    app.post('/send',
      bodyParser.urlencoded({ extended: false }),
      bodyParser.json({ limit: '100kb' }),
      (req, res) => {
          const { msg } = req.body

          if (!msg) res.json({
              status: 'error',
              result: 'not msg filend'
          })

          sendMessages(bot, notify_subscribers, [
              new TextMessage(msg)
              // new UrlMedddssage("http://my.ecommerce.site/product1"),
          ])

          res.status(200).json({
              status: 'done',
              result: 'ок'
          })
      }
    )

    app.post('/test', (req, res) => {
        process.exit(1)
    })
})


const port = process.env.PORT || 9999

app.listen(port, () => {
    console.log(`Application running on port: ${port}`)
})

function sendMessages(bot, users, msg) {
    users.forEach(user => sendMessage(bot, user.id, msg))
}

function sendMessage(bot, userID, msg) {
    bot.sendMessage({ id: userID }, msg)
}