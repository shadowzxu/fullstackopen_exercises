import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommandation from './components/Recommandation'
import { BOOK_ADDED } from './components/queries'
import { updateCacheWith } from './util'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if(token){
      setToken(token)
    }
  }, [])

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCacheWith(client.cache, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    setPage('login')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => setPage('recommandation')}>recommandation</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={logout}>logout</button>}
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Recommandation show={page === 'recommandation'}/>
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App