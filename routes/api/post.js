const lorem = 'Lorem ipsum dolor sit amet, sumo partiendo has no, nonumy utamur sit ex. Possit inimicus mel te. Ei vel alii porro debitis, simul percipit ius id. Et duo rebum eleifend expetenda, eu eam malis etiam assueverit.\n';
const posts = [
  {title: 'post 7', body: lorem},
  {title: 'post 6', body: lorem},
  {title: 'post 5', body: lorem},
  {title: 'post 4', body: lorem},
  {title: 'post 3', body: lorem},
  {title: 'post 2', body: lorem},
  {title: 'post 1', body: lorem},
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

module.exports = {index}