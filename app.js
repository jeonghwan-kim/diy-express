const fs = require('fs')
const path = require('path')
const staticServe = require('./modules/static-serve')
const debug = require('./modules/debug')('app')
const app = require('./modules/application')()

debug('app is initiated')

const index = (req, res, next) => {
  if (req.url !== '/') return next()

  const publicPath = path.join(__dirname, './public')
  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    res.end(data)
  })
}

const error404 = (req, res, next) => {
  res.statusCode = 404
  res.end('Not Found')
}

const error = (err, req, res, next) => {
  debug('err mw:', err.message || err)
  res.statusCode = 500
  res.end()
}

app.use(staticServe())
app.use(index)
app.use(error404)
app.use(error)

module.exports = app