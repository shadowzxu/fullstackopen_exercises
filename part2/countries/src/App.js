import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ countries, handleShowButtonClick }) => {
  
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
      <Display countries={filteredCountries} handleShowButtonClick={showCountry}/>
    </div>
  )
}

export default App
