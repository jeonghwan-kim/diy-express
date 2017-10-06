const request = require('supertest')
const assert = require('assert')
const app = require('../../app')

describe('GET /api/posts', () => {
  describe('no querystring', () => {
    let res
    beforeEach('200, json', done => {
      request(app.server).
        get('/api/posts').
        expect(200).
        expect('Content-Type', 'application/json').
        end((err, _res) => {
          if (err) throw err
          res = _res
          done()
        })
    })

    it('array 응답', () => {
      assert.equal(res.body.list instanceof Array, true)
    })

    it('title, body 응답', () => {
      res.body.list.forEach(post => {
        assert.equal(Object.keys(post).includes('title'), true)
        assert.equal(Object.keys(post).includes('body'), true)
      })
    })
  })

  describe('querystring', () => {
    it('limit, page에 맞는 응답을 한다', (done) => {
      const limit = 2

      request(app.server).
        get(`/api/posts?limit=${limit}`).
        expect(res => {
          assert.equal(res.body.list.length, limit)
        }).
        end(done)
    })
  })
});

describe('POST /api/posts', () => {
  it('201, new post object',done=> {
    request(app.server).
      post('/api/posts').
      send('title=newtitle&body=newbody').
      expect(201).
      expect(res => {
        assert.equal(res.body.title, 'newtitle')
        assert.equal(res.body.body, 'newbody')
      }).
      end(done)
  })
  it('400', done=> {
    request(app.server).
      post('/api/posts').
      expect(400).
      end(done)
  })

})