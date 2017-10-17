const debug = require('../modules/debug')('cookie-parser')

const parseCookie = req => {
  debug('parseCookie()', req.headers.cookie)

  if (!req.headers.cookie) return {}

  return req.headers.cookie.split(';').reduce((obj, pair) => {
    pair = pair.trim()
    const k = pair.split('=')[0].trim()
    const v = pair.split('=')[1].trim()
    obj[k] = v
    return obj
  }, {})
}

const cookieParser = (req, res, next) => {
  if (!req.cookies) {
    req.cookies = parseCookie(req)
  }

  next()
}

module.exports = () => cookieParser