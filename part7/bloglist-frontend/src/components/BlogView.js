import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if(!blog) return null

  const handleLikeBlogBtnOnClick = async (blog) => {
    await dispatch(likeBlog(blog))
    dispatch(setNotification(`A like for the blog ${blog.title}`, 'INFO'))
  }

  const handleRemoveBlogBtnOnClick = (event) => {
    event.preventDefault()
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (confirm) {
      remove(blog)
    }
  }

  const remove = async (blog) => {
    try {
      await dispatch(removeBlog(blog))
      dispatch(setNotification(`The blog ${blog.title} by ${blog.author} removed`, 'INFO'))
      navigate('/')
    } catch (exception) {
      dispatch(setNotification(`Deletion fail: ${exception.response.data.error}`, 'ERROR'))
    }
  }

  const isCreator = blog.user.username === user.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => handleLikeBlogBtnOnClick(blog)}>like</button></p>
      <p>Added by {blog.user.name}</p>
      {isCreator && (
        <button onClick={handleRemoveBlogBtnOnClick}>remove</button>
      )}
    </div>
  )
}

export default BlogView