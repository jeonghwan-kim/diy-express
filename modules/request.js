const debug = require('./debug')('request')

const request = req => {
  if (!req) throw Error('req is required')

  const partials = req.url.split('?')
  const path = partials[0]
  let qs = partials[1] || ''
  qs = qs.split('&').reduce((obj, p) => {
    const frag = p.split('=')
    obj[frag[0]] = frag[1]
    return obj
  }, {})

  debug(path, qs)
  req.path = req.path || path
  req.params = req.params || qs

  return req
}

module.exports = request