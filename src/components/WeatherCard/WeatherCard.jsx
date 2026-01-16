import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  const getWeatherClass = (icon) => {
    if (icon.includes("01")) return icon.includes("d") ? "weather-clear-day" : "weather-clear-night";
    if (icon.includes("09") || icon.includes("10") || icon.includes("11")) return "weather-rain";
    if (icon.includes("13")) return "weather-snow";
    return "weather-clouds";
  };

  const weatherClass = getWeatherClass(data.weather[0].icon);

  const getWeatherIcon = (icon) => {
    let iconType = "CLEAR_DAY";
    let color = "#FFD700";
    if (icon.includes("01")) { iconType = "CLEAR_DAY"; color = "#FFD700"; }
    else if (icon.includes("02") || icon.includes("03")) { iconType = "PARTLY_CLOUDY_DAY"; color = "#FF9500"; }
    else if (icon.includes("04")) { iconType = "CLOUDY"; color = "#A0AEC0"; }
    else if (icon.includes("09") || icon.includes("10") || icon.includes("11")) { iconType = "RAIN"; color = "#4A90E2"; }
    else if (icon.includes("13")) { iconType = "SNOW"; color = "#FFFFFF"; }
    else if (icon.includes("50")) { iconType = "FOG"; color = "#A0AEC0"; }
    return <ReactAnimatedWeather icon={iconType} color={color} size={100} animate={true} />;
  };

  return (
    <div className={`weather-card glass-card ${weatherClass}`}>
      <div className="weather-main">
        <div className="location-header">
          <div className="location">{data.name}, {data.sys.country}</div>
          <div className="location-pin">📍</div>
        </div>
        <div className="weather-icon-section">
          {getWeatherIcon(data.weather[0].icon)}
        </div>
        <div className="temperature">{Math.round(data.main.temp)}°</div>
        <div className="condition">{data.weather[0].description}</div>
        <div className="high-low">
          <span className="high">H:{Math.round(data.main.temp_max)}°</span>
          <span className="low">L:{Math.round(data.main.temp_min)}°</span>
        </div>
        <div className="coordinates">
          📍 {data.coord.lat.toFixed(2)}, {data.coord.lon.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
