import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { WiCloudy, WiDaySunny, WiRain } from 'react-icons/wi';
import './LeftSidebar.css';

const LeftSidebar = ({ onSearch, savedCities, onCityClick }) => {
  const getWeatherIcon = (condition) => {
    if (condition.includes('Cloudy')) return <WiCloudy size={20} />;
    if (condition.includes('Clear')) return <WiDaySunny size={20} />;
    if (condition.includes('Rain')) return <WiRain size={20} />;
    return <WiDaySunny size={20} />;
  };

  return (
    <aside className="left-sidebar">
      <div className="sidebar-content">
        <SearchBar onSearch={onSearch} />
        <div className="saved-cities">
          {savedCities.map((city, index) => (
            <React.Fragment key={index}>
              <div className="city-card" onClick={() => onCityClick(city.name)}>
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
                    <div className="temp-min-max">
                      <span className="max">Max {Math.round(city.weather.main.temp_max)}°</span>
                      <span className="min">Min {Math.round(city.weather.main.temp_min)}°</span>
                    </div>
                  </div>
                )}
              </div>
              {index < savedCities.length - 1 && <div className="city-divider"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;