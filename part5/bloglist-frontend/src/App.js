import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
    console.log(`login: ${username} and ${password}`);
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
      console.error('Wrong credentials');
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
      
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      console.error(`create fail: `, exception)
    }
  }

  if( user === null) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type='text'
              value={username}
              name='Username'
              onChange={({target})=>setUsername(target.value)}/>
          </div>
          <div>
            password
              <input
              type='password'
              value={password}
              name='password'
              onChange={({target})=>setPassword(target.value)}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>

      <h2>create new</h2>
      <div>
        <form onSubmit={handleCreateNewBlog}>
          <div>
            title: 
            <input
            value={title}
            onChange={({ target }) => { setTitle(target.value) }}>
            </input>
          </div>
          <div>
            author:
              <input
              value={author}
              onChange={({ target }) => { setAuthor(target.value) }}>
              </input>
          </div>
          <div>
            url:      
              <input
              value={url}
              onChange={({ target }) => { setUrl(target.value) }}>
              </input>
          </div>
          <button type='submit'>submit</button>
        </form>
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App