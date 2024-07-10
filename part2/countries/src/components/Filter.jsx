const Filter = ({ onChange }) => {
    return(
        <div>
            Find Countries: <input onChange={onChange}></input>
        </div>
    )
}

export default Filter