const staticServe = require('./middlewares/static-serve')
const errors = require('./middlewares/errors')
const debug = require('./modules/debug')('app')
const app = require('./modules/application')()

debug('app is initiated')

app.use(staticServe())
app.use(require('./routes/hello-world'))
app.use(require('./routes/index'))
app.use(errors.error404)
app.use(errors.error)

module.exports = app