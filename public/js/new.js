import {post} from './script.js'
const tag = '[new.js]'

const bindEvents = () => {
  const newForm = document.querySelector('#new-form')
  if (!newForm) throw Error('new-form is required')

  newForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    const title = e.target.title.value || ''
    const body = e.target.body.value || ''

    post.create(title, body).
      then(data => console.log(data)).
      catch(err => console.log(err))
  })
}

const onload = () => {
  console.log(tag, 'DOMContentLoaded')
  bindEvents()
}

document.addEventListener('DOMContentLoaded', onload)