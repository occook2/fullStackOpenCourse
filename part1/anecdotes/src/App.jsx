import { useState } from 'react'
import './App.css'

const Anecdote = ({ text, number }) => {
  return (
    <div>
    <p className='anecdote'>{text}</p>
    <p>This anecdote has {number} vote{(number === 1) ? '' : 's'}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const emptyVotes = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(emptyVotes)
  const [most, setMost] = useState(0)

  const handleNextAnecdote = () => {
    const rand = Math.floor(Math.random()*8)
    setSelected(rand)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    
    let max = 0
    for (let i = 1; i < copy.length; i++) {
      max = (copy[i] > copy[max]) ? i : max
    }
    setMost(max)
  }

  return (
    <div>
      <h1>Anecdote:</h1>
      <Anecdote text={anecdotes[selected]} number={votes[selected]}/>
      <Button handleClick={handleVote} text='Vote'/>
      <Button handleClick={handleNextAnecdote} text='Next Anecdote'/>
      <h1>Anecdote with the most votes:</h1>
      <Anecdote text={anecdotes[most]} number={votes[most]}/>
    </div>
  )
}

export default App