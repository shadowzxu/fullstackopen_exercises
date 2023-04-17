import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, handleRemoveBtnClick }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLikes = async (event) => {
    event.preventDefault()

    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: Number(blog.likes) + 1,
      user: blog.user.id
    }

    const response = await blogService.update(updateBlog, blog.id)

    blog.likes = response.likes
    setLikes(response.likes)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>Likes: {likes} <button onClick={addLikes}>like</button></p>
        <p>{blog.user.name}</p>
        <button
          id = {blog.id}
          onClick={ handleRemoveBtnClick }
          value={ `${blog.title} by ${blog.author}` }>remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemoveBtnClick: PropTypes.func.isRequired,
}

export default Blog