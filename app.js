const path = require('path')
const staticServe = require('./middlewares/static-serve')
const bodyParser = require('./middlewares/body-parser')
const errors = require('./middlewares/errors')
const logger = require('./middlewares/logger')
const cookieParser = require('./middlewares/cookie-parser')
const pageviewCounter = require('./middlewares/pageview-counter')
const session = require('./middlewares/session')
const debug = require('./modules/debug')('app')
const app = require('./modules/application')()
const index = require('./routes/index')

debug('app is initiated')

app.set('views', path.join(__dirname, './views'))

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(staticServe())
app.use(bodyParser())
app.use(cookieParser())
app.use(session())
app.use(pageviewCounter())

app.get('/api/posts', require('./routes/api/post').index)
app.post('/api/posts', require('./routes/api/post').create)
app.delete('/api/posts', require('./routes/api/post').destroy)

app.post('/api/auth/login', require('./routes/api/auth').login)
app.get('/api/auth/logout', require('./routes/api/auth').logout)
app.get('/api/auth/me', require('./routes/api/auth').me)

app.get('/hello-world', require('./routes/hello-world'))
app.get('/new.html', index.newPost)
app.get('/index.html', index.listPost)
app.get('/login.html', index.login)
app.get('/me.html', index.me)
app.get('/', index.listPost)

app.use(errors.error404)
app.use(errors.error)

module.exports = app