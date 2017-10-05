const request = require('supertest')
const assert = require('assert')
const app = require('./app')

describe('static files', () => {
  it('js가 응답되어야 한다', done => {
    request(app.server).
      get('/js/script.js').
      expect(200).
      expect('Content-Type', 'text/javascript').
      end(done)
  })

  it('css가 응답되어야 한다', done => {
    request(app.server).
      get('/css/style.css').
      expect(200).
      expect('Content-Type', 'text/css').
      end(done)
  })

  it('html이 응답되어야 한다', done => {
    request(app.server).
      get('/index.html').
      expect(200).
      expect('Content-Type', 'text/html').
      end(done)
  })
})