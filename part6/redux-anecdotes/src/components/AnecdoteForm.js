import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const showNotification = (content) => {
    dispatch(notificationChange(content))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  const addAnecdoate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    showNotification(content)
  }  

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdoate}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm