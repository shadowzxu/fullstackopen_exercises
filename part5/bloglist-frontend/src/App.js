import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({ content: null, type:'INFO' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage({ content: 'wrong username or password', type: 'ERROR' })
      setTimeout(() => {
        setMessage({ content: null, type: 'INFO' })
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url
      }
      const newBlog = await blogService.create(blog, user.token)
      newBlog.user = user

      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage({ content: `a new blog ${newBlog.title} by ${newBlog.author}`, type: 'INFO' })
      setTimeout(() => {
        setMessage({ content: null, type: 'INFO' })
      }, 3000)
    } catch(exception) {
      setMessage({ content: `creation fail: ${exception.response.data.error}`, type: 'ERROR' })
      setTimeout(() => {
        setMessage({ content: null, type: 'INFO' })
      }, 3000)
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

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if( user === null) {
    return (
      <div>
        <Notification
          message = {message.content}
          type = {message.type} />
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message = {message.content} type = {message.type} />
      {user.name} logged in <button id='logout-button' onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='create new blog'>
        <BlogForm
          handleSubmit={handleCreateNewBlog}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          title={title}
          author={author}
          url={url}/>
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