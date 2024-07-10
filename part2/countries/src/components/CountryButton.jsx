const CountryButton = ({ country, setCountry, setCountryFilter }) => {
    const handleClick = () => {
        setCountryFilter(country)
    }

    return (
        <>
            <button onClick={handleClick}>Show Country</button>
        </>
    )
}

export default CountryButton