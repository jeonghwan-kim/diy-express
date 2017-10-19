const debug = require('../../modules/debug')('post')

const lorem = 'Lorem ipsum dolor sit amet, sumo partiendo has no, nonumy utamur sit ex. Possit inimicus mel te. Ei vel alii porro debitis, simul percipit ius id. Et duo rebum eleifend expetenda, eu eam malis etiam assueverit.\n';
let posts = [
  {id: 7, title: 'post 7', body: lorem, author: 'alice@gmail.com'},
  {id: 6, title: 'post 6', body: lorem, author: 'chirs@gmail.com'},
  {id: 5, title: 'post 5', body: lorem, author: 'alice@gmail.com'},
  {id: 4, title: 'post 4', body: lorem, author: 'bek@gmail.com'},
  {id: 3, title: 'post 3', body: lorem, author: 'bek@gmail.com'},
  {id: 2, title: 'post 2', body: lorem, author: 'daniel@gmail.com'},
  {id: 1, title: 'post 1', body: lorem, author: 'chirs@gmail.com'},
]

const index = (req, res, next) => {
  const limit = req.params.limit || 3
  const page = req.params.page || 1

  const begin = (page - 1) * limit
  const end = begin + limit
  res.json({
    pagination: {
      total: posts.length,
      page: page * 1,
      limit: limit * 1
    },
    list: posts.slice(begin, end)
  })
}

const create = (req, res, next) => {
  debug('create() req.body:', req.body)
  
  // todo 401 
  
  const post = {
    title: req.body.title,
    body: req.body.body,
    id: Date.now(),
    author: req.session.user.email
  }

  if (!post.title || !post.body) return res.status(400).send('parameter error')

  posts = [post].concat(posts)
  res.status(201).json(post)
}

const destroy = (req, res, next) => {
  
  // todo 401 

  const id = req.params.id * 1
  debug('destroy() req.params.id:', req.params.id)
  posts = posts.filter(post => post.id !== id)
  res.status(204).send()
}

module.exports = {index, create, destroy}