const Header = () => {
  // const-definition
  const COURSE_TITLE = 'Half Stack application development'
  
  return (
    <>
      <h1>{COURSE_TITLE}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>    
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.info.part1} exercises = {props.info.exercises1} />
      <Part part = {props.info.part2} exercises = {props.info.exercises2} />
      <Part part = {props.info.part3} exercises = {props.info.exercises3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.count}</p>
    </>
  )
}


const App = () => {
  // const-definition
  const INFO = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <>
      <Header />
      <Content info = {INFO} />
      <Total count = {INFO.exercises1 + INFO.exercises2 + INFO.exercises3} />
    </>
  )
}

export default App