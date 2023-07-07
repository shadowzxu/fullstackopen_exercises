import { useQuery } from "@apollo/client"
import { ALL_RECOMMANDATIONS, ME } from "./queries"
import { useEffect } from "react"

const Recommandation = ({ show }) => {
  const me = useQuery(ME)
  const allRecommandations = useQuery(ALL_RECOMMANDATIONS)

  useEffect(() => {
    allRecommandations.refetch()
  // eslint-disable-next-line
  }, [me.data])

  if(!show){
    return null
  }

  const recommandedBooks = allRecommandations.data.allRecommandations

  return (
    <div>
      <h2>Recommandation</h2>
      <p>books in your favorite genre <strong>{me.data.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommandedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommandation