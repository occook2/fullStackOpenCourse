import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import NumbersList from './components/NumbersList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [list, setList] = useState(persons)

  const url = 'http://localhost:3001/persons'

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setPersons(response.data)
        setList(response.data)
      })
  },[])

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
      axios.post(url, newPersonObject)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <AddNew 
        newName={newName} 
        newNumber={newNumber} 
        handleInputNameChange={handleInputNameChange}
        handleInputNumberChange={handleInputNumberChange}
        handleSubmit={handleSubmit}
      />
      <NumbersList list={list} />
    </div>
  )
}

export default App