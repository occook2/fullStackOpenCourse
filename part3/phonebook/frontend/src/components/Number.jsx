import personService from '../services/persons.js'

const Number = ({ entry, list, setList, persons, setPersons, setNotification, setNotificationObject }) => {
    const handleDelete = () => {
        setList(list.filter(el => el.id !== entry.id))
        setPersons(persons.filter(person => person.id !== entry.id))
        personService.deletePerson(entry.id).catch(error => {
            setNotification('error')
            setNotificationObject({
                name: entry.name,
                number: entry.number
            })
            
            setTimeout(() => {
            setNotification('')
            setNotificationObject({
                name: '',
                number: ''
            })
            }, 5000)
        })
    }
    
    return (
        <div>{entry.name} {entry.number} <button onClick={handleDelete}>Delete</button></div>
    )
}

export default Number