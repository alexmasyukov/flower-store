let chai = require('chai')
let chaiHttp = require('chai-http')
let ms = require('mocha-steps')
// let server = require('../server');
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)

const url = 'http://localhost/api/v1'


let personId = 0
const person = {
  city_id: 1,
  public: true,
  order: 50,
  isFlorist: true,
  rule: "TEST RULE",
  name: "TEST",
  photo: "thumb_4b8b0e6d-cb63-4733-b4d0-6311c6ccb2a0.jpg",
  instagram: "INSSTAgr",
  extra: {}
}


describe('/GET team', () => {
  it('it should GET all the persons', (done) => {
    chai.request(url)
      .get('/team')
      .end((err, res) => {
        should.not.exist(err)
        should.exist(res)
        // doc.should.be.an('object')
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.above(1, 'is least 1')
        // res.body.to.include.something.that.has.property('id')
        done()
      })
  })
})

describe('/POST team', () => {
  ms.step('Add new person', function(done) {
    chai.request(url)
      .post('/team')
      .send(person)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status', 'done')
        res.body.should.have.property('result')
        // res.body.should.have.property('errors');
        // res.body.errors.should.have.property('pages');
        // res.body.errors.pages.should.have.property('kind').eql('required');
        personId = res.body.result
        done()
      })
  })

  function personError(person, errorHandler, done) {
    chai.request(url)
      .post('/team')
      .send(person)
      .end((err, res) => {
        expect(err).to.be.null
        res.should.have.status(500)
        res.body.should.be.a('object')
        res.body.should.have.property('status', 'error')
        errorHandler(err, res)
        // res.body.should.have.property('result')
        // res.body.should.have.property('errors');
        // res.body.errors.should.have.property('pages');
        // res.body.errors.pages.should.have.property('kind').eql('required');
        done()
      })
  }

  ms.step('get error: NOT cityId field', function(done) {
    const { cityId, ...broken } = person
    const errorHandler = (err, res) => {
      console.log('errorHandler', err, res)
    }
    personError(broken, errorHandler, done)
  })

  ms.step('Delete new person', function(done) {
    chai.request(url)
      .delete(`/team/${personId}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status', 'done')
        done()
      })
  })

  ms.step('check my balance', function() {

  })

  ms.xstep('temporarily ignored', function() {

  })
})
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
