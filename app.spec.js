const request = require('supertest')
const assert = require('assert')
const app = require('./app')

describe('static files', () => {
  it('js가 응답되어야 한다', done => {
    request(app.server).
      get('/script.js').
      expect(200).
      expect('Content-Type', 'text/javascript').
      end(done)
  })
})