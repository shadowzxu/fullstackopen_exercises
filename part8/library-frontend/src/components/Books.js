import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES } from "./queries"
import { useState } from "react"

const Books = (props) => {
  const [genreToSearch, setGenreToSearch] = useState(null)
  const allBooks = useQuery(ALL_BOOKS, {
    variables: {genreToSearch}
  })
  const allGenres = useQuery(ALL_GENRES)

  if(allBooks.loading || allGenres.loading){
    return <div>Loading</div>
  }

  if (!props.show) {
    return null
  }

  const books = allBooks.data.allBooks
  const genres = allGenres.data.allGenres

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenreToSearch(genre)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books