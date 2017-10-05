import {post} from './script.js'
const tag = '[index.js]'

const onload = () => {
  console.log(tag, 'DOMContentLoaded')

  post.list().
    then(data => console.log(data)).
    catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', onload)