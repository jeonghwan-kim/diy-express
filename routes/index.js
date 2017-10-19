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
  if (!req.session.user) return res.redirect('/login.html')

  const data = {
    title: 'New Post',
    scriptPath: 'js/new.js'
  }
  res.render('new', data)
}

const login = (req, res, next) => {
  if (req.session.user) return res.redirect('/')

  res.render('login', {
    title: 'Login',
    scriptPath: 'js/login.js'
  })
}

const me = (req, res, next) => {
  const user = req.session.user
  if (!user) return res.redirect('/login.html')
  res.render('me', {
    title: 'Me',
    email: user.email
  })
}

module.exports = {
  listPost,
  newPost,
  login,
  me
}