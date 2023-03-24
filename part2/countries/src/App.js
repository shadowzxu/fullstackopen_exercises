import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ countries, weather, handleShowButtonClick }) => {
  
  if(countries.length === 1){
    const country = countries[0];

    return (
      <div>
        <h3>{country.name}</h3>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <ul>
          {Object.values(country.languages)
            .map((language) => <li key = {language}>{language}</li>)}
        </ul>
        <img src={country.image} alt=''></img>
        
        <h3>Weather in {weather.name}</h3>
        <p>temperature: {weather.temp} Celcius</p>
        <img src={weather.icon}></img>
        <p>wind speed: {weather.wind} m/s</p>
      </div>
    )
  }

  return (
    <div>
        {countries.map((country) => 
            <p key = {country.name}> 
                {country.name} <button onClick={handleShowButtonClick} name = {country.name}>show</button> 
            </p>)
        }
    </div>
  )
}

const App = () => {

  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState({name: "", temp: 0, wind: 0})

  useEffect(()=> {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map(country => {
          return {
            name: country.name.common,
            languages: country.languages,
            capital: country.capital,
            area: country.area,
            image: country.flags.png
          }}))
      })
  },[])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    
    if(newFilter){
      const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(newFilter.toLowerCase()));
      const capital = filteredCountries.length > 0 ? filteredCountries[0].capital[0] : "";
      if(filteredCountries.length === 1 && (!weather || weather.name !== capital)){
        console.log('get weather for: ', capital)
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
          .then(response => setWeather({
            name: response.data.name,
            temp: Math.round((response.data.main.temp - 273.15) * 100) / 100,
            wind: response.data.wind.speed,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          }))
      }}
  }, [newFilter])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);    
  }

  const showCountry = (event) => {
    setNewFilter(event.target.name);
  }

  const filteredCountries = newFilter ? 
    countries.filter((country) => country.name.toLowerCase().includes(newFilter.toLowerCase())) : [];

  return (
    <div>
      <div>find countries: <input value={newFilter} onChange = {handleFilterChange}/></div>
      <Display countries={filteredCountries} weather = {weather} handleShowButtonClick={showCountry}/>
    </div>
  )
}

export default App
