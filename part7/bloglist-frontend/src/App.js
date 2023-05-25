import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ content: null, type:'INFO' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, type='INFO') => {
    setMessage({ content: message, type: type })
    setTimeout(() => {
      setMessage({ content: null, type: 'INFO' })
    }, 5000)
  }

  const onLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      storageService.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username or password', 'ERROR')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }

  const createBlog = async (newBlog) => {
    try{
      const createdBlog = await blogService.create(newBlog)
      createdBlog.user = user
      notifyWith(`a new blog ${createdBlog.title} by ${createdBlog.author}`)
      setBlogs(blogs.concat(createdBlog))
    }
    catch(exception) {
      notifyWith(`creation fail: ${exception.response.data.error}`, 'ERROR')
    }
  }

  const handleRemoveBlog = async (event) => {
    event.preventDefault()

    if(window.confirm(`Remove blog ${event.target.value}`)){
      try {
        await blogService.remove(event.target.id, user.token)
        const blogs = await blogService.getAll()
        setBlogs( blogs )
      } catch(exception) {
        setMessage({ ontent: `deletion fail: ${exception.response.data.error}`, type: 'ERROR' })
        setTimeout(() => {
          setMessage({ content: null, type: 'INFO' })
        }, 3000)
      }
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if( user === null) {
    return (
      <div>
        <Notification
          message = {message.content}
          type = {message.type} />
        <LoginForm
          onLogin={onLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message = {message.content} type = {message.type} />
      {user.name} logged in <button id='logout-button' onClick={logout}>logout</button>
      <Togglable buttonLabel='create new blog'>
        <BlogForm onCreate={createBlog}/>
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleRemoveBtnClick={ handleRemoveBlog }
          blogService={ blogService }
          isCreator={ blog.user.username === user.username }/>
      )}
    </div>
  )
}

export default App