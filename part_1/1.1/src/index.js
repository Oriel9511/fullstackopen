import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Part = ({part, exercises}) => {
  return(
    <p>
      {part} {exercises}
    </p>
  )
}

const Header = ({course}) => {
  return(
    <h1>{course}</h1>
  )
}

const Content = ({props}) => {
  return(
      <>
        {props.map(p=>{
          return (<Part part={p.name} exercises={p.exercises}/>)
        })}
      </>
  )
}

const Total = ({props}) => {
  let total = props.reduce((t,p)=>t+=p.exercises,0)
  return(
  <p>Number of exercises {total}</p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // const [counter, setCounter] = useState(0);

  // setTimeout(()=>setCounter(counter+1), 1000);

  return (
    <div>
      <Header course={course.name}/>
      <Content props={course.parts} />
      <Total props={course.parts}/>
      {/* <br/>
      counter: {counter} */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))