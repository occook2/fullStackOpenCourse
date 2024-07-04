import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '415-415-4151' },
    { id: 2, name: 'Carbon Man', number: '200-000-2222' },
    { id: 3, name: 'Turtle', number: '111-111-1111' },
    { id: 4, name: 'LandLord Master', number: '234-567-1209' },
    { id: 5, name: 'TakiCat', number: '000-000-0000' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [list, setList] = useState(persons)

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    handleStringFilter(event.target.value)
  }

  const handleStringFilter = (filter) => {
    setFilter(filter)
    const newList = persons.filter(person => 
        person.name
        .toLowerCase()
        .includes(
          filter.toLowerCase()
        )
      )
    
    setList(newList)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const isName = persons.filter(person => person.name === newName).length > 0
    const isNumber = persons.filter(person => person.number === newNumber).length > 0

    if (isName || isNumber) {
      if (!isName) alert(`${newNumber} is already a phone number`)
      else if (!isNumber) alert(`${newName} is already a name`)
      else alert('Both name and number that you entered have been taken')
    }
    else{
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      const newPersonsData = persons.concat(newPersonObject)
      setPersons(newPersonsData)
      setNewName('')
      setNewNumber('')
      setList(newPersonsData.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))) 
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          Filter entries by name: <input onChange={handleFilterChange} value={filter}/>
        </div>
      </form>
      <h2> Add a New Input</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          Name: <input onChange={handleInputNameChange} value={newName}/>
        </div>
        <div>
          Number: <input onChange={handleInputNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {list.map(entry => <div key={entry.id}>{entry.name} {entry.number}</div>)}
    </div>
  )
}

export default App