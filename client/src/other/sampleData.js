import random from 'lodash/random'

import im1 from "assets/1.jpeg"
import im2 from "assets/2.jpg"
import im3 from "assets/3.jpeg"
import im4 from "assets/4.jpeg"
import im5 from "assets/5.jpeg"
import im6 from "assets/6.jpeg"
import im7 from "assets/7.jpeg"
import im8 from "assets/8.jpg"
import im9 from "assets/9.jpg"
import { date_26 } from "containers/TIME_date"



const photoModels = [
  {
    title: 'Гортензия',
    shade: 'Темный',
    color: 'Фиолетовый',
    bouquetType: 'Монобукет',
    sizes: [
      {
        flowers: [
          ['Гортензия', 17]
        ],
        image: im1,
      },
      {
        flowers: [
          ['Гортензия', 29]
        ],
        image: im2,
      },
      {
        flowers: [
          ['Гортензия', 15]
        ],
        image: im3,
      }
    ]
  },
  {
    title: 'Монобукет кустовой розы',
    shade: 'Нежный',
    packing: ['Фет'],
    color: 'Молочный',
    bouquetType: 'Монобукет',
    sizes: [
      {
        flowers: [
          ['Кустовая роза', 15]
        ],
        image: im4,
      },
      {
        flowers: [
          ['Кустовая роза', 35],
          ['Фиалка', 23],
          ['Кустовая роза', 23],
        ],
        image: im5,
      },
      {
        flowers: [
          ['Кустовая роза', 67],
          ['Фиалка', 23],
          ['Кустовая роза', 23],
        ],
        image: im6,
      }
    ]
  },
  {
    title: 'Сборный в коробке',
    shade: 'Яркий',
    packing: ['Шляпная коробка', 'Коробка'],
    color: 'Разноцветный',
    bouquetType: 'Сборный',
    sizes: [
      {
        flowers: [
          ['Кустовая роза', 15]
        ],
        image: im7,
      },
      {
        flowers: [
          ['Странная зелень', 6],
          ['Фиалка', 23],
          ['Неизвестный науке цветок', 7],
        ],
        image: im8,
      },
      {
        flowers: [
          ['Странная зелень', 6],
          ['Кустовая роза', 35],
          ['Неизвестный науке цветок', 7],
        ],
        image: im9,
      }
    ]
  }
]

function randomText() {
  const texts = [
    `Котам нельзя! С котами нельзя! Брысь!
     Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он 
    собирается платить!`,
    `Степа взглянул на бумагу и закоченел. Все было на месте. Во-первых, 
    собственноручная Степина залихватская подпись!`,
    `По вашему профессиональному мнению как действующего специалиста — представляет ли мистер Сегерс опасность для общества?`
  ]

  return texts[random(0,texts.length-1)]
}


const newModel = {
  id: 1,
  order: 1,
  title: 'Монобукет Мисти Бабблс',
  slug: 'monobuket-kustovoj-pionovidnoj-rozy',
  desc: '',
  // activeSizeIndex: 0,
  // activeGrassIndex: 0,
  // available: {
  //   expect: false,
  //   fast: false
  // },
  // available: false,
  // availableFast: false,

  available: {
    expect: false,
    fast: false
  },
  bouquetType: 'Монобукет',
  packing: ['Бумага флисовая'],
  colors: ['Фиолетовый'],
  additionalProducts: [0, 1],
  shade: 'Мягкий',
  florist: {
    // photo: 'https://randomuser.me/api/portraits/women/66.jpg',
    photo: 'https://randomuser.me/api/portraits/women/66.jpg',
    name: 'Лиза',
    text: randomText()
  },
  sizes: [
    {
      title: 'Стандартный',
      circle: 45,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 2500,
      flowers: [
        ['Гортензия', 23],
        ['Фиалка', 23],
        ['Кустарная роза', 23],
      ]
    },
    {
      title: 'Большой',
      circle: 59,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 3400,
      flowers: [
        ['Б Цветок 1', 23],
        ['Б Цветок 2', 23],
        ['Б Цветок 3', 23],
      ]
    },
    {
      title: 'Премиум',
      circle: 80,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 5200,
      flowers: [
        ['Цветок 1', 23],
        ['Цветок 2', 23],
        ['Цветок 3', 23],
      ]
    },
  ]
}

export function generateProducts() {
  let items = new Array(20).fill(Object.assign({}, newModel));

  const products = items.map((item, i) => {
    const product = { ...item }

    const photoModelRandomIndex = random(0, photoModels.length - 1)
    const photoModel = photoModels[photoModelRandomIndex]

    product.id = 'id' + i + 'n'
    product.order = i
    product.title = photoModel.title
    product.shade = photoModel.shade
    product.color = photoModel.color
    product.bouquetType = photoModel.bouquetType

    if ('packing' in photoModel) product.packing = photoModel.packing

    product.slug = 'product' + i
    product.stability = ['+', '++', '+++'][random(0, 2)]

    // todo: это сделать но по новым принципам работы в CMS
    // product.collecitions = ['23 февраля', '8 марта', 'Новый год'][random(0, 2)]

    const rand1 = !!random(0, 1)
    product.available = {
      expect: rand1,
      fast: !rand1
    }
    // product.availableFast = !!random(0, 1)
    // product.availableFast = true


    // unavailable: [date_26]

    //      fromDate: new Date(),

    const SizesCount = random(2, 3)
    const startIndexSplice = random(0, 1)
    // от 2 до 3  (2, 3)  (0, 1)
    product.sizes = [...newModel.sizes].splice(startIndexSplice, SizesCount)
    const photoModelSizes = [...photoModel.sizes].splice(startIndexSplice, SizesCount)

    for (let a = 0; a < product.sizes.length; a++) {
      // формируем цветы, фото и названия в зависимости от изображения
      product.sizes[a] = {
        ...product.sizes[a],
        ...photoModelSizes[a]
      }
    }

    for (let a = 0; a < product.sizes.length; a++) {
      let priceMin = 9
      let priceMax = 23
      let hMin = 20
      let hMax = 45

      if (a === 1) {
        priceMin = 24
        priceMax = 40
        hMin = 29
      }
      if (a === 2) {
        priceMin = 43
        priceMax = 64
        hMin = 38
      }

      product.sizes[a].circle = random(hMin, hMax)
      product.sizes[a].price = random(priceMin, priceMax) * 100
    }


    // if (product.sizes[0].title !== newModel.sizes[0].title)
    //   product.title = <>{product.title} <b>{product.sizes[0].title}</b></>


    return product
  })

  // console.log(JSON.stringify(products))

  return products
}
