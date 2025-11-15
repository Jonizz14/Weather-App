import React, { useState } from "react";
import useWeather from "../../hooks/useWeather";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ForecastList from "../../components/ForecastList/ForecastList";
import RightPanel from "../../components/RightPanel/RightPanel";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

export default function Home() {
  const { weather, forecast, loading, error, locationError, getWeather, getWeatherByCoords, retryLocation } = useWeather();
  const [searchedCities, setSearchedCities] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Load searched cities from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('searchedCities');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure each item has the correct structure
      const formatted = parsed.map(item => typeof item === 'string' ? { name: item, weather: null, forecast: null } : item);
      setSearchedCities(formatted);
    }
  }, []);

  // Update weather data for searched cities
  React.useEffect(() => {
    if (weather) {
      setSearchedCities(prev => {
        const updated = prev.map(city =>
          city.name.toLowerCase() === weather.name.toLowerCase()
            ? { ...city, weather, forecast }
            : city
        );
        localStorage.setItem('searchedCities', JSON.stringify(updated));
        return updated;
      });
    }
  }, [weather, forecast]);

  const handleSearch = async (city) => {
    await getWeather(city);
    // Add to searched cities
    setSearchedCities(prev => {
      const filtered = prev.filter(c => c.name.toLowerCase() !== city.toLowerCase());
      const updated = [{ name: city, weather: null, forecast: null }, ...filtered].slice(0, 20); // Keep only last 20
      localStorage.setItem('searchedCities', JSON.stringify(updated));
      return updated;
    });
  };


  const handleCityClick = (cityName) => {
    getWeather(cityName);
  };

  const handleDeleteCity = (cityName) => {
    setSearchedCities(prev => {
      const updated = prev.filter(c => c.name.toLowerCase() !== cityName.toLowerCase());
      localStorage.setItem('searchedCities', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAllCities = () => {
    setSearchedCities([]);
    localStorage.removeItem('searchedCities');
  };

  return (
    <>
      <div className={`home ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <LeftSidebar className={sidebarOpen ? 'open' : 'closed'} onSearch={handleSearch} onLocation={getWeatherByCoords} searchedCities={searchedCities} onCityClick={handleCityClick} onDeleteCity={handleDeleteCity} onClearAllCities={handleClearAllCities} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}
        <main className="main-content">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={() => getWeather("")} />}
        {locationError && !weather && (
          <ErrorMessage message={locationError} onRetry={retryLocation} />
        )}
        {!weather && !loading && !error && !locationError && (
          <div className="welcome-message">
            <h1>Search for a City</h1>
            <p>Use the search bar above to find weather information for any city</p>
          </div>
        )}
        {weather && (
          <>
            <section className="weather-overview">
              <WeatherCard data={weather} />
            </section>

            {forecast && (
              <section className="hourly-forecast-section">
                <ForecastList forecast={forecast} weather={weather} />
              </section>
            )}

            <section className="detail-widgets">
              <RightPanel weather={weather} />
            </section>
          </>
        )}
        </main>
      </div>
    </>
  );
}
