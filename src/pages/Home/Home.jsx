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
      <LeftSidebar onSearch={handleSearch} savedCities={savedCities} onCityClick={handleCityClick} />
      <main className="main-content">
        <div className="weather-layout">
          <div className="left-column">
            {loading && <Loader />}
            {error && <ErrorMessage message={error} onRetry={() => getWeather("")} />}
            {weather && <WeatherCard data={weather} />}
            {forecast && <ForecastList forecast={forecast} weather={weather} />}
            {forecast && <DailyForecast forecast={forecast} />}
          </div>
          {weather && <RightPanel weather={weather} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
