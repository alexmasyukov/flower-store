const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')

console.log('bot start')
const bot = new Telegraf('1128320455:AAH7GKNay2mi2eUF8cZh5RzeJZrbeCYOY5k')


async function getAllProducts(convertEntities = true,
                              withUnpublic = false,
                              withUnpublicSizes = false) {
    try {
        return await axios.get('https://flower-cms.ru/api/v1/products?convertEntities=true', {
            'Accept-Encoding': 'compress, gzip'
        })
          .then(res => {
              console.log('THEN ONE')
              return res.data
          })
    } catch (error) {
        console.error(error)
    }
}

const products = getAllProducts()


// bot.use(Telegraf.log())

bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
      m.inlineKeyboard([
          m.callbackButton('Coke', 'Coke'),
          m.callbackButton('Pepsi', 'Pepsi')
      ])))
})


const renderSizesButtons = (buttons, m) =>
  buttons.map(({ title, actionName }) => m.callbackButton(title, actionName))

const productCaption = (productTitle = '', {
    title = '',
    price = 0, diameter = 0, fast = false,
    flowers = []
}) => {
    return `
*${productTitle}* (${title} размер)
*${price} руб*, ${diameter} см 
${fast ? `*Букет уже собран!*` : ''} 

`
} //${flowers.join(', ')}

const renderProducts = (ctx) => {
    products.then(products => {
        products.forEach(product => {
            // console.log(product.sizes.map(size => size.id))
            const activeSize = product.sizes[0] || {}
            const img = activeSize.images[0]
            const buttons = product.sizes.map((size, i) => ({
                actionName: `${product.id}-size-${i}`,
                title: i === 0 ? `*${size.title}*` : size.title
            }))
            // const { title, diameter, fast, price, flowers } = product.sizes[0]

            ctx.replyWithPhoto(
              { url: `https://flower-cms.ru/api/static/${img}` },
              Extra.load({
                  caption: productCaption(product.title, activeSize)
              })
                .markdown()
                .markup((m) =>
                  m.inlineKeyboard(
                    renderSizesButtons(buttons, m)//`${product.id}size${id}`
                  ))
            )
        })
    })
      .catch(e => console.log(e))
}

bot.command('caption', (ctx) => {
    renderProducts(ctx)
})

bot.action(/(.?\d)-size-(.?\d)/, async (ctx) => {
    const [_, productId, sizeIndex] = ctx.match
    await products.then(products => {
        console.log(products)
        const product = products.find(item => item.id == productId)
        // console.log(product)
        if (!product) return
        const activeSize = product.sizes[sizeIndex]
        const img = activeSize.images[0]


        const buttons = product.sizes.map((size, i) => {
            return {
                actionName: `${product.id}-size-${i}`,
                title: i == sizeIndex ? `*${size.title}*` : size.title
            }
        })

        // ctx.editMessageText(
        //   Extra.load({
        //       caption: productCaption(product.title, activeSize)
        //   })
        //     .markdown()
        //     .markup((m) =>
        //       m.inlineKeyboard(
        //         renderSizesButtons(buttons, m)//`${product.id}size${id}`
        //       ))
        // )
        // ctx.answerCbQuery(`Oh, ${sizeIndex}! Great choice`)
        // ctx.editMessageMedia({ url: `https://flower-cms.ru/api/static/${img}` })
        ctx.editMessageCaption(
          productCaption(product.title, activeSize), //
          Extra.markdown().markup(Markup.inlineKeyboard(
            renderSizesButtons(buttons, Markup)
          )))
    })

    // console.log(productId, sizeIndex)

    // //   [
    // //     Markup.callbackButton('Plain', 'plain'),
    // //     Markup.callbackButton('* Italic *', 'italic')
    // // ]
    // )))
})

bot.launch()