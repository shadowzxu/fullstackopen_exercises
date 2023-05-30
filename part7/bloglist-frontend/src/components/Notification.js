import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if(!notification) return null

  let NotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (notification.type === 'ERROR') {
    NotificationStyle = {
      ...NotificationStyle,
      color: 'red',
    }
  }

  return (
    <div id="notification" style={NotificationStyle}>
      {notification.info}
    </div>
  )
}

export default Notification
