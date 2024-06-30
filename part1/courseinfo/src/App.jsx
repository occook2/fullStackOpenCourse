const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}
const Content = ({ course }) => {
  return (
    <>
      <Part part={course.parts[0]}/>
      <Part part={course.parts[1]}/>
      <Part part={course.parts[2]}/>
    </>
  )
}

const Total = ({ course }) => {
  let total = 0
  course.parts.forEach(part => {
    total += part.exercises
  })

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App