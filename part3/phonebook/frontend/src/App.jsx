import { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import NumbersList from './components/NumbersList'

const url = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [list, setList] = useState(persons)
  const [notification, setNotification] = useState('')
  const [notificationObject, setNotificationObject] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setList(initialPersons)
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
      else if (!isNumber) {
        const isUpdate = confirm(`Do you want to update the number of ${newName} to ${newNumber}?`)
        if (isUpdate) {
          const personToUpdate = persons.find(person => person.name === newName)
          personService.updatePerson(personToUpdate, newNumber)
          .then(() => {
            personToUpdate.number = newNumber
            setPersons(persons.map(person => person.id === personToUpdate.id ? personToUpdate : person))
            setList(list.map(entry => entry.id === personToUpdate.id ? personToUpdate : entry))

            setNotification('updateNumber')
            setNotificationObject(
              {
                name: newName,
                number: newNumber
              }
            )
          })
          .catch(error => {
            setNotification('error')
            setNotificationObject(
              {
                name: newName,
                number: newNumber,
                error: error.response.data.error,
              }
            )
        
            
          })
          setTimeout(() => {
            setNotification('')
            setNotificationObject({
              name: '',
              number: ''
            })
          }, 5000)
        }
      }
      else alert('Both name and number that you entered are included in the phonebook')
    }
    else{
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(newPersonObject)
      .then(response => {
        const newPersonsData = persons.concat(response)
        setPersons(newPersonsData)
        setNewName('')
        setNewNumber('')
        setList(newPersonsData.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))) 
        
        setNotification('addPerson')
        setNotificationObject({
          name: newName,
          number: newNumber
        })
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotification('error')
        setNotificationObject({
          name: newName,
          number: newNumber,
          error: error.response.data.error,
        })
      })

      setTimeout(() => {
        setNotification('')
        setNotificationObject({
          name: '',
          number: ''
        })
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={notification} object={notificationObject} />
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <AddNew 
        newName={newName} 
        newNumber={newNumber} 
        handleInputNameChange={handleInputNameChange}
        handleInputNumberChange={handleInputNumberChange}
        handleSubmit={handleSubmit}
      />
      <NumbersList list={list} setList={setList} persons={persons} setPersons={setPersons} setNotification={setNotification} setNotificationObject={setNotificationObject}/>
    </div>
  )
}

export default App