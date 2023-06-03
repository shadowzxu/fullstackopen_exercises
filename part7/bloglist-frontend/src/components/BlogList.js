import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const BlogLists = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
  })

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          remove={() => {}}
          like={() => {}}
          isCreator={blog.user.username === user.username}
        />
      ))}
    </div>
  )
}

export default BlogLists