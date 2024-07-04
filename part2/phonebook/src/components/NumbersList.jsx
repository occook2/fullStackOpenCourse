import Number from './Number'

const NumbersList = ({ list }) => {
    return (
        <>
            <h2>Numbers</h2>
            {list.map(entry => <Number entry={entry}/>)}
        </>
    )
}

export default NumbersList