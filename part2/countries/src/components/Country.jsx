import './Country.css'

const Country = ({ country, weatherData }) => {
    if (!country) return null
    else {
        if (!weatherData) {      
            return null
        }
        else {
            return (
                <div>
                    <h1>{country.name.common}</h1>
                    <div>
                        Capital: {country.capital}
                        <br />
                        Area: {country.area}
                        <h4>Languages:</h4>
                        <ul>
                            {
                                Object.values(country.languages).map(
                                    (language, index) => <li key={index}>{language}</li>
                                )
                            }
                        </ul>
                    </div>
                    <img src={country.flags.png}></img>
                    <div>
                        <h4>Weather in {country.capital[0]}</h4>
                        <p>Temperature: {weatherData.main.temp} Celcius</p>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                        <p>Wind: {weatherData.wind.speed} m/s</p>
                    </div>
                </div>
            )
        }
    }
}

export default Country