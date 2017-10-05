import {post} from './script.js'
const tag = '[index.js]'

const onload = () => {
  console.log(tag, 'DOMContentLoaded')

  post.list(1).
    then(data => {
      renderPosts(data.list)
      renderPagination(data.pagination)
    }).
    catch(err => {
      console.log(err)
    })
}

const renderPosts = data => {
  console.log(tag, data)
  const html = data.reduce((html, post) => {
    html += `<li>
        <h2>${post.title}</h2><p>${post.body}</p>
        <a href="/edit.html">편집</a>
      </li>`
    return html
  }, '<ul>') + '</ul>'

  document.querySelector('.posts').innerHTML = html
}

const renderPagination = data => {
  console.log(tag, data)
  const {total, limit, page} = data
  const totalPage = Math.ceil(total / limit)
  const bindPaginationEvent = () => {
    const links = document.querySelectorAll('.pagination ul li a')
    links.forEach(link => {
      link.addEventListener('click', e => {
        console.log(tag, e.target.dataset.page)

        post.list(e.target.dataset.page).
          then(data => {
            renderPosts(data.list)
            renderPagination(data.pagination)
          }).
          catch(err => {
            console.log(err)
          })
      })
    })
  }

  let html = '<ul>'

  for(let i = 1; i <= totalPage; i++) {
    if (i === page) {
      html +=  `<li><i><strong><a href="#" data-page="${i}">${i}</a></strong></i></li>`
    } else {
      html +=  `<li><a href="#" data-page="${i}">${i}</a></li>`
    }
  }

  document.querySelector('.pagination').innerHTML = html
  bindPaginationEvent()
}

document.addEventListener('DOMContentLoaded', onload)