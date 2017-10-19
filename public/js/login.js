import {auth} from './script.js'
const tag = '[login.js]'

const bindEvents = () => {
  const loginForm = document.querySelector('#login-form')
  if (!loginForm) throw Error('login-form is required')

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(tag, e.target)
    const email = e.target.email.value || ''
    const password = e.target.password.value || ''

    console.log(tag, {email, password})
    auth.login(email, password).
      then(data => {
        console.log(data)
        alert('success login')
        window.location.href = '/'
      }).
      catch(err => {
        console.log(err)
        alert('Login failed. Try again')
        e.target.password.value = ''
        e.target.password.focus()
      })
  })
}

const onload = () => {
  console.log(tag, 'DOMContentLoaded')
  bindEvents()
}

document.addEventListener('DOMContentLoaded', onload)