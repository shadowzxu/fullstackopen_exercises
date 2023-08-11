interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {

  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default Header;