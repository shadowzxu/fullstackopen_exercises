import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action){
      state.push(action.payload)
    },

    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state
              .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
              .sort((a, b) => b.votes - a.votes)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer