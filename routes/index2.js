const index = (req, res, next) => {
  res.render('index', {
    msg: 'hello world',
    name: 'chris'
  })
}

module.exports = {index}