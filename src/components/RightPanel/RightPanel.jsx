import React from 'react';
import './RightPanel.css';

const RightPanel = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  return (
    <aside className="right-panel">
      <div className="panel-content">
        <div className="weather-card map-card">
          <h4>Map</h4>
          <div className="map-display">
            <div className="temperature-marker">{Math.round(weather.main.temp)}°</div>
          </div>
        </div>

        <div className="weather-card uv-card">
          <div className="card-icon">☀️</div>
          <h4>UV Index</h4>
          <div className="uv-value">Low</div>
        </div>

        <div className="weather-card sunrise-card">
          <div className="card-icon">🌅</div>
          <h4>Sunrise</h4>
          <div className="sun-value">{sunrise}</div>
        </div>

        <div className="weather-card sunset-card">
          <div className="card-icon">🌇</div>
          <h4>Sunset</h4>
          <div className="sun-value">{sunset}</div>
        </div>

        <div className="weather-card moon-card">
          <div className="card-icon">🌙</div>
          <h4>Moon</h4>
          <div className="moon-value">Waning</div>
        </div>

        <div className="weather-card precip-card">
          <div className="card-icon">🌧️</div>
          <h4>Rain</h4>
          <div className="precip-value">0 mm</div>
        </div>

        <div className="weather-card humidity-card">
          <div className="card-icon">💧</div>
          <h4>Humidity</h4>
          <div className="humidity-value">{weather.main.humidity}%</div>
        </div>

        <div className="weather-card wind-card">
          <div className="card-icon">💨</div>
          <h4>Wind</h4>
          <div className="wind-speed">{weather.wind.speed} km/h</div>
        </div>

        <div className="weather-card visibility-card">
          <div className="card-icon">👁️</div>
          <h4>Visibility</h4>
          <div className="visibility-value">{(weather.visibility / 1000).toFixed(0)} km</div>
        </div>

        <div className="weather-card pressure-card">
          <div className="card-icon">📊</div>
          <h4>Pressure</h4>
          <div className="pressure-value">{weather.main.pressure} hPa</div>
        </div>

        <div className="weather-card feels-like-card">
          <div className="card-icon">🌡️</div>
          <h4>Feels Like</h4>
          <div className="feels-temp">{Math.round(weather.main.feels_like)}°</div>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;