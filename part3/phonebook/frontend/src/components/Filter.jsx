const Filter = ({ handleFilterChange, filter}) => {

    return (
        <>
            <form>
                <div>
                    Filter entries by name: <input onChange={handleFilterChange} value={filter}/>
                </div>
            </form>
        </>
    )
}

export default Filter