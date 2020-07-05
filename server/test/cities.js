const {
  expect,
  error404,
  error500_schemaFailed,
  successItem,
  successArray
} = require('./common')

const {
  request,
  requestPost,
  requestDelete,
  requestPut,
  loguot
} = require('./auth')

delete require.cache[require.resolve('./auth')]

const url = '/cities'
const title = url.replace('/', '')

const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('public')
  res.body.should.all.have.property('eng')
  res.body.should.all.have.property('rus')
  res.body.should.all.have.property('contacts')
  res.body.should.all.have.property('extra')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('id')
  res.body.should.have.property('public')
  res.body.should.have.property('eng')
  res.body.should.have.property('rus')
  res.body.should.have.property('contacts')
  res.body.should.have.property('extra')
}


describe(`/GET ${title}`, () => {
  it('all items', (done) => {
    request(`${url}?all=true`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      done()
    })
  })

  it('all items where public=true and eng=moscow', (done) => {
    request(`${url}?public=true&eng=moscow`, (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.public === true
        && item.eng === 'moscow')).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request(`${url}?all=true&eng=ertwtwd&public=false`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only item where public=888', (done) => {
    request(`${url}?public=888`, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe(`/GET ${title}:id`, () => {
  it('only item by id=1', (done) => {
    request(`${url}/1?all=true`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', 1)
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

  it('ERROR 404 - by id, eng not found', (done) => {
    request(`${url}/1?all=true&eng=URAL`, (err, res) => {
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

loguot()