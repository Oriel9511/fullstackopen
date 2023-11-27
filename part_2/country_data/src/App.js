import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce';

console.log(process.env.REACT_APP_API_KEY)

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

function CountryDetails({country, goBack}){
  
  const [weather, setWeather] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    const getData = async () => {
      try{
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${country.capital[0]}`)
        console.log(response.data)
        setWeather(response.data)
        setLoading(false)
      }catch(e){
        console.error(e)
      }
    }
    getData()
  },[country])
  
  return(
      <div>
        <h1 className='text-2xl'>{country.name.common}</h1>
        <div className='mb-4'>
          <p>{`Capital: ${country.capital[0]}`}</p>
          <p>{`Population: ${country.population}`}</p>
        </div>
        <div className='mb-4'>
          <p>Languages:</p>
          <ul>
            {Object.values(country.languages).map((l)=>(
              <li key={l}>• {l}</li>
            ))}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.flags.alt} width={128} height={128}></img>
        <br/>
        <h1 className='text-xl'>Weather in {country.capital[0]}:</h1>
        {loading ? <p>loading...</p>: 
          <>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} height={64} width={64}/>
            <p>Wind {weather.current.wind_mph}mph direction {weather.current.wind_dir}</p>
          </>
        }
        <button className='border rounded-sm pr-2 pl-2 mt-10' onClick={goBack}>back</button>
      </div>
  )
}


function Footer({content}){
  const [showDetail, setShowDetail] = useState(false)
  const [country, setCountry] = useState({})

  const handleShowCountryDetails = (country) => {
    setCountry(country)
    setShowDetail(true)
  }
  const handleGoBack = () => {
    setShowDetail(false)
  }
  
  return(
    <>
        {(content.length > 4) ? <p>To many matches. Specify another filter</p> :
          ((showDetail) ? <CountryDetails goBack={handleGoBack} country={country}/> :
          content.map(c=>(
            <div key={c.name.common} className='flex p-2'>
              <p className='mr-2'>{c.name.common}</p>
              <button className='border rounded-sm pr-2 pl-2' onClick={()=>handleShowCountryDetails(c)}>Details</button>
            </div>
          )))
        }
    </>
  )
}


function App() {

  const [ countries, setCountries ] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    const getData = async () => {
      try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${filter}`)
        console.log(response.data)
        setCountries(response.data)
      }catch(e){
        console.error(e)
      }

    }
    if(!!filter.length){
      getData()
    }else{
      setCountries([])
    }
  },[filter])

  const handleFilterChange = useDebouncedCallback((value) => {
    setFilter(value);
  }, 1000)


  return (
    <div className='text-white font-bold h-screen flex flex-col justify-center items-center bg-slate-800'>
      <div className='flex flex-col items-start'>
        <Title  text={'Country Info'}/>
        <Filter onChange={(e)=>handleFilterChange(e.target.value)} defaultValue={filter} />
        <Footer content={countries} filter={filter} />
      </div>
    </div>
  );
}

export default App;
