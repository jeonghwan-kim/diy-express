const debug = require('../../modules/debug')('auth')
const users = [
  {id: 1, email: 'ej88ej@gmail.com', password: '123'}
]

const login = (req, res, next) => {
  const {email, password} = req.body

  const user = users.filter(user => {
    return user.email === email && user.password === password
  })[0]
  debug('user:', user)


  if (user) req.session.user = user

  res.status(user ? 200 : 401).send()
}

const logout = (req, res, next) => {
  delete req.session.user
  debug(`session`, req.session)
  res.redirect('/')
}

const me = (req, res, next) => {
  const user = req.session.user
  res.status(user ? 200 : 401).send(user)
}

module.exports = {login, logout, me}