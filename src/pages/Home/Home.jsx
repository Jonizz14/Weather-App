import React from "react";
import useWeather from "../../hooks/useWeather";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ForecastList from "../../components/ForecastList/ForecastList";
import Loader from "../../components/Loader/Loader";

export default function Home() {
  const { weather, forecast, loading, error, getWeather } = useWeather();

  return (
    <div className="home">
      <SearchBar onSearch={getWeather} />
      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherCard data={weather} />}
      {forecast && <ForecastList forecast={forecast} />}
    </div>
  );
}
