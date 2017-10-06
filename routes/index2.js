const debug = require('../modules/debug')('index2')


const index = (req, res, next) => {
  res.render('index', {})
}

module.exports = {index}