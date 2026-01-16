import React from "react";
import { formatTime } from "../../utils/formatDate";
import ReactAnimatedWeather from "react-animated-weather";
import "./ForecastList.css";

export default function ForecastList({ forecast, weather }) {
  const getWeatherIcon = (icon) => {
    let iconType = "CLEAR_DAY";
    let color = "#FFD700";

    if (icon.includes("01")) {
      iconType = "CLEAR_DAY";
      color = "#FFD700";
    } else if (icon.includes("02") || icon.includes("03") || icon.includes("04")) {
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
    }

    return <ReactAnimatedWeather icon={iconType} color={color} size={30} animate={true} />;
  };

  const sunriseTime = weather ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '07:12';

  return (
    <div className="forecast-list">
      <div className="hourly-forecast">
        {forecast.list.slice(0, 12).map((item, index) => {
          const time = formatTime(item.dt_txt);
          const isSunrise = time === sunriseTime;
          return (
            <div key={index} className={`forecast-item ${isSunrise ? 'sunrise' : ''}`}>
              <p className="time">{time}</p>
              <div className="weather-icon">
                {isSunrise ? <ReactAnimatedWeather icon="CLEAR_DAY" color="#FFD700" size={24} animate={true} /> : getWeatherIcon(item.weather[0].icon)}
              </div>
              <span className="temp">{Math.round(item.main.temp)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
