import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  const cards = [
    { className: "map-card", title: "Map", content: (
      <div className="map-display">
        <iframe
          src={`https://maps.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}&output=embed`}
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: '16px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${weather.name} Map`}
        ></iframe>
      </div>
    )},
    { className: "uv-card", title: "UV Index", content: (
      <div className="uv-gauge">
        <div className="gauge-circle">
          <span className="uv-value">Low</span>
        </div>
      </div>
    )},
    { className: "sunrise-card", title: "Sunrise & Sunset", content: (
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
    )},
    { className: "moon-card", title: "Moon Phase", content: (
      <div className="moon-display">
        <span className="moon-icon">🌕</span>
        <span>Waning Gibbous</span>
      </div>
    )},
    { className: "precip-card", title: "Precipitation", content: <div className="precip-value">0 mm</div> },
    { className: "humidity-card", title: "Humidity", content: (
      <>
        <div className="humidity-value">{weather.main.humidity}%</div>
        <div className="dew-point">Dew point 3°</div>
      </>
    )},
    { className: "wind-card", title: "Wind", content: (
      <>
        <div className="wind-compass">
          <div className="compass-circle">
            <span className="wind-direction">↑</span>
          </div>
        </div>
        <div className="wind-speed">{weather.wind.speed} km/h</div>
      </>
    )},
    { className: "visibility-card", title: "Visibility", content: <div className="visibility-value">{(weather.visibility / 1000).toFixed(0)} km</div> },
    { className: "pressure-card", title: "Pressure", content: (
      <div className="pressure-gauge">
        <div className="gauge-semi">
          <span>{weather.main.pressure} hPa</span>
        </div>
      </div>
    )},
    { className: "feels-like-card", title: "Feels Like", content: <div className="feels-temp">{Math.round(weather.main.feels_like)}°</div> },
    { className: "temp-chart-card", title: "Temperature vs Average", content: (
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
    )}
  ];

  return (
    <div className="weather-details-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`weather-card ${card.className}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <h4>{card.title}</h4>
          {card.content}
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;