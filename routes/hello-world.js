
const helloWorld = (req, res, next) => {
  if (req.url !== '/hello-world') return next()

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
}

module.exports = helloWorld