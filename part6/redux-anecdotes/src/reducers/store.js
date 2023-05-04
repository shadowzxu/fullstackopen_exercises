import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

store.subscribe(() => console.log('STATE: ',store.getState()))

export default store