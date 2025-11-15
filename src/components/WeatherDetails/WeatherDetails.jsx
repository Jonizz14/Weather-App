import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="weather-details-grid">
      <div className="weather-card map-card">
        <h4>Map</h4>
        <div className="map-display">
          <div className="map-background">
            <div className="country-label kazakhstan">Kazakhstan</div>
            <div className="country-label tajikistan">Tajikistan</div>
            <div className="country-label kyrgyzstan">Kyrgyzstan</div>
            <div className="country-label turkmenistan">Turkmenistan</div>
            <div className="city-marker">📍</div>
          </div>
        </div>
      </div>

      <div className="weather-card uv-card">
        <h4>UV Index</h4>
        <div className="uv-gauge">
          <div className="gauge-circle">
            <span className="uv-value">Low</span>
          </div>
        </div>
      </div>

      <div className="weather-card sunrise-card">
        <h4>Sunrise & Sunset</h4>
        <div className="sun-times">
          <div className="sun-item">
            <span className="icon">🌅</span>
            <span>{sunrise}</span>
          </div>
          <div className="sun-item">
            <span className="icon">🌇</span>
            <span>{sunset}</span>
          </div>
        </div>
      </div>

      <div className="weather-card moon-card">
        <h4>Moon Phase</h4>
        <div className="moon-display">
          <span className="moon-icon">🌕</span>
          <span>Waning Gibbous</span>
        </div>
      </div>

      <div className="weather-card precip-card">
        <h4>Precipitation</h4>
        <div className="precip-value">0 mm</div>
      </div>

      <div className="weather-card humidity-card">
        <h4>Humidity</h4>
        <div className="humidity-value">{weather.main.humidity}%</div>
        <div className="dew-point">Dew point 3°</div>
      </div>

      <div className="weather-card wind-card">
        <h4>Wind</h4>
        <div className="wind-compass">
          <div className="compass-circle">
            <span className="wind-direction">↑</span>
          </div>
        </div>
        <div className="wind-speed">{weather.wind.speed} km/h</div>
      </div>

      <div className="weather-card visibility-card">
        <h4>Visibility</h4>
        <div className="visibility-value">{(weather.visibility / 1000).toFixed(0)} km</div>
      </div>

      <div className="weather-card pressure-card">
        <h4>Pressure</h4>
        <div className="pressure-gauge">
          <div className="gauge-semi">
            <span>{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      <div className="weather-card feels-like-card">
        <h4>Feels Like</h4>
        <div className="feels-temp">{Math.round(weather.main.feels_like)}°</div>
      </div>

      <div className="weather-card temp-chart-card">
        <h4>Temperature vs Average</h4>
        <div className="temp-chart">
          <div className="chart-bar">
            <div className="current-temp" style={{ height: `${Math.min(100, (weather.main.temp + 20) * 2.5)}%` }}></div>
            <div className="average-temp" style={{ height: '50%' }}></div>
          </div>
          <div className="chart-labels">
            <span>Current</span>
            <span>Average</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;