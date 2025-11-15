import React from 'react';
import './RightPanel.css';

const RightPanel = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  return (
    <>

      <div className="weather-card glass-card">
        <div className="card-icon">☀️</div>
        <h4>UV Index</h4>
        <div className="uv-value">Low</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">🌅</div>
        <h4>Sunrise</h4>
        <div className="sun-value">{sunrise}</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">🌇</div>
        <h4>Sunset</h4>
        <div className="sun-value">{sunset}</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">🌙</div>
        <h4>Moon Phase</h4>
        <div className="moon-value">Waning</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">🌧️</div>
        <h4>Precipitation</h4>
        <div className="precip-value">0 mm</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">💧</div>
        <h4>Humidity</h4>
        <div className="humidity-value">{weather.main.humidity}%</div>
        <div className="dew-point">Dew point 15°</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">💨</div>
        <h4>Wind</h4>
        <div className="wind-speed">{weather.wind.speed} km/h</div>
        <div className="wind-direction">NW</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">👁️</div>
        <h4>Visibility</h4>
        <div className="visibility-value">{(weather.visibility / 1000).toFixed(0)} km</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">📊</div>
        <h4>Pressure</h4>
        <div className="pressure-value">{weather.main.pressure} hPa</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">🌡️</div>
        <h4>Feels Like</h4>
        <div className="feels-temp">{Math.round(weather.main.feels_like)}°</div>
      </div>

      <div className="weather-card glass-card">
        <div className="card-icon">📈</div>
        <h4>Temp vs Avg</h4>
        <div className="temp-comparison">
          <span className="current-temp">{Math.round(weather.main.temp)}°</span>
          <span className="vs-text">vs</span>
          <span className="avg-temp">22°</span>
        </div>
      </div>

    </>
  );
};

export default RightPanel;