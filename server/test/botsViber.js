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

const url = '/bot-viber'
const title = url.replace('/', '')

let item = {}

const post_put_500_shemaError_item = {
  ...item,
  token: 12344
}

const update_200_success = {
  ...item,
  city_id: 2,
  token: 'update'
}


const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('city_id')
  res.body.should.have.property('token')
  res.body.should.have.property('subscribe_password')
  res.body.should.have.property('notify_subscribers')
  res.body.should.have.property('extra')
  res.body.should.have.property('expose_url')
  res.body.should.have.property('expose_url_dev')
}


describe(`/GET ${title}:id`, () => {
  it('only item by id=1', (done) => {
    request(`${url}/1`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 1)
      item = res.body
      done()
    })
  })

  it('get item without error (param testField should be removed)', (done) => {
    request(`${url}/1?all=true&testField=1234`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 1)
      done()
    })
  })

  it('ERROR 404 - by id, city_id not found', (done) => {
    request(`${url}/1?all=true&city_id=3332`, (err, res) => {
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
    requestPut(`${url}/1?all=true&`, update_200_success, (err, res) => {
      success(err, res)
      done()
    })
  })


  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPut(`${url}/1?all=true&`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })


  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    requestPut(`${url}/1`, post_put_500_shemaError_item, (err, res) => {
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

  step('Update item success several filelds - prev data', (done) => {
    requestPut(`${url}/1`, item, (err, res) => {
      success(err, res)
      done()
    })
  })
})
