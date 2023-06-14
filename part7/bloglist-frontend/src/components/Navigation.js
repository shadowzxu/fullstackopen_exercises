import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const navigationBarStyle = {
    'background-color': 'lightgrey',
    padding: 5,
    marginBottom: 5
  }

  const navigationElementStyle = {
    padding: 5
  }

  return (
    <div style={navigationBarStyle}>
      <Link style={navigationElementStyle} to="/">home</Link>
      <Link style={navigationElementStyle} to="/users">users</Link>
      {user.name} logged in{' '}
      <button id="logout-button" onClick={() => dispatch(logout())}>
        logout
      </button>
    </div>
  )
}

export default Navigation