const Part = ({part, exercises}) => {
    return(
      <p>
        {part} {exercises}
      </p>
    )
  }
  
  const Header = ({text}) => {
    return(
      <h3>{text}</h3>
    )
  }
  
  const Content = ({content}) => {
    return(
        <>
          {content.map(p=>{
            return (<Part id={p.id} part={p.name} exercises={p.exercises}/>)
          })}
        </>
    )
  }
  
  const Total = ({content}) => {
    let total = content.reduce((t,p)=>t+=p.exercises,0)
    return(
    <h4>{`Total of ${total} exercises`}</h4>
    )
  }
  
  export const Course = ({course}) => {
    return(
      <>
        <Header text={course.name}/>
        <Content content={course.parts} />
        <Total content={course.parts}/>
      </>
    )
  }