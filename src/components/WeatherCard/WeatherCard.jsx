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
    <div className="weather-card glass-card">
      <div className="weather-main">
        <div className="location-header">
          <div className="location">{data.name}, {data.sys.country}</div>
          <div className="location-pin">📍</div>
        </div>
        <div className="weather-icon">{getWeatherIcon(data.weather[0].icon)}</div>
        <div className="temperature">{Math.round(data.main.temp)}°</div>
        <div className="condition">{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</div>
        <div className="high-low">
          <span className="high">H:{Math.round(data.main.temp_max)}°</span>
          <span className="low">L:{Math.round(data.main.temp_min)}°</span>
        </div>
        <div className="coordinates">
          📍 {data.coord.lat.toFixed(4)}, {data.coord.lon.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
