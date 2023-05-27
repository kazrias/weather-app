import './App.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [code, setCode] = useState('');
  // const searchLocation = () => {
  //   axios.get(url).then((response) => {
  //     setData(response.data);
  //     console.log(response.data)
  //   })
  // }

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=42ca4fa34f9b69dfb8909616edef1f9b&units=metric`;
      fetch(url)
        .then(res => res.json())
        .then(json => { setData(json); setCode(json.cod) })
        .catch(err => {
          console.warn(err);
        })
    }
  }
  console.log(code);
  useEffect(() => {
    {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=erevan&appid=42ca4fa34f9b69dfb8909616edef1f9b&units=metric`)
        .then(res => res.json())
        .then(json => { setData(json); })
    }
  }, [])
  console.log(data);
  console.log(location);

  return (
    <div className='app'>
      <div className="search">
        <input type="text" value={location} onKeyDown={searchLocation}
          onChange={event => setLocation(event.target.value)} placeholder='Enter Location' />
      </div>
      {
        code==='404'?(
          <div className="no-city"><div className="no-city__wrapper">
            <p>City not found</p>
          </div></div>
        ):(<>
          <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h2>{data.main?.temp}°C</h2>
          </div>
          <div className="description">
            <p className='description__clouds'>{data.weather?.[0].main}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className='feels__value'>{data.main?.feels_like}°C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className='humidity__value'>{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className='wind__value'>{data.wind?.speed} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
          </>)
      }
    </div>
  )
}

export default App
