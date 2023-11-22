import { useState } from 'react';
import './App.css';


function Title({text}){
  return(
    <h1 className='text-4xl p-4'>{text}</h1>
  )
}

function Filter({...props}){
  return(
    <div className='flex'>
      <p className='mb-2 mr-2 p-1'>Filter by name:</p>
      <input 
        className='text-black rounded-lg mb-2 p-1 focus:shadow-md focus:shadow-white outline-none'
        {...props} 
      />
  </div>
  )
}

function Content({onSubmit}){
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNewName(value);
  }

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNewNumber(value);
  }

  return(
    <form onSubmit={(e)=>{
        onSubmit(e, newName, newNumber)
        setNewName('')
        setNewNumber('')
      }} className='flex flex-col items-center mt-6'>
      <div className='flex justify-start'>
        <div className='flex flex-col items-start mb-2'>
          <p className='mb-2 p-1'>Name:</p><p className='mr-2 p-1'>Number:</p>
        </div>
        <div className='flex flex-col items-center mb-2 text-black'>
          <input onChange={handleNameChange} value={newName} className='rounded-lg mb-2 p-1 focus:shadow-md focus:shadow-white outline-none' />
          <input onChange={handleNumberChange} value={newNumber} className='rounded-lg p-1 focus:shadow-md focus:shadow-white outline-none' />
        </div>
      </div>
      <div className='flex w-full justify-end mt-2'>
        <button className='border border-white p-1 pr-3 pl-3 rounded-md hover:bg-slate-950 active:bg-slate-800' type="submit">Add</button>
      </div>
  </form>
  )
}

function Footer({persons, filter}){
  return(
    <>
        <h2 className='text-2xl mb-2'>Numbers</h2>
              {persons.map(p=>(
          p.name.includes(filter) ? 
          <p key={p.name}>{p.name}: {p.number}</p> : <></>
        ))}
    </>
  )
}


function App() {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [filter, setFilter] = useState('')

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  }

  const handleSubmit = (e, newName, newNumber) => {
    e.preventDefault()
    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
  }


  return (
    <div className='text-white font-bold h-screen flex flex-col justify-center items-center bg-slate-800'>
      <div className='flex flex-col items-start'>
        <Title  text={'PhoneBook'}/>
        <Filter onChange={handleFilterChange} value={filter} />
        <Content onSubmit={handleSubmit} />
        <Footer persons={persons} filter={filter} />
      </div>
    </div>
  );
}

export default App;
