const staticServe = require('./middlewares/static-serve')
const bodyParser = require('./middlewares/body-parser')
const errors = require('./middlewares/errors')
const logger = require('./middlewares/logger')
const debug = require('./modules/debug')('app')
const app = require('./modules/application')()

debug('app is initiated')

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(staticServe())
app.use(bodyParser())

app.get('/api/posts', require('./routes/api/post').index)
app.post('/api/posts', require('./routes/api/post').create)
app.get('/hello-world', require('./routes/hello-world'))
app.get('/', require('./routes/index'))

app.use(errors.error404)
app.use(errors.error)

module.exports = app