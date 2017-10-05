const http = require('http')
const debug = require('./debug')('application')
const request = require('./request')
const response = require('./response')

const Application = () => {
  const server = http.createServer((req, res) => {
    req = request(req)
    res = response(res)

    const runMw = (middlewares, i, err) => {
      if (i < 0 || i >= middlewares.length) return;

      const nextMw = middlewares[i]
      debug(`runMw(middlewares, ${i}, ${err ? err.message || err : null})`)
      debug(`nextMw: ${nextMw.name} ${nextMw.length}`)

      const next = () => e => runMw(middlewares, i + 1, e)
      if (err) {
        const isErrorMw = mw => mw.length === 4
        if (isErrorMw(nextMw)) nextMw(err, req, res, next())
        return runMw(middlewares, i + 1, err)
      }

      if (nextMw.__path) {
        if (req.path === nextMw.__path) return nextMw(req, res, next())
        else return runMw(middlewares, i + 1)
      }

      return nextMw(req, res, next())
    }

    runMw(middlewares, 0, null)
  })

  let middlewares = []

  return {
    use(path, fn) {
      if (fn) debug(`use(${path}, ${fn.name})`)
      else debug(`use(${path.name})`)

      if (typeof path === 'string' && typeof fn === 'function') {
        fn.__path = path
      } else if (typeof path == 'function') {
        fn = path
      } else {
        throw Error('Usage: use(path, fn) or use(fn)')
      }

      middlewares.push(fn)
    },
    listen(port = 3000, hostname = '127.0.0.1', fn) {
      debug('listen()')
      server.listen(port, hostname, fn)
    },
    server
  }
}

module.exports = Application