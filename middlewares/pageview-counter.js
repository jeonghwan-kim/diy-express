const debug = require('../modules/debug')('pageview-counter')

const pageviewCounter = () => {
  return (req, res, next) => {
    // 1. 쿠키 이용 방법 
    // const views = req.cookies.views ? (req.cookies.views * 1 + 1) : 1
    // req.cookies.views = views
    // res.cookie('views', views)    

    // 2. 세션 이용한 방법 
    req.session.views ? req.session.views++ : (req.session.views = 1)
    debug('session:', req.session)

    next()
  }
}

module.exports = pageviewCounter