import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { FiX } from "react-icons/fi";
import "./LeftSidebar.css";

const LeftSidebar = ({
  onSearch,
  onLocation,
  searchedCities,
  onCityClick,
  onDeleteCity,
  onClearAllCities,
  onClose,
  className,
}) => {
  return (
    <aside className={`left-sidebar ${className || ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Weather</h2>
        <button className="sidebar-close-btn" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
        <SearchBar onSearch={onSearch} onLocation={onLocation} />
        <div className="searched-cities">
          <div className="searched-cities-header">
            <h3>Saved Locations</h3>
          </div>
          {searchedCities.length > 0 ? (
            searchedCities.map((city, index) => (
              <div key={index} className="searched-city-item" onClick={() => onCityClick(city.name)}>
                <div className="city-content">
                  <div className="city-info">
                    <h4>{city.name}</h4>
                    {city.weather && (
                      <p>{city.weather.weather[0].description}</p>
                    )}
                  </div>
                  {city.weather && (
                    <div className="city-temp">
                      <div className="temp-main">
                        {Math.round(city.weather.main.temp)}°
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCity(city.name);
                  }}
                >
                  <FiX />
                </button>
              </div>
            ))
          ) : (
            <p className="no-searches">No saved locations</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
