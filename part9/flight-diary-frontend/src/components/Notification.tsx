interface NotificationProps {
  message: string | null;
  type: string;
}

const Notification = ({ message, type }: NotificationProps): JSX.Element | null => {
  if (message === null) {
    return null
  }

  let NotificationStyle = {
    color: 'green',
  }

  if(type === 'ERROR'){
    NotificationStyle = {
      color: 'red'
    }
  }

  return (
    <div style={NotificationStyle}>
      {message}
    </div>
  );
}

export default Notification