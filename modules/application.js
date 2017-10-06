const http = require('http')
const debug = require('./debug')('application')
const request = require('./request')
const response = require('./response')

Function.prototype.clone = function() {
  var that = this;
  var temp = function temporary() { return that.apply(this, arguments); };
  for( key in this ) {
    temp[key] = this[key];
  }
  return temp;
};

const Application = () => {
  const appData = {}

  const server = http.createServer((req, res) => {
    req = request(req)
    res = response(res, appData)

    const runMw = (middlewares, i, err) => {
      if (i < 0 || i >= middlewares.length) return;

      const nextMw = middlewares[i]
      debug(`runMw(middlewares, ${i}, ${err ? err.message || err : null})`)
      debug(`nextMw: ${nextMw.name} ${nextMw.length}`)

      const next = () => e => runMw(middlewares, i + 1, e)
      if (err) {
        debug(err)
        const isErrorMw = mw => mw.length === 4
        if (isErrorMw(nextMw)) nextMw(err, req, res, next())
        return runMw(middlewares, i + 1, err)
      }

      if (nextMw.__path) {
        debug(nextMw.__path, req.path)
        const isMatched = req.path === nextMw.__path && req.method.toLowerCase() === (nextMw.__method || 'get')
        if (isMatched) return nextMw(req, res, next())
        else return runMw(middlewares, i + 1)
      }

      return nextMw(req, res, next())
    }

    runMw(middlewares, 0, null)
  })

  let middlewares = []

  const use = (path, fn) => {
    if (fn) debug(`use(${path}, ${fn.name})`)
    else debug(`use(${path.name})`)

    if (typeof path === 'string' && typeof fn === 'function') {
      fn = fn.clone()
      fn.__path = path
    } else if (typeof path == 'function') {
      fn = path
    } else {
      throw Error(`Usage: use(path, fn) or use(fn) typeof fn: ${typeof fn}`)
    }

    middlewares.push(fn)
  }

  const get = (path, fn) => {
    if (!path || !fn) throw Error('path and fn is required')
    fn = fn.clone()
    fn.__method = 'get'
    use(path, fn)
  };

  const post = (path, fn) => {
    if (!path || !fn) throw Error('path and fn is required')
    fn = fn.clone()
    fn.__method = 'post'
    use(path, fn)
  };

  const destroy = (path, fn) => {
    if (!path || !fn) throw Error('path and fn is required')
    fn = fn.clone()
    fn.__method = 'delete'
    use(path, fn)
  }

  const listen = (port = 3000, hostname = '127.0.0.1', fn) => {
    debug('listen()')
    server.listen(port, hostname, fn)
  }

  const set = (key, value) => {
    appData[key] = value
  }

  return {
    use,
    get,
    post,
    delete: destroy,
    listen,
    server,
    set,
  }
}

module.exports = Application