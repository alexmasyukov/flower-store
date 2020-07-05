const {
  step,
  expect,
  error404,
  error500_schemaFailed,
  success,
  successItem,
  successArray,
} = require('./common')

delete require.cache[require.resolve('./auth')]

const {
  request,
  requestPost,
  requestDelete,
  requestPut,
  loguot
} = require('./auth')

const banner = {
  city_id: 1,
  public: false,
  order: 888,
  title: "Тестовый",
  images: [
    "ТЕСТ ФОТО"
  ]
}

let itemId = 0



const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('title')
  res.body.should.all.have.property('images')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('city_id')
  res.body.should.have.property('title')
  res.body.should.have.property('images')
}



describe('/POST banners', () => {
  step('Add new banner', (done) => {
    requestPost('/banners', banner, (err, res) => {
      success(err, res)
      itemId = res.body.result
      done()
    })
  })

  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    const newItem = {
      ...banner,
      public: "df",
      title: true,
      images: {}
    }

    requestPost('/banners', newItem, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })


  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPost(`/banners`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})



describe('/GET banners', () => {
  it('all the banners, every has id, city_id, public', (done) => {
    request('/banners?all=true', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      done()
    })
  })

  it('all the banners where public = false and city_id = 1', (done) => {
    request('/banners?public=false&city_id=1', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.public === false && item.city_id === 1)).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request('/banners?title=ertwtwd&public=false&city_id=555', (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only item where city_id=rew', (done) => {
    request('/banners?city_id=rew', (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe('/GET banners/:id', () => {
  it(`only banner by id=${itemId}`, (done) => {
    request(`/banners/${itemId}?all=true`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  it('should get banner without error of not exist field testField', (done) => {
    request(`/banners/${itemId}?all=true&testField=1234`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  it('ERROR 404 - by id, but city_id not found', (done) => {
    request(`/banners/${itemId}?all=true&city_id=3332`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    request('/banners/1234567890', (err, res) => {
      error404(err, res)
      done()
    })
  })
})


describe('/PUT banners:id', () => {
  step('Update item success several filelds', (done) => {
    const updateItem = {
      ...banner,
      city_id: 1,
      public: false,
      order: 999,
      title: "ОБНОВЛЕНО",
      images: ['test']
    }

    requestPut(`/banners/${itemId}`, updateItem, (err, res) => {
      success(err, res)
      done()
    })
  })


  step('Update item success ONLY public field', (done) => {
    const updateItem = {
      public: false
    }

    requestPut(`/banners/${itemId}`, updateItem, (err, res) => {
      success(err, res)
      done()
    })
  })


  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPut(`/banners/${itemId}`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })


  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    const updatePerson = {
      ...banner,
      title: true,
      images: "333"
    }

    requestPut(`/banners/${itemId}`, updatePerson, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 404 - id not found', (done) => {
    requestPut('/banners/1234567890', banner, (err, res) => {
      error404(err, res)
      done()
    })
  })
})


describe('/DELETE banners/:id', () => {
  step('should success delete', (done) => {
    requestDelete(`/banners/${itemId}`, (err, res) => {
      success(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    requestDelete('/banners/779988777', (err, res) => {
      error404(err, res)
      done()
    })
  })
})

loguot()