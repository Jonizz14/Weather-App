import React from 'react';
import './RightPanel.css';

const RightPanel = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>☀️ UV Index</h4>
            <div className="uv-value">Low</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Next 2h</span>
              <span className="val">Moderate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>🌅 Sunrise</h4>
            <div className="sun-value">{sunrise}</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Daylight</span>
              <span className="val">10h 24m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>🌇 Sunset</h4>
            <div className="sun-value">{sunset}</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Golden Hour</span>
              <span className="val">16:45</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>🌙 Moon</h4>
            <div className="moon-value">Waning</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Illuminated</span>
              <span className="val">42%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>💧 Humidity</h4>
            <div className="humidity-value">{weather.main.humidity}%</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Dew Point</span>
              <span className="val">{Math.round(weather.main.temp - 5)}°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>💨 Wind</h4>
            <div className="wind-speed">{weather.wind.speed} km/h</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Gusts</span>
              <span className="val">{(weather.wind.speed * 1.5).toFixed(1)} km/h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>👁️ Visibility</h4>
            <div className="visibility-value">{(weather.visibility / 1000).toFixed(0)} km</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Air Quality</span>
              <span className="val">Good</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>📊 Pressure</h4>
            <div className="pressure-value">{weather.main.pressure} hPa</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Trend</span>
              <span className="val">Falling</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card glass-card">
        <div className="card-inner">
          <div className="card-left">
            <h4>🌡️ Feels Like</h4>
            <div className="feels-temp">{Math.round(weather.main.feels_like)}°</div>
          </div>
          <div className="card-right">
            <div className="extra-info">
              <span className="label">Variation</span>
              <span className="val">{(weather.main.feels_like - weather.main.temp).toFixed(1)}°</span>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default RightPanel;