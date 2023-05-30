import { createSlice } from '@reduxjs/toolkit'

const NOTIFICATION_DURATION_MSECOND = 5000

const sclice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clear(state, action) {
      return null
    }
  },
})

export const setNotification = (content) => {
  return async dispatch => {
    dispatch(set(content))
    setTimeout(() => {
      dispatch(clear())
    }, NOTIFICATION_DURATION_MSECOND)
  }
}

export const { set, clear } = sclice.actions
export default sclice.reducer