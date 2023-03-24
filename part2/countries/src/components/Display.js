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
          <img src={weather.icon} alt = ''></img>
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

  export default Display