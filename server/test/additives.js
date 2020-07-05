const {
  step,
  expect,
  error404,
  error500_schemaFailed,
  success,
  successItem,
  successArray
} = require('./common')

delete require.cache[require.resolve('./auth')]

const {
  request,
  requestPost,
  requestDelete,
  requestPut,
  loguot
} = require('./auth')

const additive = {
  city_id: 1,
  public: false,
  order: 333,
  title: "Тестовое дополнение",
  data: [
    {
      order: 0,
      button: "Да",
      price: 888,
      image: "image"
    },
    {
      order: 1,
      button: "Нет",
      price: 99999,
      image: "image 1"
    }
  ],
  cart_title: "Тест"
}

let itemId = 0


const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('data')
  res.body.should.all.have.property('public')
  res.body.should.all.have.property('cart_title')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('city_id')
  res.body.should.have.property('data')
  res.body.should.have.property('public')
  res.body.should.have.property('cart_title')
}

describe('/POST additives', () => {
  it('Add new additive', (done) => {
    requestPost('/additives', additive, (err, res) => {
      success(err, res)
      itemId = res.body.result
      done()
    })
  })

  it('ERROR 500 - schema error, wrong types of fields', (done) => {
    const newItem = {
      ...additive,
      cart_title: true,
      data: "333"
    }

    requestPost('/additives', newItem, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  it('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPost(`/additives`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})


describe('/GET additives/:id', () => {
  step(`only additive by id=${itemId}`, (done) => {
    request(`/additives/${itemId}?all=true`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  step('should get additive without error of not exist field testField', (done) => {
    request(`/additives/${itemId}?all=true&testField=1234`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  it('ERROR 404 - by id, but city_id not found', (done) => {
    request(`/additives/${itemId}?all=true&city_id=3332`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    request('/additives/1234567890', (err, res) => {
      error404(err, res)
      done()
    })
  })
})

describe('/GET additives', () => {
  it('all the additives, every has id, city_id, public', (done) => {
    request('/additives?all=true', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      done()
    })
  })

  it('all the additives where public = false and city_id = 1', (done) => {
    request('/additives?public=false&city_id=1', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.public === false && item.city_id === 1)).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request('/additives?title=ertwtwd&public=false&city_id=555', (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only items where city_id=rew', (done) => {
    request('/additives?city_id=rew', (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe('/PUT additives:id', () => {
  step('Update item success several filelds', (done) => {
    const updateItem = {
      ...additive,
      title: 'ОБНОВЛЕНО',
      cart_title: "Тест Обновление",
      data: []
    }

    requestPut(`/additives/${itemId}`, updateItem, (err, res) => {
      success(err, res)
      done()
    })
  })

  step('Update item success ONLY public field', (done) => {
    const updateItem = {
      public: false
    }

    requestPut(`/additives/${itemId}`, updateItem, (err, res) => {
      success(err, res)
      done()
    })
  })

  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPut(`/additives/${itemId}`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    const updatePerson = {
      ...additive,
      cart_title: true,
      data: "333"
    }

    requestPut(`/additives/${itemId}`, updatePerson, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 404 - id not found', (done) => {
    requestPut('/additives/1234567890', additive, (err, res) => {
      error404(err, res)
      done()
    })
  })
})

describe('/DELETE additives/:id', () => {
  step('should success delete', (done) => {
    requestDelete(`/additives/${itemId}`, (err, res) => {
      success(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    requestDelete('/additives/779988777', (err, res) => {
      error404(err, res)
      done()
    })
  })
})

loguot()