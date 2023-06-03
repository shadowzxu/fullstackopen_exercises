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

export const { setBlogs, addBlog } = slice.actions
export default slice.reducer