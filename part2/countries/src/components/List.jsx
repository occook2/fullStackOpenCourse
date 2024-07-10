import CountryButton from './CountryButton'

const List = ({ country, list, setCountry, setCountryFilter }) => {
    if (!country) {
        if (list.length > 10) {
            return (
                <div>Too many matches, add to your filter</div>
            )
        }
        else if (list.length > 1) {
            return (
                list.map(entry => 
                    <div key={entry}>
                        {entry} <CountryButton country={entry} setCountry={setCountry} setCountryFilter={setCountryFilter}/>
                    </div>)
            )
        }
    }
}

export default List