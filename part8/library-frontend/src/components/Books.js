import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"
import { useEffect, useState } from "react"

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

const GenreButtonGruop = ({ genres, setGenreToSearch }) => {
  const handleGenreBtnOnClick = (sGenreToSearch) => {
    if(sGenreToSearch === "all"){
      setGenreToSearch(null)
    }
    else{
      setGenreToSearch(sGenreToSearch)
    }
  }
  return (
    <div>
      {genres.map((genre) => (
          <button key={genre} onClick={() => {handleGenreBtnOnClick(genre)}}>{genre}</button>
      ))}
    </div>
  )
}

const Books = ({ show }) => {
  const [genreToSearch, setGenreToSearch] = useState(null)
  const [genres, setGenres] = useState([])
  const allBooks = useQuery(ALL_BOOKS)
  const booksFilteredByGenre = useQuery(ALL_BOOKS, {
    variables: {genreToSearch}
  })

  useEffect(() => {
    if(allBooks.data){      
      let allGenresFromBooks = allBooks.data.allBooks.reduce((accumulateGenres, currentBook) => 
        accumulateGenres.concat(currentBook.genres),[])
      
      allGenresFromBooks = [...new Set(allGenresFromBooks)]
      setGenres(["all", ...allGenresFromBooks])
    }
  }, [allBooks.data])

  if(allBooks.loading || booksFilteredByGenre.loading){
    return <div>Loading</div>
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <BookTable books={genreToSearch ? booksFilteredByGenre.data.allBooks : allBooks.data.allBooks} />
      <GenreButtonGruop genres={genres} setGenreToSearch={setGenreToSearch} />
    </div>
  )
}

export default Books