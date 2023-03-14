const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  const sum = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>total of {sum} exercises</b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => 
      <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>)}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course = {props.course.name} />
      <Content parts = {props.course.parts} />
      <Total parts = {props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App