const debug = require('../modules/debug')('index')

const listPost = (req, res, next) => {
  debug('listPost()')
  const data = {title: 'Blog'}
  res.render('index', data)
}

const newPost = (req, res, next) => {
  const data = {title: 'New | Blog'}
  res.render('new', data)
}

module.exports = {
  listPost,
  newPost
}