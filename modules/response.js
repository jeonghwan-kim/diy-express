const fs = require('fs')

const respose = (res, appData) => {
  if (!res) throw Error('res is required')

  res.status = res.status || (code => {
    res.statusCode = code
    return res
  })

  res.set = res.set || ((key, value) => {
    res.setHeader(key, value)
    return res
  })

  res.send = res.send || (text => {
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'text/plain')
    }
    res.end(text)
  })

  res.json = res.json || (data => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  })

  res.render = res.render || ((view, data) => {
    if (!appData.views) throw Error('views path is required')

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

  res.cookie = (name, value) => {
    res.set('Set-Cookie', [`${name}=${value}`])
  }

  return res
}

module.exports = respose