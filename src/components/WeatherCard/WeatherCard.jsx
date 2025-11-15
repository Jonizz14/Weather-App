import React from "react";
import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  const getWeatherIcon = (icon) => {
    if (icon.includes("01")) return "☀️"; // Sunny
    if (icon.includes("02") || icon.includes("03")) return "⛅"; // Partly cloudy
    if (icon.includes("04")) return "☁️"; // Cloudy
    if (icon.includes("09") || icon.includes("10")) return "🌧️"; // Rain
    if (icon.includes("11")) return "⛈️"; // Thunderstorm
    if (icon.includes("13")) return "❄️"; // Snow
    if (icon.includes("50")) return "🌫️"; // Mist
    return "☀️";
  };

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-icon">{getWeatherIcon(data.weather[0].icon)}</div>
        <div className="weather-info">
          <h1 className="location-title">{data.name} – {Math.round(data.main.temp)}°</h1>
          <p className="condition">{data.weather[0].description}</p>
          <p className="high-low">Max {Math.round(data.main.temp_max)}° Min {Math.round(data.main.temp_min)}°</p>
        </div>
      </div>
    </div>
  );
}
