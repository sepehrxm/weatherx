import { useState } from 'react'
import axios from 'axios'
import './app.css'


function App() {
  let [isLoading , setIsLoading] = useState(false)
  let [isError, setIsError] = useState(false)
  let [data, setData] = useState({})
  let [city, setCity] = useState('')
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f25b49dfcc230dc696b0dd4b8b6aadd8&units=metric`
  
  let fetchData = async (e) => {
    
    if(e.key === 'Enter'){
      try {
        setIsLoading(true)
        let response = await axios(url)
        let data = response.data
        setData(data)
        setCity('')
        setIsLoading(false)
        
      } catch (error) {
        console.log(error.response)
        setIsError(true)
      }
      }
    }


  return (
     <div className="container">
      
      <div className='header'>
        <label htmlFor="location">Get current weather by city name</label>
        <div className='searchBar'>
        <input id='location' type="text" placeholder='Ex: London' value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={fetchData}/>
        </div>
      </div>
      {isLoading ? <h2 id='load'>Loading.. </h2> : null}
      {isError ? <h1 id='alert'>Something went wrong! try again.</h1> : null}
      <div className="data">
        <div className="nameTemp">
          <h2 id='name'>{data.name}</h2>
          {data.main ? <h1 id='temp'>{data.main.temp}°C</h1> : null}
          {data.weather ? <h4 id='cl'>{data.weather[0].main}</h4> : null}
        </div>

        {data.main ? 
        <div className='info'>
            <div>
                {data.main ? <p>{data.main.temp_min}°C</p> : null}
                <p id='desc'>Min</p>
            </div>
            <div>
                {data.main ? <p>{data.main.temp_max}°C</p> : null}
                <p id='desc'>Max</p>
            </div>
            <div>
               {data.main ? <p>{data.main.feels_like}°C</p> : null}
                <p id='desc'>Feels Like</p>
            </div> 
            <div>
                {data.wind ? <p>{data.wind.speed} MPH</p> : null}
                <p id='desc'>Wind Speed</p>
            </div>
            <div>
               {data.main ? <p>{data.main.humidity}%</p> : null}
                <p id='desc'>Humidity</p>
            </div>
        </div> : null}       
        
    </div>
    <footer>Mobayenlsepehr@gmail.com</footer>
     </div>
  )
}

export default App
