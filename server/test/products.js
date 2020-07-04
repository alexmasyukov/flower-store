const {
  step,
  expect,
  error404,
  error500_schemaFailed,
  success,
  successItem,
  successArray,
  request,
  requestDelete,
  requestPost,
  requestPut
} = require('./common')

const url = '/products'
const title = url.replace('/', '')

const item = {
  city_id: 1,
  public: false,
  order: 123456789,
  slug: "test_product_test_test",
  title: "ТЕСТ",
  description: "",
  florist_id: 2,
  florist_text: "Тестовый текст флориста",
  color: 4,
  stability: 10,
  shade: 12,
  packing: 23,
  bouquetType: 28,
  additionalProducts: [
    1,
    2,
    3
  ],
  additives: [
    1,
    2
  ],
  sizes: [
    {
      city_id: 1,
      order: 0,
      public: true,
      fast: false,
      title: 6,
      price: 3200,
      diameter: 90,
      flowers: [
        19,
        16,
        15,
        18
      ],
      flowers_counts: [
        4,
        3,
        8,
        19
      ],
      images: [
        "2e05ff78-6b6c-4858-8336-3b9872184949.jpg"
      ]
    },
    {
      city_id: 1,
      order: 0,
      public: true,
      fast: true,
      title: 7,
      price: 2150,
      diameter: 90,
      flowers: [
        19,
        16,
        15,
        18
      ],
      flowers_counts: [
        4,
        3,
        8,
        19
      ],
      images: [
        "ce14890e-1595-4a81-bcfb-2a85b3cb0902.jpg"
      ]
    }
  ]
}

const post_put_500_shemaError_item = {
  ...item,
  title: "test",
  sizes: false
}

const update_200_success = {
  city_id: 1,
  public: true,
  order: 9998884,
  slug: "update_test_product_test_test",
  title: "ОБНОВЛЕН",
  description: "",
  florist_id: 1,
  florist_text: "ОБНОВЛЕН Тестовый текст флориста",
  color: 4,
  stability: 10,
  shade: 12,
  packing: 23,
  bouquetType: 28,
  sizes: [
    {
      city_id: 1,
      order: 0,
      public: true,
      fast: false,
      title: 6,
      price: 3200,
      diameter: 90,
      flowers: [
        19,
        16,
        15,
        18
      ],
      flowers_counts: [
        4,
        3,
        8,
        19
      ],
      images: [
        "2e05ff78-6b6c-4858-8336-3b9872184949.jpg"
      ]
    }
  ]
}

let itemId = 0
let newItem = {}

const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('public')
  res.body.should.all.have.property('order')
  res.body.should.all.have.property('slug')
  res.body.should.all.have.property('title')
  res.body.should.all.have.property('description')
  res.body.should.all.have.property('color')
  res.body.should.all.have.property('stability')
  res.body.should.all.have.property('shade')
  res.body.should.all.have.property('packing')
  res.body.should.all.have.property('bouquetType')
  res.body.should.all.have.property('additionalProducts')
  res.body.should.all.have.property('additives')
  res.body.should.all.have.property('sizes')
  res.body.should.all.have.property('florist_id')
  res.body.should.all.have.property('florist_text')
  res.body.should.all.have.property('florist_photo')
  res.body.should.all.have.property('florist_name')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('city_id')
  res.body.should.have.property('public')
  res.body.should.have.property('order')
  res.body.should.have.property('slug')
  res.body.should.have.property('title')
  res.body.should.have.property('description')
  res.body.should.have.property('color')
  res.body.should.have.property('stability')
  res.body.should.have.property('shade')
  res.body.should.have.property('packing')
  res.body.should.have.property('bouquetType')
  res.body.should.have.property('additionalProducts')
  res.body.should.have.property('additives')
  res.body.should.have.property('sizes')
  res.body.should.have.property('florist_id')
  res.body.should.have.property('florist_text')
  res.body.should.have.property('florist_photo')
  res.body.should.have.property('florist_name')
}


describe(`/POST ${title}`, () => {
  step('Add new item', (done) => {
    requestPost(`${url}`, item, (err, res) => {
      success(err, res)
      itemId = res.body.result
      done()
    })
  })

  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    requestPost(`${url}`, post_put_500_shemaError_item, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })


  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPost(`${url}`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})


describe(`/GET ${title}`, () => {
  it('all items', (done) => {
    request(`${url}?all=true`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      done()
    })
  })

  it('all items where public = false and city_id = 1', (done) => {
    request(`${url}?public=false&city_id=1`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.public === false && item.city_id === 1)).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request(`${url}?title=6&public=false&city_id=555`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only item where city_id=rew', (done) => {
    request(`${url}?city_id=rew`, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe(`/GET ${title}:id`, () => {
  it(`only item by id=${itemId}`, (done) => {
    request(`${url}/${itemId}?all=true`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      const newItem = res.body
      done()
    })
  })

  it('get item without error (param testField should be removed)', (done) => {
    request(`${url}/${itemId}?all=true&testField=1234`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  it('ERROR 404 - by id, city_id not found', (done) => {
    request(`${url}/${itemId}?all=true&city_id=3332`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    request(`${url}/1234567890`, (err, res) => {
      error404(err, res)
      done()
    })
  })
})


describe(`/PUT ${title}:id`, () => {
  step('Update item success several filelds', (done) => {
    requestPut(`${url}/${itemId}`, {
      ...update_200_success,
      sizes: newItem.sizes
    }, (err, res) => {
      success(err, res)
      done()
    })
  })


  step('Update item success ONLY public field', (done) => {
    requestPut(`${url}/${itemId}`, { public: false }, (err, res) => {
      success(err, res)
      done()
    })
  })


  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPut(`${url}/${itemId}`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })


  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    requestPut(`${url}/${itemId}`, post_put_500_shemaError_item, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 404 - id not found', (done) => {
    requestPut(`${url}/12345`, item, (err, res) => {
      error404(err, res)
      done()
    })
  })
})


describe(`/DELETE ${title}:id`, () => {
  step('should success delete', (done) => {
    requestDelete(`${url}/${itemId}`, (err, res) => {
      success(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    requestDelete(`${url}/779988777`, (err, res) => {
      error404(err, res)
      done()
    })
  })
})