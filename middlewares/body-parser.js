const debug = require('../modules/debug')('body-parser')

const bodyParser = (req, res, next) => {
  let data = []
  req.on('data', chunk => {
    debug('data', chunk)
    data.push(chunk)
  })

  req.on('end', () => {
    data = Buffer.concat(data).toString();
    debug('end', data)

    const body = data.split('&').reduce((body, pair) => {
      if (!pair) return body
      const frg = pair.split('=')
      body[frg[0]] = frg[1]
      return body
    }, {})

    debug('body', body)
    req.body = body
    next()
  })
}

module.exports = () => bodyParser