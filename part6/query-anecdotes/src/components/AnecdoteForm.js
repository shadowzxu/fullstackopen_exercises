import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../request"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const setNotificationMessage = (message) => {
    dispatch({type: 'CHANGE', payload: message})
    setTimeout(() => {
      dispatch({type: 'CHANGE', payload: ''})
    }, 5000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onMutate: (newAnecdote) => {
      if(newAnecdote.content.length < 5) {
        throw new Error("length must be greater than 5")
      }
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      setNotificationMessage(`anecdote ${newAnecdote.content} created`)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    newAnecdoteMutation.mutate({
      id: getId(),
      content: content,
      votes: 0
    })    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
