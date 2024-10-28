import Number from './Number'

const NumbersList = ({ list, setList, persons, setPersons, setNotification, setNotificationObject }) => {
    return (
        <>
            <h2>Numbers</h2>
            {list.map(entry => <Number key={entry.id} entry={entry} list={list} setList={setList} persons={persons} setPersons={setPersons} setNotification={setNotification} setNotificationObject={setNotificationObject}/>)}
        </>
    )
}

export default NumbersList