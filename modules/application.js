const http = require('http')
const fs = require('fs')
const path = require('path')
const debug = require('./debug')('application')
const request = require('./request')
const response = require('./response')

const Application = () => {
  const server = http.createServer((req, res) => {
    req = request(req)
    res = response(res)
    res = createRenderFn(res)

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
      fn.__path = path
    } else if (typeof path == 'function') {
      fn = path
    } else {
      throw Error('Usage: use(path, fn) or use(fn)')
    }

    middlewares.push(fn)
  }

  const get = (path, fn) => {
    if (!path || !fn) throw Error('path and fn is required')
    fn.__method = 'get'
    use(path, fn)
  };

  const post = (path, fn) => {
    if (!path || !fn) throw Error('path and fn is required')
    fn.__method = 'post'
    use(path, fn)
  };

  const destroy = (path, fn) => {
    if (!path || !fn) throw Error('path and fn is required')
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

  const appData = {}

  const createRenderFn = (res) => {
    if (!appData.views) throw Error('views path is required')

    res.render = ((view, data) => {
      fs.readFile(`${appData.views}/${view}.view`, (err, file) => {
        if (err) return next(err)
        render(file.toString(), html => {

          Object.keys(data).forEach(key => {
            html = html.replace(RegExp(`{{*${key}}}`, 'g'), data[key])
          })

          res.set('Content-Type', 'text/html').send(html)
        })
      })
    })

    return res
  }

  const render = (html, cb) => {
    let {text, partialName} = findPartials(html)

    if (!partialName) return cb(html)

    fs.readFile(`${appData.views}/${partialName}`, (err, file) => {
      if (err) throw err

      text = text.replace(`{{{${partialName}}}}`, file.toString())
      render(text, cb)
    })
  }

  const findPartials = text => {
    let partialName = text.match(/include '.*\.view'/)

    if (!partialName) return {text, partialName}

    partialName = partialName[0].replace(/include '(.*\.view)'/, '$1')
    text = text.replace(/include '(.*\.view)'/, '{{{$1}}}')

    return {text, partialName}
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