import { useState } from 'react'

const Header = (props) => (<h1>{props.text}</h1>)

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleGoodBtnClick}>{props.text[0]}</button>
      <button onClick={props.handleNeutralBtnClick}>{props.text[1]}</button>
      <button onClick={props.handleBadBtnClick}>{props.text[2]}</button>
    </div>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = (all === 0) ? 0 : (props.good - props.bad) / all;
  const positive = (all === 0) ? 0 : (props.good / all) * 100;

  if(all === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text = "good" value = {props.good} />
        <StatisticsLine text = "neutral" value = {props.neutral} />
        <StatisticsLine text = "bad" value = {props.bad} />
        <StatisticsLine text = "all" value = {all} />
        <StatisticsLine text = "average" value = {average} />
        <StatisticsLine text = "positive" value = {positive} />
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  if(props.text === "positive"){
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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
      <Button text = {["good", "neutral", "bad"]} 
              handleGoodBtnClick = {() => addGoodCount()}
              handleNeutralBtnClick = {() => addNeutralCount()}
              handleBadBtnClick = {() => addBadCount()}/>
      <Header text = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </>
  )
}

export default App