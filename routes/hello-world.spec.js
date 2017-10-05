const request = require('supertest')
const assert = require('assert')
const app = require('../app')

describe('GET /hello-world', () => {
  it('200 text/plain', done => {
    request(app.server).
      get('/hello-world').
      expect(200).
      expect('Content-Type', 'text/plain').
      expect(res => {
        const expected = 'hello world'
        assert.equal(res.text, expected)
      }).
      end(done)
  })
})