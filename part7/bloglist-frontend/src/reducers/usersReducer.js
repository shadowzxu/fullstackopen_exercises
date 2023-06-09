import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const { setUsers } = slice.actions
export default slice.reducer