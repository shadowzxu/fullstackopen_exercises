import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sFilter = filter.trim().toLowerCase()
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(sFilter))
  })

  const dispatch = useDispatch()

  const showNotification = (content) => {
    dispatch(notificationChange(content))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  const vote = async (anecdote) => {
    dispatch(updateVote(anecdote))
    showNotification(anecdote.content)
  }

	return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList