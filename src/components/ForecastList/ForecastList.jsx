import React from "react";
import { formatTime } from "../../utils/formatDate";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import "./ForecastList.css";

export default function ForecastList({ forecast, weather }) {
  const getWeatherIcon = (icon) => {
    if (icon.includes("01")) return <WiDaySunny size={30} animate={true} />;
    if (icon.includes("02") || icon.includes("03") || icon.includes("04")) return <WiCloudy size={30} animate={true} />;
    if (icon.includes("09") || icon.includes("10")) return <WiRain size={30} animate={true} />;
    if (icon.includes("11")) return <WiThunderstorm size={30} animate={true} />;
    if (icon.includes("13")) return <WiSnow size={30} animate={true} />;
    return <WiDaySunny size={30} animate={true} />;
  };

  const sunriseTime = weather ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '07:12';

  return (
    <div className="forecast-list">
      <div className="hourly-forecast">
        {forecast.list.slice(0, 8).map((item, index) => {
          const time = formatTime(item.dt_txt);
          const isSunrise = time === sunriseTime;
          return (
            <div key={index} className={`forecast-item ${isSunrise ? 'sunrise' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="time">{time}</p>
              {isSunrise ? <WiDaySunny size={30} className="sun-icon" /> : getWeatherIcon(item.weather[0].icon)}
              <span className="temp">{Math.round(item.main.temp)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
