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


const person = {
  city_id: 1,
  public: false,
  order: 22,
  is_florist: false,
  rule: "TEST",
  name: "TEST 2",
  photo: "TEST 3",
  instagram: "TEST 4"
}

let itemId = 0


const necessaryFieldsInArray = (err, res) => {
  res.body.should.all.have.property('city_id')
  res.body.should.all.have.property('id')
  res.body.should.all.have.property('public')
}

const necessaryFields = (err, res) => {
  res.body.should.have.property('city_id')
  res.body.should.have.property('id')
  res.body.should.have.property('public')
}


describe('/POST team', () => {
  step('Add new person', (done) => {
    requestPost('/team', person, (err, res) => {
      success(err, res)
      itemId = res.body.result
      done()
    })
  })

  step('ERROR 500 - schema error, wrong types of fields', (done) => {
    const newPerson = {
      ...person,
      isFlorist: "554",
      public: "333"
    }

    requestPost('/team', newPerson, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPost(`/team`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe('/GET team', () => {
  it('all the persons, every has id, city_id, public', (done) => {
    request('/team?all=true', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      done()
    })
  })

  it('all the persons where public = false and city_id = 1', (done) => {
    request('/team?public=false&city_id=1', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.public === false && item.city_id === 1)).to.be.true
      done()
    })
  })

  it('only persons where is_florist=false', (done) => {
    request('/team?all=true&is_florist=false', (err, res) => {
      successArray(err, res)
      necessaryFieldsInArray(err, res)
      expect(res.body.every(item => item.is_florist === false)).to.be.true
      done()
    })
  })

  it('ERROR 404', (done) => {
    request('/team?is_florist=true&rule=prod&public=false&city_id=555', (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 500 - only persons where is_florist="123"', (done) => {
    request('/team?is_florist=123', (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })
})

describe('/GET team/:id', () => {
  it(`only person by id=${itemId}`, (done) => {
    request(`/team/${itemId}?all=true`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  it('should get person without error of not exist field testField', (done) => {
    request(`/team/${itemId}?all=true&testField=1234`, (err, res) => {
      successItem(err, res)
      necessaryFields(err, res)
      res.body.should.have.property('id', itemId)
      done()
    })
  })

  it('ERROR 404 - by id, but city_id not found', (done) => {
    request(`/team/${itemId}?all=true&city_id=3332`, (err, res) => {
      error404(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    request('/team/1234567890', (err, res) => {
      error404(err, res)
      done()
    })
  })
})


describe('/PUT team:id', () => {
  step('Update person success several filelds', (done) => {
    const updatePerson = {
      ...person,
      rule: 'Update rule',
      isFlorist: true,
      public: true
    }

    requestPut(`/team/${itemId}`, updatePerson, (err, res) => {
      success(err, res)
      done()
    })
  })

  step('Update person success ONLY public field', (done) => {
    const updatePerson = {
      public: false
    }

    requestPut(`/team/${itemId}`, updatePerson, (err, res) => {
      success(err, res)
      done()
    })
  })

  step('ERROR 500 - need minimun 1 properties in body', (done) => {
    requestPut(`/team/${itemId}`, {}, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 500 - update item', (done) => {
    const updatePerson = {
      ...person,
      isFlorist: "332",
      public: "323"
    }

    requestPut(`/team/${itemId}`, updatePerson, (err, res) => {
      error500_schemaFailed(err, res)
      done()
    })
  })

  step('ERROR 404 - id not found', (done) => {
    requestPut('/team/1234567890', person, (err, res) => {
      error404(err, res)
      done()
    })
  })
})


describe('/DELETE team/:id', () => {
  step('should success delete', (done) => {
    requestDelete(`/team/${itemId}`, (err, res) => {
      success(err, res)
      done()
    })
  })

  it('ERROR 404 - id not found', (done) => {
    requestDelete('/team/779988777', (err, res) => {
      error404(err, res)
      done()
    })
  })
})