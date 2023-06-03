import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (info, type = 'INFO') => {
    dispatch(setNotification({ info, type }))
  }

  const onLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      storageService.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username or password', 'ERROR')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }

  const onCreateBlog = async (newBlog) => {
    try {
      await dispatch(createBlog(newBlog, user))
      notifyWith(`a new blog ${newBlog.title} by ${newBlog.author}`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      notifyWith(`creation fail: ${exception.response.data.error}`, 'ERROR')
    }
  }

  // eslint-disable-next-line no-unused-vars
  const likeBlog = async (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: Number(blog.likes) + 1,
      user: blog.user.id,
    }
    const updatedBlog = await blogService.update(blogToUpdate, blog.id)
    notifyWith(`A like for the blog ${updatedBlog.title}`)
    // setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  // eslint-disable-next-line no-unused-vars
  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      // const blogs = await blogService.getAll()
      // setBlogs(blogs)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
    } catch (exception) {
      notifyWith(`deletion fail: ${exception.response.data.error}`, 'ERROR')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in{' '}
      <button id="logout-button" onClick={logout}>
        logout
      </button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onCreate={onCreateBlog}/>
      </Togglable>
      <BlogList user = {user}/>
    </div>
  )
}

export default App
