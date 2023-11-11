import { useEffect, useState } from 'react';
import './App.css';

const Feedback = Object.freeze({
  Good: "good",
  Neutral: "neutral",
  Bad: "bad"
})

function Button({children, color, rounded, ...props}){
  return <button 
            className={`btn ${color} ${rounded === 'left' ? 'rounded-left' : (rounded === 'right' ? 'rounded-right' : '')}`} 
            {...props}
          >
            {children}
          </button>
}

function Header({title}){
  return (
  <div style={{
              padding: "1rem", 
              background: "#182052",
              color: "white",
              width: '100vw',
              }}>
        <h1>{title}</h1>
  </div>
  )
}

function StatisticLine({text,value}){
  return(
    <>
      <tr>
        <th>{text}</th>
        <td>{value}</td>
      </tr>
    </>
  )
}

function Statistics({feedback}){
  const [feedbackCounter, setFeedbackCounter] = useState(feedback)

  useEffect(()=>{
    setFeedbackCounter(feedback)
  },[feedback])

  return(
    <>
      <h1>Statistics</h1>
      { !!feedbackCounter.all() ? 
      <>
      <br/>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh"
      }}>
        <table style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}>
          <tbody>
            <StatisticLine text={"Good"} value={feedbackCounter.good} />
            <StatisticLine text={"Neutral"} value={feedbackCounter.neutral} />
            <StatisticLine text={"Bad"} value={feedbackCounter.bad} />
            <StatisticLine text={"All"} value={feedbackCounter.all()} />
            <StatisticLine text={"Average"} value={feedbackCounter.avg()} />
            <StatisticLine text={"Positive"} value={feedbackCounter.positive()} />
          </tbody>
        </table>
      </div></> : <h4>No feedback given</h4>}
    </>
  )
}

function Content(){
  const [feedbackCounter, setFeedbackCounter] = useState({
    good:0,
    neutral:0,
    bad:0,
    all(){
      return this.good + this.neutral + this.bad
    },
    avg(){
      return this.all()/3;
    },
    positive(){
      return !!this.all() ? (this.good/this.all())*100 : 0;
    }
  });

  const updateFeedback = (type) => {
    
    let newCounter = null;
    switch (type){
      case Feedback.Good:
        newCounter = {
          good:feedbackCounter.good+=1,
          ...feedbackCounter
        }
        setFeedbackCounter(newCounter);
        break;
      case Feedback.Neutral:
        newCounter = {
          good:feedbackCounter.neutral+=1,
          ...feedbackCounter
        }
        setFeedbackCounter(newCounter);
        break;
      case Feedback.Bad:
        newCounter = {
          good:feedbackCounter.bad+=1,
          ...feedbackCounter
        }
        setFeedbackCounter(newCounter);
        break;
      default:
        break;
      }
  }
  return(
    <div style={{
      marginTop: "1rem"
    }}>
      <Button rounded="left" color='primary' onClick={() => updateFeedback(Feedback.Good)} >Good</Button>
      <Button color='secondary' onClick={() => updateFeedback(Feedback.Neutral)} >Neutral</Button>
      <Button rounded="right" color='danger' onClick={() => updateFeedback(Feedback.Bad)} >Bad</Button>
      <br/>
      <Statistics feedback={feedbackCounter} />
    </div>

  )
}

function Footer(){
  return(
    <div style={{
      padding: "0.5rem",
      background: "#e6e7ff",
      display: 'flex',
      textAlign: 'center',
      alignItems: "center",
      justifyContent: 'space-around',
      color: 'gray',
      width: '100vw'
    }}>  
      <p style={{
        marginRight: "0.5rem"
      }}>Created by: Oriel Arteaga Jiménez</p>
      <p style={{
        marginRight: "0.5rem"
      }}>email: orielarteagaj@gmail.com</p>
      <div>
        <a style={{
          marginRight: "0.5rem"
        }} href='https://www.linkedin.com/in/oriel-arteaga-jim%C3%A9nez-2b5768180'>Linkedin</a>
        <a style={{
          marginRight: "0.5rem"
        }} href='https://github.com/Oriel9511'>GitHub</a>
        <a href='https://learn.microsoft.com/es-es/users/orielarteagajimnez-4643/transcript/dg81phmz8e28pm6'>Microsoft</a>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
        <div>
          <Header title={"Give feedback"} />
          <Content/>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
