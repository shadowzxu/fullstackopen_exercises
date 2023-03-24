import { useState, useEffect } from 'react'
import Display from './components/Display';
import Filter from './components/Filter';
import countryServices from './services/countries';
import weatherServices from './services/weather';


const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState({name: "", temp: 0, wind: 0})

  useEffect(()=> {
    countryServices.getAll()
      .then(data => {
        setCountries(data.map(country => {
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
    if(newFilter){
      const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(newFilter.toLowerCase()));
      const capital = filteredCountries.length > 0 ? filteredCountries[0].capital[0] : "";
      if(filteredCountries.length === 1 && (!weather || weather.name !== capital)){
        console.log('get weather for: ', capital)
        weatherServices.getWeatherByCity(capital)
          .then(data => setWeather({
            name: data.name,
            temp: Math.round((data.main.temp - 273.15) * 100) / 100,
            wind: data.wind.speed,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
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
      <Filter filterValue={newFilter} handleFilterChange = {handleFilterChange} />
      <Display countries={filteredCountries} weather = {weather} handleShowButtonClick={showCountry}/>
    </div>
  )
}

export default App