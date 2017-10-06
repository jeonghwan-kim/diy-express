const path = require('path')
const staticServe = require('./middlewares/static-serve')
const bodyParser = require('./middlewares/body-parser')
const errors = require('./middlewares/errors')
const logger = require('./middlewares/logger')
const debug = require('./modules/debug')('app')
const app = require('./modules/application')()

debug('app is initiated')

app.set('views', path.join(__dirname, './views'))

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(staticServe())
app.use(bodyParser())

app.get('/api/posts', require('./routes/api/post').index)
app.post('/api/posts', require('./routes/api/post').create)
app.delete('/api/posts', require('./routes/api/post').destroy)
app.get('/hello-world', require('./routes/hello-world'))
app.get('/', require('./routes/index'))
app.get('/index2.html', require('./routes/index2').index)

app.use(errors.error404)
app.use(errors.error)

module.exports = app