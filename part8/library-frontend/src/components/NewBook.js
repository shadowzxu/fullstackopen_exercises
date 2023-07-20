import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from './queries'
import { updateCacheWith } from '../util'

const NewBook = ({ show, setPage }) => {
  const [title, setTitle] = useState('The Lord of the Rings')
  const [author, setAuthor] = useState('J.R.R. Tolkien')
  const [published, setPublished] = useState('1954')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState(['fantasy', 'classic'])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ 
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS, variables: { genre: null }}
    ],
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      setPage('books')
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook
      updateCacheWith(cache, addedBook)
    },
  })

  if (!show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    
    createBook({ 
      variables: {
        title: title, 
        author: {
          name: author
        },
        published: Number(published),
        genres: genres
      }

    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook