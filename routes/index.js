const debug = require('../modules/debug')('index')

const listPost = (req, res, next) => {
  debug('listPost()')
  const data = {
    title: 'Blog',
    scriptPath: 'js/index.js'
  }
  res.render('index', data)
}

const newPost = (req, res, next) => {
  const data = {
    title: 'New Post',
    scriptPath: 'js/new.js'
  }
  res.render('new', data)
}

module.exports = {
  listPost,
  newPost
}