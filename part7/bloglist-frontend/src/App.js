import { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import storageService from './services/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { logout, setUser } from './reducers/userReducer'
import UsersTable from './components/UsersTable'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'

const App = () => {
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])
  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }, [])

  const onCreateBlog = async (newBlog) => {
    try {
      await dispatch(createBlog(newBlog, user))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`, 'INFO'))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(`creation fail: ${exception.response.data.error}`, 'ERROR'))
    }
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in{' '}
      <button id="logout-button" onClick={() => dispatch(logout())}>
        logout
      </button>

      <Router>
        <Routes>
          <Route path="/users/:id" element={<User users={users} />}/>
          <Route path="/users" element={<UsersTable />}/>
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm onCreate={onCreateBlog}/>
              </Togglable>
              <BlogList user = {user}/>
            </div>
          }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
