const {
  step,
  error404,
  error500_schemaFailed,
  success,
  successItem,
  request,
  requestPut
} = require('./common')

const url = '/products-sizes'
const title = url.replace('/', '')

const post_put_500_shemaError_item = {
  public: 123
}

const update_200_success = {
  public: true
}

const itemId = 60

const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('product_id')
  res.body.should.all.have.property('order')
  res.body.should.all.have.property('public')
  res.body.should.all.have.property('fast')
  res.body.should.all.have.property('title')
  res.body.should.all.have.property('price')
  res.body.should.all.have.property('diameter')
  res.body.should.all.have.property('flowers')
  res.body.should.all.have.property('flowers_counts')
  res.body.should.all.have.property('images')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('city_id')
  res.body.should.have.property('product_id')
  res.body.should.have.property('order')
  res.body.should.have.property('public')
  res.body.should.have.property('fast')
  res.body.should.have.property('title')
  res.body.should.have.property('price')
  res.body.should.have.property('diameter')
  res.body.should.have.property('flowers')
  res.body.should.have.property('flowers_counts')
  res.body.should.have.property('images')
}


describe(`/GET ${title}:id`, () => {
  it('only item by id=60', (done) => {
    request(`${url}/60?all=true`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 60)
      done()
    })
  })

  it('get item without error (param testField should be removed)', (done) => {
    request(`${url}/60?all=true&testField=1234`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 60)
      done()
    })
  })

  it('ERROR 404 - by id, city_id not found', (done) => {
    request(`${url}/60?all=true&city_id=3332`, (err, res) => {
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
    requestPut(`${url}/${itemId}`, { public: true }, (err, res) => {
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
    requestPut(`${url}/1234567890`, update_200_success, (err, res) => {
      error404(err, res)
      done()
    })
  })
})