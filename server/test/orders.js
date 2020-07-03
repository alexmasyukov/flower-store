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

const url = '/orders'
const title = url.replace('/', '')

const item = {
  city_id: 1,
  customer_id: 1,
  complete: false,
  steps: {},
  products: {},
}

const post_put_500_shemaError_item = {
  customer_id: '434',
  complete: 'true',
  steps: false
}

const update_200_success = {
  ...item,
  complete: false,
  steps: {test: ['1', '3', 4]},
  products: {test: ['1', '3', 4]}
}

let itemId = 0


const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('customer_id')
  res.body.should.all.have.property('complete')
  res.body.should.all.have.property('steps')
  res.body.should.all.have.property('products')
  // todo: add customer object
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('city_id')
  res.body.should.have.property('customer_id')
  res.body.should.have.property('complete')
  res.body.should.have.property('steps')
  res.body.should.have.property('products')
  // todo: add customer object
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

  it('all items where complete = true and city_id = 1', (done) => {
    request(`${url}?all=true&complete=true&city_id=1`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.complete === true && item.city_id === 1)).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request(`${url}?all=true&customer_id=5553&complete=false&city_id=555`, (err, res) => {
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
    requestPut(`${url}/${itemId}`, update_200_success, (err, res) => {
      success(err, res)
      done()
    })
  })


  step('Update item success ONLY public field', (done) => {
    requestPut(`${url}/${itemId}`, { complete: false }, (err, res) => {
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
    requestPut(`${url}/1234567890`, item, (err, res) => {
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