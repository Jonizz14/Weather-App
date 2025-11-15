import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { WiCloudy, WiDaySunny, WiRain } from 'react-icons/wi';
import { FiX } from 'react-icons/fi';
import './LeftSidebar.css';

const LeftSidebar = ({ onSearch, searchedCities, onCityClick, onDeleteCity }) => {
  const getWeatherIcon = (condition) => {
    if (condition.includes('Cloudy')) return '☁️';
    if (condition.includes('Clear')) return '☀️';
    if (condition.includes('Rain')) return '🌧️';
    return '☀️';
  };

  return (
    <aside className="left-sidebar">
      <div className="sidebar-content">
        <SearchBar onSearch={onSearch} />
        <div className="searched-cities">
          <h3>Oxirgi qidirilgan shaharlar</h3>
          {searchedCities.length > 0 ? (
            searchedCities.map((city, index) => (
              <div key={index} className="searched-city-item">
                <div className="city-content" onClick={() => onCityClick(city.name)}>
                  <div className="city-info">
                    <h4>{city.name}</h4>
                    {city.weather && (
                      <>
                        <p>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} • {city.weather.weather[0].description}</p>
                        <div className="weather-icon">{getWeatherIcon(city.weather.weather[0].description)}</div>
                      </>
                    )}
                  </div>
                  {city.weather && (
                    <div className="city-temp">
                      <div className="temp-main">{Math.round(city.weather.main.temp)}°</div>
                    </div>
                  )}
                </div>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDeleteCity(city.name); }}>
                  <FiX />
                </button>
              </div>
            ))
          ) : (
            <p className="no-searches">Hali qidiruvlar yo'q</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;