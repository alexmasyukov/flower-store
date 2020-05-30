const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')


async function getAllProducts(convertEntities = false,
                              withUnpublic = false,
                              withUnpublicSizes = false) {
    try {
        const response = await axios.get('https://flower-cms.ru/api/v1/products', {
            'Accept-Encoding': 'compress, gzip'
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}


const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
])

const bot = new Telegraf('1128320455:AAH7GKNay2mi2eUF8cZh5RzeJZrbeCYOY5k')
bot.start((ctx) => ctx.reply('Hello'))
bot.command('products', ({ replyWithPhoto, replyWithMediaGroup }) => getAllProducts()
// .then(p => reply(p))
  .then(p => {
      replyWithPhoto(
        'https://flower-cms.ru/api/static/thumb_2e05ff78-6b6c-4858-8336-3b9872184949.jpg',
        [Extra.caption('Caption *text*').markdown(),
        Extra.markup((m) =>
          m.inlineKeyboard([
              m.callbackButton('Change media', 'swap_media')
          ]))]
      )
      return p
  }))
  // .then(p => replyWithMediaGroup(
  //   [{
  //       media: 'https://flower-cms.ru/api/static/thumb_2e05ff78-6b6c-4858-8336-3b9872184949.jpg',
  //       caption: 'From file_id 1',
  //       type: 'photo'
  //   }, {
  //       media: 'https://flower-cms.ru/api/static/fd7835aa-ad88-4800-bd6f-0606b0079d68.jpeg',
  //       caption: 'From file_id 2',
  //       type: 'photo'
  //   }],
  //   Extra.caption('Caption 22 2 2 2f sdf sf *text*').markdown()
  // )))

//     .then(p => replyWithMediaGroup([
//         replyWithPhoto('http://localhost/api/static/thumb_2e05ff78-6b6c-4858-8336-3b9872184949.jpg'),
//
//     ]))
// )
// bot.command('eee', ({ replyWithInvoice }) => replyWithInvoice(invoice))

bot.help((ctx) => ctx.reply('Help message'))
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard)))
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.launch()