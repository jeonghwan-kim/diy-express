const debug = require('../modules/debug')('error')

const error404 = (req, res, next) => {
  res.status(404).send('Not Found')
}

const error = (err, req, res, next) => {
  debug('err mw:', err.message || err)
  res.status(500).send()
}

module.exports = {error404, error}