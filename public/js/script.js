const http = (method, url, data = null) => new Promise((resolve, reject) => {
  const req = new  XMLHttpRequest()
  req.open(method, url, true)
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onreadystatechange = evt => {
    if (req.readyState == 4) {
      if(req.status == 200) {
        resolve(req.responseText)
      } else {
        reject({
          status: req.status,
          responseText: req.responseText
        })
      }
    }
  }
  req.send(data)
})

export const post = {
  create(title, body) {
    return http('post', '/api/posts', `title=${title}&body=${body}`)
  },
  list() {
    return http('get', '/api/posts')
  }
}

