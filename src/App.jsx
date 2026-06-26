import { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_KEY = 'f5a9ba3c902e278d5490a75b79878b8e'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!city) return
    setLoading(true)
    setError('')
    setWeather(null)
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      })
      setWeather(response.data)
    } catch (err) {
      setError('City not found! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchWeather()
  }

  return (
    <div className="app">
      <div className="card">
        <h1>🌤 Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {loading && <p className="loading">Fetching weather...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h3>{weather.weather[0].description}</h3>
            <div className="details">
              <div className="detail-box">
                <span>🌡 Temperature</span>
                <strong>{weather.main.temp}°C</strong>
              </div>
              <div className="detail-box">
                <span>💧 Humidity</span>
                <strong>{weather.main.humidity}%</strong>
              </div>
              <div className="detail-box">
                <span>💨 Wind Speed</span>
                <strong>{weather.wind.speed} m/s</strong>
              </div>
              <div className="detail-box">
                <span>🌡 Feels Like</span>
                <strong>{weather.main.feels_like}°C</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App