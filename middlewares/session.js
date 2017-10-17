const debug = require('../modules/debug')('session')

const session = () => {
  const storage = new Map()

  const generateSession = () => {
    const sid = `s${Date.now()}`
    storage.set(sid, {sid})

    debug('generatreSession()', sid)
    return sid
  }

  return (req, res, next) => {
    let sid = req.cookies.sid
    debug('sid:', sid)

    if (!storage.has(sid)) {
      sid = generateSession()
      res.cookie('sid', sid)
    }

    req.session = storage.get(sid) || {}
    debug('req.session:', req.session)

    next()
  }
}

module.exports = session