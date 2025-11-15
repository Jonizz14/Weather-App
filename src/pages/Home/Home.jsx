import React, { useState } from "react";
import useWeather from "../../hooks/useWeather";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ForecastList from "../../components/ForecastList/ForecastList";
import DailyForecast from "../../components/DailyForecast/DailyForecast";
import RightPanel from "../../components/RightPanel/RightPanel";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

export default function Home() {
  const { weather, forecast, loading, error, getWeather } = useWeather();
  const [searchedCities, setSearchedCities] = useState([]);

  // Load searched cities from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('searchedCities');
    if (stored) {
      setSearchedCities(JSON.parse(stored));
    }
  }, []);

  const handleSearch = async (city) => {
    await getWeather(city);
    // Add to searched cities
    setSearchedCities(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      const updated = [city, ...filtered].slice(0, 20); // Keep only last 20
      localStorage.setItem('searchedCities', JSON.stringify(updated));
      return updated;
    });
  };


  const handleCityClick = (cityName) => {
    getWeather(cityName);
  };

  return (
    <div className="home">
      <LeftSidebar onSearch={handleSearch} searchedCities={searchedCities} onCityClick={handleCityClick} />
      <main className="main-content">

        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={() => getWeather("")} />}
        {weather && (
          <>
            {/* Top Section - Main Weather Overview */}
            <section className="weather-overview">
              <WeatherCard data={weather} />
            </section>

            {/* Middle Section - Hourly Forecast */}
            {forecast && (
              <section className="hourly-forecast-section">
                <ForecastList forecast={forecast} weather={weather} />
              </section>
            )}

            {/* Bottom Section - Detail Widgets Grid */}
            <section className="detail-widgets">
              <RightPanel weather={weather} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
