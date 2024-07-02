import { useState } from 'react'
import './App.css'

const Header = () => {
  return (
    <>
      <h1>How was your experience with unicafe?</h1>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <th>{text}</th>
        <th>{value}</th>
      </tr> 
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const findTotal = () => good + neutral + bad
  const findAverage = () => {
    if (findTotal() === 0) return 0
    else return (good - bad)/findTotal()
  }
  const findPercentPositive = () => {
    if (findTotal() === 0) return 0
    else return good/findTotal()*100
  }
  
  if (findTotal() === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback has been given</p>
      </div>
    )
  }
  else 
  {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text='Good' value={good} />
            <StatisticLine text='Neutral' value={neutral} />
            <StatisticLine text='Bad' value={bad} />
            <StatisticLine text='Total' value={findTotal()} />
            <StatisticLine text='Average' value={findAverage()} />
            <StatisticLine text='Percent Positive Reviews' value={findPercentPositive()} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App