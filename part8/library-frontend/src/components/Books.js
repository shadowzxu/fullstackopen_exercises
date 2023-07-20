import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"
import { useState } from "react"

const BookTable = ({ books }) => (
  <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
)

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  
  const allBookQuery = useQuery(ALL_BOOKS, {
    variables: { genre: null }
  })

  const genreBookQuery = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
    // pollInterval: 2000
  })

  if(allBookQuery.loading || genreBookQuery.loading){
    return <div>Loading</div>
  }

  if (!show) {
    return null
  }

  const allBooks = allBookQuery.data.allBooks

  const genres = [...new Set(allBooks.reduce((s, b) => s.concat(b.genres), []))]
  
  const books = genre ? genreBookQuery.data.allBooks : allBooks

  return (
    <div>
      <h2>books</h2>
      <BookTable books={ books } />
      <div>
        {genres.map((g) => (
          <button onClick={() => setGenre(g)} key={g}>
            {g===genre ? <strong>{g}</strong> : g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>{!genre ? <strong>all</strong> : 'all'}</button>
      </div>
    </div>
  )
}

export default Books