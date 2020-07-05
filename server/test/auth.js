const {
  step,
  expect,
  request: Get,
  requestDelete: Delete,
  requestPost: Post,
  requestPut: Put
} = require('./common')


const auth = {
  "username": "test",
  "password": "1234"
}

let Cookies

const request = (...args) => Cookies ? Get(...args, Cookies) : Get(...args)
const requestPost = (...args) => Cookies ? Post(...args, Cookies) : Post(...args)
const requestDelete = (...args) => Cookies ? Delete(...args, Cookies) : Delete(...args)
const requestPut = (...args) => Cookies ? Put(...args, Cookies) : Put(...args)

describe('AUTH /login', () => {
  step('/login', (done) => {
    requestPost('/login', auth, (err, res) => {
      // console.log(res.headers['set-cookie'])
      if (res.headers['set-cookie'])
        Cookies = res.headers['set-cookie'].pop().split(';')[0]
      done()
    })
  })

//
  step('AVAILABLE TEST', (done) => {
    request('/test', (err, res) => {
      expect(err).to.be.null
      res.should.have.status(200)
      // res.body.should.be.a('object')
      // console.log(res.body)

      // success(err, res)
      // itemId = res.body.result
      done()
    })
  })
})

function loguot() {
  describe('AUTH /logout', () => {
    step('/logout', (done) => {
      request('/logout', (err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
}

module.exports = {
  request,
  requestPost,
  requestDelete,
  requestPut,
  loguot
}