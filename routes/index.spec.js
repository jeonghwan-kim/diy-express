const request = require('supertest')
const assert = require('assert')
const app = require('../app')

describe('GET /', () => {
  it('return 200', done => {
    request(app.server).
      get('/').
      expect(200).
      expect('Content-Type', 'text/html').
      end(done)
  })
})