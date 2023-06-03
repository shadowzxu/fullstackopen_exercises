import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogLists = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  const notifyWith = (info, type = 'INFO') => {
    dispatch(setNotification({ info, type }))
  }

  const likeBlogHandler = async (blog) => {
    dispatch(likeBlog(blog))
    notifyWith(`A like for the blog ${blog.title}`)
  }

  const removeBlogHandler = async (blog) => {
    try {
      dispatch(removeBlog(blog))
      notifyWith(`The blog ${blog.title} by ${blog.author} removed`)
    } catch (exception) {
      notifyWith(`deletion fail: ${exception.response.data.error}`, 'ERROR')
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