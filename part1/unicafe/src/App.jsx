import { useState } from 'react'

//Buttons
const Buttons = ({ onGood, onNeutral, onBad }) => {
  return (
    <>
      <button onClick={onGood}>good</button>
      <button onClick={onNeutral}>neutral</button>
      <button onClick={onBad}>bad</button>
    </>
  )
}

//StatisticLine
const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

//Statistics
const Statistics = ({ good, neutral, bad }) => {  
  const total = good + neutral + bad 
  const average = total > 0 ? (good - bad) / total : 0  
  const positivePercentage = total > 0 ? (good / total) * 100 : 0

  //return the statistics
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
   <table>
    <tbody>
    <StatisticLine label='good' value={good}/>
      <StatisticLine label='neutral' value={neutral}/>
      <StatisticLine label='bad' value={bad}/>
      <StatisticLine label='all' value={total}/>
      <StatisticLine label='average' value={average.toFixed(1)}/>
      <StatisticLine label='positive(%)' value={positivePercentage.toFixed(1)}/>
    </tbody>
   </table>
  )
}

//App
const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  const handleGoodClick = () => {    
    const updatedGood = good + 1
    setGood(updatedGood)    
  }

  const handleNeutralClick = () => {    
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)    
  }

  const handleBadClick = () => {    
    const updatedBad = bad + 1
    setBad(updatedBad)    
  }

  return (
    <>
      <h1>give feedback</h1>    
      <Buttons onGood={handleGoodClick} onNeutral={handleNeutralClick} onBad={handleBadClick} />     
      
      <h1>statistics</h1>   
      <Statistics good={good} neutral={neutral} bad={bad}/>     
     
    </>
  )
}

export default App