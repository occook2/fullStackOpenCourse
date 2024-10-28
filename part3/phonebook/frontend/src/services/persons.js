import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (person, number) => {
    const newData = {
        name: person.name,
        number: number
    }
    return axios.put(`${baseUrl}/${person.id}`, newData)
}

export default { getAll, create, deletePerson, updatePerson }
