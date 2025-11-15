import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  const getWeatherIcon = (icon) => {
    let iconType = "CLEAR_DAY";
    let color = "#FFD700";

    if (icon.includes("01")) {
      iconType = "CLEAR_DAY";
      color = "#FFD700";
    } else if (icon.includes("02") || icon.includes("03")) {
      iconType = "PARTLY_CLOUDY_DAY";
      color = "#FFD700";
    } else if (icon.includes("04")) {
      iconType = "CLOUDY";
      color = "#A0AEC0";
    } else if (icon.includes("09") || icon.includes("10")) {
      iconType = "RAIN";
      color = "#4A90E2";
    } else if (icon.includes("11")) {
      iconType = "RAIN";
      color = "#2D3748";
    } else if (icon.includes("13")) {
      iconType = "SNOW";
      color = "#E2E8F0";
    } else if (icon.includes("50")) {
      iconType = "FOG";
      color = "#A0AEC0";
    }

    return <ReactAnimatedWeather icon={iconType} color={color} size={80} animate={true} />;
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
