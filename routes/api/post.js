const posts = [
  {title: 'post 1', body: 'this is post 1'},
  {title: 'post 2', body: 'this is post 2'},
  {title: 'post 3', body: 'this is post 3'},
]

const index = (req, res, next) => {
  const limit = req.params.limit || 2
  const page = req.params.page || 1

  const begin = (page - 1) * limit
  const end = begin + limit
  res.json(posts.slice(begin, end))
}

module.exports = {index}