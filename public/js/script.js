const tag = '[script]'

const http = (method, url, data = null) => new Promise((resolve, reject) => {
  const req = new  XMLHttpRequest()
  req.open(method, url, true)
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onreadystatechange = evt => {
    if (req.readyState == 4) {
      let responseText = req.responseText.trim()
      responseText = responseText ? JSON.parse(responseText) : {}
      console.log(tag, req.status, responseText)

      if(req.status >= 200 && req.status < 300) {
        resolve(responseText)
      } else {
        reject({
          status: req.status,
          responseText
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
  list(page) {
    return http('get', `/api/posts?page=${page}`)
  },
  destroy(id) {
    return http('delete', `/api/posts?id=${id}`)
  }
}

