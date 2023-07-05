import { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "./queries"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ changeBirthYear ] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  if(result.loading){
    return <div>Loading</div>
  }

  if (!props.show) {
    return null
  }
  
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    console.log('change birthyear...')
    changeBirthYear({
      variables: {
        name: name,
        setBornTo: Number(born)
      }
    }, 
    )

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option key={''}></option>
            {authors.map(author => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors