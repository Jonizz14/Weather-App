import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { WiCloudy, WiDaySunny, WiRain } from 'react-icons/wi';
import './LeftSidebar.css';

const LeftSidebar = ({ onSearch, searchedCities, onCityClick }) => {

  return (
    <aside className="left-sidebar">
      <div className="sidebar-content">
        <SearchBar onSearch={onSearch} />
        <div className="searched-cities">
          <h3>Oxirgi qidirilgan shaharlar</h3>
          {searchedCities.length > 0 ? (
            searchedCities.map((city, index) => (
              <div key={index} className="searched-city-item" onClick={() => onCityClick(city)}>
                {city}
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