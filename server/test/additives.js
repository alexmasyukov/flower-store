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


const additive = {
  city_id: 1,
  public: true,
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

let additiveId = 0



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




describe('/GET additives', () => {
  it('all the additives, every has id, city_id, public', (done) => {
    request('/additives', (err, res) => {
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

  // it('only additives where is_florist=false', (done) => {
  //   request('/additives?is_florist=false', (err, res) => {
  //     successArray(err, res)
  //     necessaryFieldsInArray(err, res)
  //     expect(res.body.every(item => item.is_florist === false)).to.be.true
  //     done()
  //   })
  // })

  it('ERROR 404', (done) => {
    request('/additives?title=ertwtwd&public=false&city_id=555', (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only additives where is_florist="123"', (done) => {
    request('/additives?city_id=rew', (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe('/GET additives/:id', () => {
  it('only additive by id=1', (done) => {
    request('/additives/1', (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 1)
      done()
    })
  })

  it('should get additive without error of not exist field testField', (done) => {
    request('/additives/1?testField=1234', (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 1)
      done()
    })
  })

  it('ERROR 404 - by id, but city_id not found', (done) => {
    request('/additives/1?city_id=3332', (err, res) => {
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


describe('/POST additives', () => {
  step('Add new additive', (done) => {
    requestPost('/additives', additive, (err, res) => {
      success(err, res)
      additiveId = res.body.result
      done()
    })
  })

  step('ERROR 500 - new additive', (done) => {
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
})



describe('/PUT additives:id', () => {
  step('Update additive success', (done) => {
    const updateItem = {
      ...additive,
      cart_title: "Тест Обновление",
      data: []
    }

    requestPut(`/additives/${additiveId}`, updateItem, (err, res) => {
      success(err, res)
      done()
    })
  })

  step('ERROR 500 - update additive', (done) => {
    const updatePerson = {
      ...additive,
      cart_title: true,
      data: "333"
    }

    requestPut(`/additives/${additiveId}`, updatePerson, (err, res) => {
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
    requestDelete(`/additives/${additiveId}`, (err, res) => {
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