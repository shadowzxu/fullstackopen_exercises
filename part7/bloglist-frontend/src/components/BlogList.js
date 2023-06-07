import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogLists = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  const likeBlogHandler = async (blog) => {
    await dispatch(likeBlog(blog))
    dispatch(setNotification(`A like for the blog ${blog.title}`, 'INFO'))
  }

  const removeBlogHandler = async (blog) => {
    try {
      await dispatch(removeBlog(blog))
      dispatch(setNotification(`The blog ${blog.title} by ${blog.author} removed`, 'INFO'))
    } catch (exception) {
      dispatch(setNotification(`Deletion fail: ${exception.response.data.error}`, 'ERROR'))
    }
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          remove={removeBlogHandler}
          like={() => likeBlogHandler(blog)}
          isCreator={blog.user.username === user.username}
        />
      ))}
    </div>
  )
}

export default BlogLists