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

const url = '/entities'
const title = url.replace('/', '')

const item = {
  eType: 'color',
  eTypeTitle: 'Цвета',
  value: 'ТЕСТОВЫЙ СИРЕНЕВЫЙ',
  extra: {}
}

const post_put_500_shemaError_item = {
  ...item,
  eTypeTitle: false,
  value: 9
}

const update_200_success = {
  ...item,
  eType: 'TEST',
  eTypeTitle: 'ТЕСТ',
  value: 'ОБНОВЛЕННЫЙ ТЕСТОВЫЙ СИРЕНЕВЫЙ',
  extra: {}
}

let itemId = 0


const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('eType')
  res.body.should.all.have.property('eTypeTitle')
  res.body.should.all.have.property('value')
  res.body.should.all.have.property('extra')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('eType')
  res.body.should.have.property('eTypeTitle')
  res.body.should.have.property('value')
  res.body.should.have.property('extra')
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

  it('all items where eTypeTitle = Упаковка and eType = packing', (done) => {
    request(`${url}?all=true&eTypeTitle=%D0%A3%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0&eType=packing`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.eTypeTitle === 'Упаковка'
        && item.eType === 'packing')).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request(`${url}?all=true&eTypeTitle=testtesttest`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only item where extra=false', (done) => {
    request(`${url}?extra=false`, (err, res) => {
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

  it('ERROR 404 - by id, eType not found', (done) => {
    request(`${url}/${itemId}?all=true&eType=testMyR`, (err, res) => {
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


  step('Update item success ONLY eType=stability', (done) => {
    requestPut(`${url}/${itemId}`, { eType: 'stability' }, (err, res) => {
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