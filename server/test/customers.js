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

const url = '/customers'
const title = url.replace('/', '')

const item = {
  city_id: 1,
  phone: '79967778899',
  name: 'Юнона',
  points: 100,
  last_sms_code: ''
}

const post_put_500_shemaError_item = {
  ...item,
  phone: 89145678899,
  points: '100',
  instagram: false
}

const update_200_success = {
  ...item,
  phone: 'update phone',
  name: '@Telegram'
}

let itemId = 0


const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('phone')
  res.body.should.all.have.property('name')
  res.body.should.all.have.property('points')
  res.body.should.all.have.property('last_sms_code')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('city_id')
  res.body.should.have.property('phone')
  res.body.should.have.property('name')
  res.body.should.have.property('points')
  res.body.should.have.property('last_sms_code')
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

  it('all items where city_id = 1', (done) => {
    request(`${url}?all=true&city_id=1`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.city_id === 1)).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request(`${url}?all=true&phone=ertwtwd&city_id=555`, (err, res) => {
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


  step('Update item success ONLY name TEST', (done) => {
    requestPut(`${url}/${itemId}`, { name: 'NAME' }, (err, res) => {
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