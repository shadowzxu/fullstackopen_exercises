import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN, ME } from "./queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const me = useQuery(ME)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if( result.data ){
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('library-user-token', token)
      me.refetch()
    }
  // eslint-disable-next-line
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password }})
  }

  if(!show){
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm