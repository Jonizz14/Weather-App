import React from 'react';
import Map from '../Map/Map';
import './RightPanel.css';

const RightPanel = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <div className="weather-card glass-card map-widget">
        <div className="card-header">
          <div className="card-icon">🗺️</div>
          <h4>Xarita</h4>
        </div>
        <Map
          center={{ lat: weather.coord.lat, lng: weather.coord.lon }}
          zoom={10}
          markers={[{
            position: { lat: weather.coord.lat, lng: weather.coord.lon },
            title: `${weather.name}, ${weather.sys.country}`,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#4A90E2" stroke="white" stroke-width="3"/>
                  <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${Math.round(weather.main.temp)}°</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40)
            }
          }]}
        />
        <div className="map-info">
          <div className="city-name">{weather.name}, {weather.sys.country}</div>
          <div className="coordinates">{weather.coord.lat.toFixed(4)}, {weather.coord.lon.toFixed(4)}</div>
        </div>
      </div>

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

      <div className="weather-card glass-card nearby-cities">
        <div className="card-icon">🏙️</div>
        <h4>Yaqin Shaharlar</h4>
        <div className="nearby-list">
          <div className="nearby-city">
            <span className="city-name">Samarqand</span>
            <span className="distance">~300 km</span>
            <span className="temp">18°</span>
          </div>
          <div className="nearby-city">
            <span className="city-name">Buxoro</span>
            <span className="distance">~450 km</span>
            <span className="temp">20°</span>
          </div>
          <div className="nearby-city">
            <span className="city-name">Andijon</span>
            <span className="distance">~280 km</span>
            <span className="temp">16°</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightPanel;