const fs = require('fs')
const path = require('path')
const debug = require('../modules/debug')('index2')

const viewPath = path.join(__dirname, '../views')

const findPartials = text => {
  let partialName = text.match(/include '.*\.view'/)

  if (!partialName) return {text, partialName}

  partialName = partialName[0].replace(/include '(.*\.view)'/, '$1')
  text = text.replace(/include '(.*\.view)'/, '{{{$1}}}')

  return {text, partialName}
}

const render = (html, cb) => {
  let {text, partialName} = findPartials(html)
  debug(text, partialName)

  if (!partialName) return cb(html)

  fs.readFile(`${viewPath}/${partialName}`, (err, file) => {
    if (err) throw err

    text = text.replace(`{{{${partialName}}}}`, file.toString())
    render(text, cb)
  })
}

const index = (req, res, next) => {
  fs.readFile(`${viewPath}/index.view`, (err, file) => {
    if (err) return next(err)

    render(file.toString(), html => {
      res.set('Content-Type', 'text/html').send(html)
    })

  })
}

module.exports = {index}