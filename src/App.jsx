import React, { useState } from 'react';
import './App.css';

const API_KEY = 'e79e1114bea8eb707a5e655783950c5f'; // Replace this with your real API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather({
          temperature: data.main.temp + ' °C',
          condition: data.weather[0].main,
          humidity: data.main.humidity + ' %',
          wind: data.wind.speed + ' km/h',
          icon: data.weather[0].icon,
        });
        setError('');
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather');
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌤️ Weather Application</h1>

      <div className="weather-card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
          <div className="weather-info">
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather icon"
              />
            </div>
            <h2>{city}</h2>
            <p>Temperature: {weather.temperature}</p>
            <p>Condition: {weather.condition}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>Wind: {weather.wind}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
