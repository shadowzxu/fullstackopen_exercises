import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addCommentForBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const [comment, setComment] = useState('')

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if(!blog) return null

  const handleLikeBlogBtnOnClick = async (blog) => {
    await dispatch(likeBlog(blog))
    dispatch(setNotification(`A like for the blog ${blog.title}`, 'INFO'))
  }

  const handleAddCommentBtnOnClick = async (event) => {
    event.preventDefault()
    try {
      await dispatch(addCommentForBlog(comment, id))
      dispatch(setNotification('new comment added'))
    } catch(exception){
      dispatch(setNotification(`Fail to add comment: ${exception.response.data.error}`, 'ERROR'))
    }
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
      <h3>comments</h3>
      <div>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={handleAddCommentBtnOnClick}>add comment</button>
      </div>
      {blog.comments.length === 0 && <p>no comments</p>}
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView