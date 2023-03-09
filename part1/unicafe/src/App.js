import { useState } from 'react'

const Header = (props) => (<h1>{props.text}</h1>)

const Button = (props) => {
  return (
    <button onClick={props.handleBtnClick}>{props.text}</button>
  )
}

const Display = (props) => (<p>{props.text} {props.count}</p>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodCount = () => setGood(good + 1)
  const addNeutralCount = () => setNeutral(neutral + 1)
  const addBadCount = () => setBad(bad + 1)

  return (
    <>
      <Header text = "give feedback" />
      <Button text = "good" handleBtnClick = {() => addGoodCount()}/>
      <Button text = "neutral" handleBtnClick = {() => addNeutralCount()}/>
      <Button text = "bad" handleBtnClick = {() => addBadCount()}/>
      <Header text = "Statistics" />
      <Display text = "good" count = {good} />
      <Display text = "neutral" count = {neutral} />
      <Display text = "bad" count = {bad} />
    </>
  )
}

export default App