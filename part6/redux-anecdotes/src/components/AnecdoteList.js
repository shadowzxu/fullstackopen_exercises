import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sFilter = filter.trim().toLowerCase()
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(sFilter))
  })

  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(setNotification(`Voted: ${anecdote.content}`, 5))
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