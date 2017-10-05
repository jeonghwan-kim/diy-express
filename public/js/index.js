import {post} from './script.js'
const tag = '[index.js]'

const onload = () => {
  console.log(tag, 'DOMContentLoaded')

  post.list().
    then(data => {
      renderPosts(JSON.parse(data))
    }).
    catch(err => console.log(err))
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

document.addEventListener('DOMContentLoaded', onload)