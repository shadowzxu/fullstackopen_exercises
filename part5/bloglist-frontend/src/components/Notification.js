const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  let NotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if(type === 'ERROR'){
    NotificationStyle = {
      ...NotificationStyle,
      color: 'red'
    }
  }

  return (
    <div style={NotificationStyle}>
      {message}
    </div>
  )
}

export default Notification