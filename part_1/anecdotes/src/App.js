import { useRef, useState } from 'react';
import './App.css';

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
              padding: "0.5rem", 
              background: "#182052",
              color: "white",
              width: '100vw',
              }}>
        <h4>{title}</h4>
  </div>
  )
}

function Content({anecdotes, ...props}){
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const last = useRef(0);

  const handleRandom = () => {
    let n = 0;
    while (selected === last.current) {
      n = Math.floor(Math.random()*anecdotes.length);
      last.current = n;
  }
    setSelected(n);
  }

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes)
  }
  

  return (
    <div {...props}>
      <div className='anecdotes'>
        <p>{anecdotes[selected]}</p>
      </div>
      <div>
        <Button rounded="left" color="primary" onClick={handleVote}>Vote</Button>
        <Button rounded="right" color="secondary" onClick={handleRandom}>Next</Button>
      </div>
      <br/>
      <h4>Anecdote with more votes:</h4>
      {!Math.max(...votes) ? <p>None has vote yet</p> :<>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {Math.max(...votes)} votes</p></>}
      
      
    </div>
  )
}

function Footer(){
  return(
    <div style={{
      padding: "0",
      background: "#e6e7ff",
      display: 'flex',
      textAlign: 'center',
      alignItems: "center",
      justifyContent: 'space-around',
      color: 'gray',
      width: '100vw',
      fontFamily: "sans-serif",
      fontSize: "large"
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

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  return (
    <div className="App">
      <div>
        <Header title="Anecdote of day"/>
        <Content className="content" anecdotes={anecdotes}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
