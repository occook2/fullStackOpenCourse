const AddNew = ({ newName, newNumber, handleInputNameChange, handleInputNumberChange, handleSubmit}) => {
    return (
        <>
            <h2>Add a New Input</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    Name: <input onChange={handleInputNameChange} value={newName}/>
                </div>
                <div>
                    Number: <input onChange={handleInputNumberChange} value={newNumber}/>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}

export default AddNew