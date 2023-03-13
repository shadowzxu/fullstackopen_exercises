import { useState } from 'react'

const Header = (props) => (<h1>{props.text}</h1>)

const Button = (props) => {
  return (
    <button onClick={props.handleBtnClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = (all === 0) ? 0 : (props.good - props.bad) / all;
  const positive = (all === 0) ? 0 : (props.good / all) * 100;

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

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
      <Header text = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </>
  )
}

export default App