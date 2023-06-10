import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, isCreator, remove, like }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="blogDetail">
        <p>{blog.url}</p>
        <p className="likes">
          Likes: {blog.likes} <button onClick={like}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {isCreator && (
          <button onClick={handleRemoveBlogBtnOnClick}>remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  isCreator: PropTypes.bool.isRequired,
}

export default Blog
