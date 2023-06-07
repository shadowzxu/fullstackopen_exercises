import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'

const slice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const setUser = (user) => {
  return async dispatch => {
    dispatch(set(user))
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    storageService.saveUser(user)
    dispatch(set(user))
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(set(null))
    storageService.removeUser()
  }
}

export const { set, clear } = slice.actions
export default slice.reducer