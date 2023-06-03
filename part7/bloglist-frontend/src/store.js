import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

export default configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer
  }
})