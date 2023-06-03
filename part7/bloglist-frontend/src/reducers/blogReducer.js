import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    replaceBlog(state, action) {
      const replacedBlog = action.payload
      return state.map(blog => blog.id === replacedBlog.id ? replacedBlog : blog)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog, user) => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog)
    createdBlog.user = user
    dispatch(addBlog(createdBlog))
  }
}

export const likeBlog = (blog) => {
  const blogToUpdate = { ...blog, likes: Number(blog.likes) + 1, user: blog.user.id }
  return async dispatch => {
    const updatedBlog = await blogService.update(blogToUpdate, blog.id)
    dispatch(replaceBlog(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { setBlogs, addBlog, replaceBlog } = slice.actions
export default slice.reducer