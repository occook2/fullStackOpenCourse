import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'
import List from './components/List'

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [country, setCountry] = useState(null) // Ensure that conditional rendering occurs with state
  const [countryList, setCountryList] = useState([]) 
  const [allCountryData, setAllCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (allCountryData == null) { // This branch will occur on render
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountryData(response.data)
        setCountryList(response.data.map(countryInfo => countryInfo.name.common))
      })
    }
    else { // This branch will occur whenever filter changes
      const newCountryList = allCountryData
        .map(entry => entry.name.common)
        .filter(entry => entry.toLowerCase().includes(countryFilter.toLowerCase()))

      setCountryList(newCountryList)

      if (newCountryList.length == 1) {
        const singleCountry = allCountryData.find(country => country.name.common === newCountryList[0])
        if (singleCountry != country) {
          setCountry(singleCountry)

          const lat = singleCountry.capitalInfo.latlng[0]
          const lon = singleCountry.capitalInfo.latlng[1]
          const apiKey = import.meta.env.VITE_API_KEY
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => {
                    setWeatherData(response.data)
                })
                .catch(err => console.log(err))
        }
      }
      else if (newCountryList.length > 1) setCountry(null)
    }
  },[countryFilter])

  const onFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }
  
  return (
    <>
      <h1>Country Information Web Application</h1>
      <Filter onChange={onFilterChange}/>
      <List list={countryList} country={country} setCountry={setCountry} setCountryFilter={setCountryFilter}/>
      <Country country={country} weatherData={weatherData}/>
    </>
  )
}

export default App
