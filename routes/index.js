const fs = require('fs')
const path = require('path')

const index = (req, res, next) => {
  if (req.url !== '/') return next()

  const publicPath = path.join(__dirname, '../public')
  fs.readFile(`${publicPath}/index.html`, (err, data) => {
    if (err) throw err

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    res.end(data)
  })
}

module.exports = index