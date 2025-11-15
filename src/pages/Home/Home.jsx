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
import "./Home.css";

export default function Home() {
  const { weather, forecast, loading, error, getWeather } = useWeather();
  const [savedCities, setSavedCities] = useState([]);

  const handleSearch = async (city) => {
    await getWeather(city);
  };

  // Update saved cities when weather data changes
  React.useEffect(() => {
    if (weather) {
      setSavedCities(prev => {
        const existingIndex = prev.findIndex(c => c.name.toLowerCase() === weather.name.toLowerCase());
        if (existingIndex >= 0) {
          // Update existing
          const updated = [...prev];
          updated[existingIndex] = { name: weather.name, weather, forecast };
          return updated;
        } else {
          // Add new
          return [...prev, { name: weather.name, weather, forecast }];
        }
      });
    }
  }, [weather, forecast]);

  const handleCityClick = (cityName) => {
    getWeather(cityName);
  };

  return (
    <div className="home">
      <main className="main-content">
        {/* Prominent Search Bar */}
        <section className="search-section">
          <SearchBar onSearch={handleSearch} />
        </section>

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
