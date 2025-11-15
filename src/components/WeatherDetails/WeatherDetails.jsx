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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191717.12084960938!2d69.1392828!3d41.2825125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9ad%3A0xa5a9323b4a054823!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Uzbekistan Map"
          ></iframe>
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