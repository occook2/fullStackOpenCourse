const Notification = ({type, object}) => {
  if (type === '') {
      return null
    }
    else if (type === 'error') {
      return (
        <div className='error'>
          {object.error}
        </div>
      )
    }
    else if (type === 'addPerson'){
      return (
        <div className='addPerson'>
            Added {object.name}
        </div>
      )
    }
    else {
      return (
        <div className='addPerson'>
            Updated number of {object.name} to {object.number}
        </div>
    )
    }
}

export default Notification