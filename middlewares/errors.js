const debug = require('../modules/debug')('error')

const error404 = (req, res, next) => {
  res.statusCode = 404
  res.end('Not Found')
}

const error = (err, req, res, next) => {
  debug('err mw:', err.message || err)
  res.statusCode = 500
  res.end()
}

module.exports = {error404, error}