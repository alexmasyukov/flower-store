let chai = require('chai')
let chaiHttp = require('chai-http')
let chaiThings = require('chai-things')
let { step } = require('mocha-steps')
// let server = require('../server');
chai.should()
let expect = chai.expect
let assert = chai.assert

chai.use(chaiHttp)
chai.use(chaiThings)

const apiUrl = 'http://localhost/api/v1'

const request = (url, endHandler) => {
  chai.request(apiUrl)
    .get(url)
    .end(endHandler)
}

const requestDelete = (url, endHandler) => {
  chai.request(apiUrl)
    .delete(url)
    .end(endHandler)
}

const requestPost = (url, body, endHandler) => {
  chai.request(apiUrl)
    .post(url)
    .set('content-type', 'application/json')
    .send(body)
    .end(endHandler)
}

const requestPut = (url, body, endHandler) => {
  chai.request(apiUrl)
    .put(url)
    .set('content-type', 'application/json')
    .send(body)
    .end(endHandler)
}


const error404 = (err, res) => {
  res.should.have.status(404)
  res.body.should.be.a('object')
  res.body.should.have.property('status', 'error')
}

const error500_schemaFailed = (err, res) => {
  res.should.have.status(500)
  res.body.should.be.a('object')
  res.body.should.have.property('status', 'failed')
}

const successItem = (err, res) => {
  expect(err).to.be.null
  res.should.have.status(200)
  res.body.should.be.a('object')
}

const success = (err, res) => {
  successItem(err, res)
  res.body.should.have.property('status', 'done')
  res.body.should.have.property('result')
}

const successArray = (err, res) => {
  expect(err).to.be.null
  res.should.have.status(200)
  res.body.should.be.a('array')
  assert.isAtLeast(res.body.length, 1, 'greater or equal to 1')
}

module.exports = {
  step,
  expect,
  assert,
  request,
  requestDelete,
  requestPost,
  requestPut,
  error404,
  error500_schemaFailed,
  success,
  successItem,
  successArray
}




// describe('/POST team', () => {
//   step('Add new person', function(done) {
//     chai.request(url)
//       .post('/team')
//       .send(person)
//       .end((err, res) => {
//         res.should.have.status(200)
//         res.body.should.be.a('object')
//         res.body.should.have.property('status', 'done')
//         res.body.should.have.property('result')
//         // res.body.should.have.property('errors');
//         // res.body.errors.should.have.property('pages');
//         // res.body.errors.pages.should.have.property('kind').eql('required');
//         personId = res.body.result
//         done()
//       })
//   })
//
//   function personError(person, errorHandler, done) {
//     chai.request(url)
//       .post('/team')
//       .send(person)
//       .end((err, res) => {
//         expect(err).to.be.null
//         res.should.have.status(500)
//         res.body.should.be.a('object')
//         res.body.should.have.property('status', 'error')
//         errorHandler(err, res)
//         // res.body.should.have.property('result')
//         // res.body.should.have.property('errors');
//         // res.body.errors.should.have.property('pages');
//         // res.body.errors.pages.should.have.property('kind').eql('required');
//         done()
//       })
//   }
//
//   step('get error: NOT cityId field', function(done) {
//     const { cityId, ...broken } = person
//     const errorHandler = (err, res) => {
//       console.log('errorHandler', err, res)
//     }
//     personError(broken, errorHandler, done)
//   })
//
//   step('Delete new person', function(done) {
//     chai.request(url)
//       .delete(`/team/${personId}`)
//       .end((err, res) => {
//         res.should.have.status(200)
//         res.body.should.be.a('object')
//         res.body.should.have.property('status', 'done')
//         done()
//       })
//   })
//
//   step('check my balance', function() {
//
//   })
//
//   ms.xstep('temporarily ignored', function() {
//
//   })
// })
//
// describe('/POST team', () => {

//
//   it('it should get Person by new id', (done) => {
//     chai.request(url)
//       .get('/team/' + personId)
//       .end((err, res) => {
//         res.should.have.status(200)
//         res.body.should.be.a('object')
//         console.log(res.body)
//         // res.body.should.have.property('status', 'done')
//         // res.body.should.have.property('result')
//         // res.body.should.have.property('errors');
//         // res.body.errors.should.have.property('pages');
//         // res.body.errors.pages.should.have.property('kind').eql('required');
//         personId = res.body.result
//         console.log(res.body.result)
//         done()
//       })
//   })
// })
