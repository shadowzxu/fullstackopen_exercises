import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { changeNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, second) => {
  return dispatch => {
    dispatch(changeNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * second)
  }
}

export default notificationSlice.reducer